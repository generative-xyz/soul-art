import { Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

// import IconSVG from '@/components/IconSVG';
// import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ARTIFACT_CONTRACT } from '@/configs';
import AuctionInfo from './AuctionInfoo';
import DetailImg from './MiddleImg';
import { IInscription } from '@/interfaces/api/inscription';
import Info from './Info';
// import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
// import {useContext} from 'react'
import Spinner from '@/components/Spinner';
import { getNFTDetail } from '@/services/nft-explorer';
import logger from '@/services/logger';
// import UploadFooter from '../Artifacts/UploadFooter';
// import ModalUpload from '../Artifacts/ModalUpload';
// import { useSelector } from 'react-redux';
// import { getIsAuthenticatedSelector } from '@/state/user/selector';
// import { WalletContext } from '@/contexts/wallet-context';
// import { showToastError } from '@/utils/toast';
import s from './style.module.scss';
// import {  refreshMetadata } from '@/services/nft-explorer';
// import { formatTimeStamp } from '@/utils/time';
// import { prettyPrintBytes } from '@/utils/units';
import { useRouter } from 'next/router';

const Inscription = ({ data }: { data?: IInscription }) => {
  const router = useRouter();
  const { tokenId } = router.query as {
    tokenId: string;
  };
  const [inscription, setInscription] = useState<IInscription | undefined>(
    data
  );
  // const [loadingRefresh, setLoadingRefresh] = useState(false);
  // const [file, setFile] = useState<File | null>(null);
  // const [showUploadModal, setShowUploadModal] = useState(false);
  // const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  // const { onDisconnect, onConnect, requestBtcAddress } =
  //   useContext(WalletContext);

  // const handleConnectWallet = async () => {
  //   try {
  //     await onConnect();
  //     await requestBtcAddress();
  //   } catch (err) {
  //     logger.error(err);
  //     showToastError({
  //       message: (err as Error).message,
  //     });
  //     onDisconnect();
  //   }
  // };

  useEffect(() => {
    if (!data) {
      fetchInscriptionDetail();
    }
  }, [data]);

  const fetchInscriptionDetail = async () => {
    try {
      const data = await getNFTDetail({
        contractAddress: ARTIFACT_CONTRACT,
        tokenId: tokenId,
      });
      setInscription(data);
    } catch (error) {
      logger.error(error);
      router.push(ROUTE_PATH.NOT_FOUND);
    }
  };

  // const onChangeFile = (file: File): void => {
  //   setFile(file);
  // };

  // const handlePreserverArtifact = () => {
  //   if (!isAuthenticated) handleConnectWallet();
  //   else if (file) {
  //     setShowUploadModal(true);
  //   }
  // };

  // const renderListItem = (title: string, desc?: string, link?: string) => {
  //   return (
  //     <div className="item">
  //       <p className="name">{title}</p>
  //       {link ? (
  //         <a className="link" href={link}>
  //           {desc}
  //         </a>
  //       ) : (
  //         <p className="desc">{desc}</p>
  //       )}
  //     </div>
  //   );
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const renderProperties = (attributes: any[]) => (
  //   <div className="list-container">
  //     <p className="list-name">Attributes</p>
  //     <div className="attribute-list">
  //       {attributes.length > 0 &&
  //         attributes.map((trait, index) => {
  //           return (
  //             <div key={index.toString()} className="properties-item">
  //               <p className="properties-trait-type">{trait.traitType}</p>
  //               <p className="properties-trait-value">{trait.value}</p>
  //             </div>
  //           );
  //         })}
  //     </div>
  //   </div>
  // );

  // const handleRefreshMetadata = async () => {
  //   try {
  //     if (!inscription) return;

  //     setLoadingRefresh(true);
  //     await refreshMetadata(ARTIFACT_CONTRACT, inscription.tokenId);
  //   } catch (err: unknown) {
  //     logger.debug('Failed to refresh metadata');
  //   } finally {
  //     setTimeout(() => {
  //       setLoadingRefresh(false);
  //     }, 2000);
  //   }
  // };

  // useEffect(() => {
  //   if (file) {
  //     setShowUploadModal(true);
  //   }
  // }, [file]);

  if (!inscription) {
    return (
      <div className="grid-center h-full-view">
        <Spinner></Spinner>;
      </div>
    );
  }

  return (
    <div className={s.artDetail}>
      <Container>
        <Row>
          <Col lg={4}>
            <AuctionInfo />
          </Col>
          <Col lg={5}>
            <DetailImg img={inscription.image} />
          </Col>
          <Col lg={3}>
            <Info />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Inscription);
