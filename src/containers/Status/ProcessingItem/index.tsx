import ArtifactButton from '@/components/ArtifactButton';
import FileChunk from '@/components/FileChunk';
import IconSVG from '@/components/IconSVG';
import MatrixRainAnimation from '@/components/MatrixRainAnimation';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ARTIFACT_CONTRACT, CDN_URL } from '@/configs';
import { FileProcessStatus } from '@/enums/file';
import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ModalInscribeChunk from '../ModalInscribeChunk';
import {
  InfoWrapper,
  StyledProcessingItem,
  ThumbnailOverlay,
  ThumbnailWrapper,
} from './ProcessingItem.styled';

interface IProps {
  file?: IUploadFileResponseItem;
}

const ProcessingItem: React.FC<IProps> = ({ file }: IProps) => {
  const router = useRouter();
  const matrixContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState<number | null>(null);
  const [showInscribeModal, setShowInscribeModal] = useState(false);

  const [divHeight, setDivHeight] = useState<number | null>(null);

  const finishedChunk = useMemo(() => {
    if (!file) return 0;
    return file.processingChunks + file.processedChunks;
  }, [file]);

  const navigateToDetail = (): void => {
    if (!file) return;
    router.push(`/${file.tokenId}`);
  };

  useEffect(() => {
    const divElement = matrixContainerRef.current;

    if (divElement) {
      const { width, height } = divElement.getBoundingClientRect();
      setDivWidth(width);
      setDivHeight(height);
    }
  }, []);

  if (!file) return null;

  const progress = (finishedChunk / file?.totalChunks) * 100;

  const renderContentStatus = (status: number) => {
    switch (status) {
      case FileProcessStatus.New:
        return (
          <div>
            <ArtifactButton
              variant={'primary-transparent'}
              className="ctaBtn"
              width={209}
              height={44}
            >
              <p className={'text-pending'}>Waiting for token id</p>
            </ArtifactButton>
          </div>
        );
      case FileProcessStatus.Processing:
        return (
          <div>
            <p onClick={navigateToDetail} className="fileName">
              {`Smart Inscription #${file?.tokenId}` || file?.name}
            </p>
            <FileChunk file={file} />
            {finishedChunk < file.totalChunks && (
              <ArtifactButton
                variant={'primary'}
                className="ctaBtn"
                width={150}
                height={44}
                onClick={() => setShowInscribeModal(true)}
              >
                <p>
                  {showInscribeModal
                    ? 'Processing...'
                    : `Inscribe ${finishedChunk}/${file.totalChunks}`}
                </p>
              </ArtifactButton>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <StyledProcessingItem>
        <ThumbnailWrapper className="animationBorder" ref={matrixContainerRef}>
          <MatrixRainAnimation width={divWidth || 0} height={divHeight || 0} />
          <NFTDisplayBox
            collectionID={ARTIFACT_CONTRACT}
            contentClass="image"
            src={file?.fullPath}
            tokenID={file?.tokenId}
            type={file?.fileType}
          />
          <IconSVG
            src={`${CDN_URL}/icons/bi_clock-history.svg`}
            maxWidth="40"
            className="ic-loading"
          />
          <ThumbnailOverlay
            className="thumbnailOverlay"
            progress={progress}
          ></ThumbnailOverlay>
        </ThumbnailWrapper>
        {file?.status !== undefined && (
          <InfoWrapper>{renderContentStatus(file.status)}</InfoWrapper>
        )}
      </StyledProcessingItem>
      <ModalInscribeChunk
        show={showInscribeModal}
        handleClose={() => setShowInscribeModal(false)}
        file={file}
      />
    </>
  );
};

export default ProcessingItem;
