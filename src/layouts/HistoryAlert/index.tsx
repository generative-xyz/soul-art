import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import s from './HistoryAlert.module.scss';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import Button from '@/components/Button';
import { Feature, FeatureThumbnail } from '@/constants/feature';
import { useRouter } from 'next/router';
import { AssetsContext } from '@/contexts/assets-context';
import { ROUTE_PATH } from '@/constants/route-path';

const HistoryAlert = () => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const [featureList, setFeatureList] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { availableFeatures, ownerTokenId } = useContext(AssetsContext);

  const router = useRouter();

  const { tokenId } = router.query as { tokenId: string };

  const goToTokenPage = useCallback(() => {
    router.push({ pathname: `${ROUTE_PATH.HOME}/${ownerTokenId}` }, undefined, {
      shallow: false,
    });
  }, [ownerTokenId, router]);

  const getFeatureByIndex = (index: number): Feature | undefined => {
    const featureValues = Object.values(Feature);
    const feature = featureValues[index];
    return feature as Feature | undefined;
  };

  const handleCloseAlert = useCallback(
    (t: { id: string | undefined }, id: number) => {
      if (!featureList) return;

      toast.dismiss(t.id);
      const closedAlert = JSON.parse(
        localStorage.getItem('closed_alert') || '[]'
      );

      const updatedClosedAlert = [...closedAlert, id];

      localStorage.setItem('closed_alert', JSON.stringify(updatedClosedAlert));

      setCurrentIndex(prev => {
        return prev + 1;
      });
    },
    [featureList]
  );

  useEffect(() => {
    if (availableFeatures && availableFeatures.length > 0) {
      const closedAlert = JSON.parse(
        localStorage.getItem('closed_alert') || '[]'
      );
      const updatedAvailableFeatures = availableFeatures.filter(
        (feat: number) => {
          return !closedAlert.includes(feat);
        }
      );
      setFeatureList(updatedAvailableFeatures);
    }
  }, [availableFeatures]);

  useEffect(() => {
    if (!isAuthenticated || !featureList || tokenId) {
      toast.dismiss();
      return;
    }
  }, [isAuthenticated, featureList, goToTokenPage, handleCloseAlert, tokenId]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === featureList.length || tokenId)
      return;
    const featIndex = featureList[currentIndex];
    toast(
      t => (
        <div className={s.alert_wrapper} key={t.id}>
          <IconSVG
            src={`${CDN_URL}/ic-vector.svg`}
            maxWidth={'13'}
            maxHeight={'13'}
            className={s.close_btn}
            onClick={() => handleCloseAlert(t, featIndex)}
          />
          <div className={s.content_wrapper}>
            <div className={s.thumbnail_wrapper}>
              <img src={FeatureThumbnail[0]} alt={`Thumbnail of feature`} />
            </div>
            <div className={s.content}>
              <h6>Feature Unlocked</h6>
              <p>You have unlock {getFeatureByIndex(featIndex)}.</p>
            </div>
          </div>
          <Button className={s.unlock_btn} onClick={goToTokenPage}>
            Check now
            <IconSVG
              src={`${CDN_URL}/ic-arrow-right.svg`}
              maxWidth={'14'}
              maxHeight={'14'}
            />
          </Button>
        </div>
      ),
      {
        id: `unlock-alert-${featIndex}`,
        position: 'bottom-right',
        duration: Infinity,

        style: {
          background: '#fff',
          boxShadow: '0px 0px 24px -6px rgba(0, 0, 0, 0.16)',
          borderRadius: '8px',
          padding: '20px',
          minWidth: '400px',
          transform: 'translateY(0px)',
        },
      }
    );
  }, [currentIndex, featureList, goToTokenPage, handleCloseAlert, tokenId]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [availableFeatures]);

  return <div className={s.wrapper}></div>;
};

export default HistoryAlert;
