import ArtifactButton from '@/components/ArtifactButton';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';
import { CDN_URL, TRANSFER_TX_SIZE } from '@/configs';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
import usePreserveChunks, {
  IPreserveChunkParams,
} from '@/hooks/contract-operations/artifacts/usePreserveChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useChunkedFileUploader from '@/hooks/useChunkedFileUploader';
import useWindowSize from '@/hooks/useWindowSize';
import { compressFileAndGetSize, updateFileTransactionInfo } from '@/services/file';
import logger from '@/services/logger';
import { readFileAsBuffer } from '@/utils';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { prettyPrintBytes } from '@/utils/units';
import { useWeb3React } from '@web3-react/core';
import { Transaction } from 'ethers';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuidv4 } from 'uuid';
import { StyledModalUpload } from './ModalUpload.styled';
import EstimatedFee from '@/components/EstimatedFee';
import { AssetsContext } from '@/contexts/assets-context';
import * as TC_SDK from 'trustless-computer-sdk';
import web3Provider from '@/connections/custom-web3-provider';
import BigNumber from 'bignumber.js';

type Props = {
  show: boolean;
  handleClose: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
};

const ModalUpload = (props: Props) => {
  const router = useRouter();
  const { mobileScreen } = useWindowSize();
  const { account } = useWeb3React();
  const { show = false, handleClose, file, setFile } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { upload } = useChunkedFileUploader();
  const [isProcessing, setIsProcessing] = useState(false);
  const { run: preserveChunks } = useContractOperation<
    IPreserveChunkParams,
    Transaction | null
  >({
    operation: usePreserveChunks,
    inscribeable: true,
  });
  const { estimateGas } = usePreserveChunks();
  const { feeRate } = useContext(AssetsContext);
  const [estBTCFee, setEstBTCFee] = useState<string | null>(null);
  const [estTCFee, setEstTCFee] = useState<string | null>(null);

  const calculateEstBtcFee = useCallback(async () => {
    if (!file) return;
    try {
      setEstBTCFee(null);

      let tcTxSizeByte = TRANSFER_TX_SIZE;
      if (file.size < BLOCK_CHAIN_FILE_LIMIT) {
        const fileBuffer = await readFileAsBuffer(file);
        const { compressedSize } = await compressFileAndGetSize({
          fileBase64: fileBuffer.toString('base64'),
        });
        tcTxSizeByte = TRANSFER_TX_SIZE + compressedSize;
      }
      const estimatedEconomyFee = TC_SDK.estimateInscribeFee({
        tcTxSizeByte: tcTxSizeByte,
        feeRatePerByte: feeRate.hourFee,
      });

      setEstBTCFee(estimatedEconomyFee.totalFee.toString());
    } catch (err: unknown) {
      logger.error(err);
    }
  }, [file, setEstBTCFee, feeRate.hourFee]);

  const calculateEstTcFee = useCallback(async () => {
    if (!file || !estimateGas || !account) return;

    setEstTCFee(null);
    let payload: IPreserveChunkParams;

    try {
      if (file.size < BLOCK_CHAIN_FILE_LIMIT) {
        const fileBuffer = await readFileAsBuffer(file);
        payload = {
          address: account,
          chunks: [fileBuffer],
        };
      } else {
        payload = {
          address: account,
          chunks: [],
        };
      }
      const gasLimit = await estimateGas(payload);
      const gasPrice = await web3Provider.getGasPrice();
      const gasLimitBN = new BigNumber(gasLimit);
      const gasPriceBN = new BigNumber(gasPrice);
      const tcGas = gasLimitBN.times(gasPriceBN);
      logger.debug('TC Gas', tcGas.toString());
      setEstTCFee(tcGas.toString());
    } catch (err: unknown) {
      logger.error(err);
    }
  }, [file, setEstTCFee, estimateGas, account]);

  const handleUploadFile = async () => {
    if (!account) {
      router.push(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
      return;
    }

    if (!file) {
      showToastError({
        message: 'File is required',
      });
      return;
    }

    try {
      setIsProcessing(true);
      const fileBuffer = await readFileAsBuffer(file);

      if (file.size < BLOCK_CHAIN_FILE_LIMIT) {
        logger.debug('Small file');
        await preserveChunks({
          address: account,
          chunks: [fileBuffer],
        });
      } else {
        logger.debug('Big file');
        // Upload file to server
        const { fileId } = await upload(file, uuidv4());
        logger.debug(`_____fileId: ${fileId}`);

        // Create transaction
        const tx = await preserveChunks({
          address: account,
          chunks: [],
          txSuccessCallback: async (transaction: Transaction | null) => {
            logger.debug('transaction', transaction);
            logger.debug('fileId in closure', fileId);
            if (!transaction) return;

            // Update tx_hash
            await updateFileTransactionInfo({
              fileId,
              tcAddress: account,
              txHash: Object(transaction).hash,
            });
          },
        });

        if (!tx) {
          showToastError({
            message: 'Rejected request.',
          });
          return;
        }
      }

      showToastSuccess({
        message:
          'Please go to your wallet to authorize the request for the Bitcoin transaction.',
      });
      handleClose();
    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onChangeFile = (file: File): void => {
    setFile(file);
    setError('');
  };

  const isBigFile = useMemo(
    () => (file?.size ? file?.size > BLOCK_CHAIN_FILE_LIMIT : false),
    [file?.size],
  );

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, [file]);

  useEffect(() => {
    calculateEstBtcFee();
  }, [calculateEstBtcFee]);

  useEffect(() => {
    calculateEstTcFee();
  }, [calculateEstTcFee]);

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <IconSVG
          className="cursor-pointer hover-opacity"
          onClick={handleClose}
          src={`${CDN_URL}/pages/artifacts/icons/ic-close.svg`}
          maxWidth={'24'}
        />
      </Modal.Header>
      <Modal.Body>
        <FileUploader
          handleChange={onChangeFile}
          name={'fileUploader'}
          classes={'dropZone'}
        >
          <>
            {file && (
              <div className="preview-wrapper">
                {preview ? (
                  <div className="thumbnail-wrapper">
                    <MediaPreview
                      previewExt={file?.name?.split('.')?.pop() || ''}
                      previewUrl={preview}
                    />
                  </div>
                ) : (
                  <img
                    src={`${CDN_URL}/images/default-upload-img.png`}
                    alt="default upload image"
                  ></img>
                )}
                <div className="file-upload-name">
                  <Text
                    className="file-name"
                    size={'regular'}
                  >{`${file.name}`}</Text>
                  <Text>{prettyPrintBytes(file.size)}</Text>
                </div>
              </div>
            )}

            {error && <p className={'error-text'}>{error}</p>}
          </>
        </FileUploader>
        <div className="right_content">
          <EstimatedFee
            estimateBTCGas={estBTCFee}
            estimateTCGas={estTCFee}
            isBigFile={isBigFile}
            uploadView
          />
          {file && !error && (
            <ArtifactButton
              variant="primary"
              width={221}
              height={52}
              objectFit={mobileScreen ? 'contain' : 'cover'}
              className="confirm-btn-wrapper"
            >
              <Button
                disabled={isProcessing}
                className="confirm-btn"
                onClick={handleUploadFile}
              >
                <Text size="medium" fontWeight="medium" className="confirm-text">
                  {isProcessing ? 'Processing...' : isBigFile ? 'reserve' : 'upload'}
                </Text>
              </Button>
            </ArtifactButton>
          )}
          {isBigFile && (
            <Text size="medium" className="big-file-note">
              This file is over 350KB, you will need to reserve first before inscribe
              into bitcoin.
            </Text>
          )}
        </div>
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default ModalUpload;
