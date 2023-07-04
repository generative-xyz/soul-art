import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { FeatureThumbnail } from '@/constants/feature';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import s from './FeatureAlert.module.scss';

const FeatureAlert = () => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const [featureList, setFeatureList] = useState<number[]>([]);

  const { availableFeatures, ownerTokenId } = useContext(AssetsContext);

  const router = useRouter();

  const { tokenId } = router.query as { tokenId: string };

  const goToTokenPage = useCallback(() => {
    router.push({ pathname: `${ROUTE_PATH.HOME}/${ownerTokenId}` }, undefined, {
      shallow: false,
    });
  }, [ownerTokenId, router]);

  const handleCloseAlert = useCallback(
    (t: { id: string | undefined }) => {
      if (!featureList) return;

      toast.dismiss(t.id);
      const closedAlert = JSON.parse(
        localStorage.getItem('closed_alert') || '[]'
      );

      const updatedClosedAlert = [...closedAlert, ...featureList];

      localStorage.setItem('closed_alert', JSON.stringify(updatedClosedAlert));
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
    if (tokenId || !featureList || featureList.length === 0) return;
    const featIndex = featureList[1];
    toast(
      t => (
        <div className={s.alert_wrapper} key={t.id}>
          <IconSVG
            src={`${CDN_URL}/ic-vector.svg`}
            maxWidth={'13'}
            maxHeight={'13'}
            className={s.close_btn}
            onClick={() => handleCloseAlert(t)}
          />
          <div className={s.content_wrapper}>
            <div className={s.thumbnail_wrapper}>
              <img
                src={FeatureThumbnail[featIndex]}
                alt={`Thumbnail of feature`}
              />
            </div>
            <div className={s.content}>
              <h6>Unlock Feature</h6>
              <p>You have feature available to unlock.</p>
            </div>
          </div>
          <Button className={s.unlock_btn} onClick={goToTokenPage}>
            Unlock now
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
  }, [featureList, goToTokenPage, handleCloseAlert, tokenId]);

  return <div className={s.wrapper}></div>;
};

export default FeatureAlert;
