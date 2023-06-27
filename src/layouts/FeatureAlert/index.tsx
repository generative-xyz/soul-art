import React, { useCallback, useContext, useEffect } from 'react';
import s from './FeatureAlert.module.scss';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';
import { Feature, FeatureThumbnail } from '@/constants/feature';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';

const FeatureAlert = () => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);

  const { ownerTokenId } = useContext(AssetsContext);

  const router = useRouter();

  const availableFeatures = JSON.parse(
    sessionStorage.getItem('availableFeatures') || '[]'
  );

  const goToTokenPage = useCallback(() => {
    router.push(`${ROUTE_PATH.HOME}/${ownerTokenId}?tab=feat`);
  }, [ownerTokenId, router]);

  const getFeatureByIndex = (index: number): Feature | undefined => {
    const featureValues = Object.values(Feature);
    const feature = featureValues[index];
    return feature as Feature | undefined;
  };

  useEffect(() => {
    if (!isAuthenticated) toast.dismiss();
  }, [isAuthenticated]);

  return (
    <div className={s.wrapper}>
      {isAuthenticated &&
        availableFeatures &&
        availableFeatures.length > 0 &&
        availableFeatures.map(
          (featIndex: number) => {
            toast(
              t => (
                <div className={s.alert_wrapper} key={t.id}>
                  <IconSVG
                    src={`${CDN_URL}/ic-vector.svg`}
                    maxWidth={'13'}
                    maxHeight={'13'}
                    className={s.close_btn}
                    onClick={() => {
                      toast.remove(t.id);
                      const updatedFeatures = availableFeatures.filter(
                        (f: number) => {
                          if (f !== featIndex) return f;
                          else return null;
                        }
                      );
                      sessionStorage.setItem(
                        'availableFeatures',
                        JSON.stringify(updatedFeatures)
                      );
                    }}
                  />
                  <div className={s.content_wrapper}>
                    <div className={s.thumbnail_wrapper}>
                      <img
                        src={FeatureThumbnail[featIndex]}
                        alt={`Thumbnail of feature`}
                      />
                    </div>
                    <div className={s.content}>
                      <h6>Unlock {getFeatureByIndex(featIndex)}</h6>
                      <p>
                        You are eligible to unlock{' '}
                        {getFeatureByIndex(featIndex)}.
                      </p>
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
                },
              }
            );

            return <></>;
          }
          //   (
          //   <div className={s.alert_wrapper} key={`unlock-alert-${featIndex}`}>
          //     <IconSVG
          //       src={`${CDN_URL}/ic-vector.svg`}
          //       maxWidth={'13'}
          //       maxHeight={'13'}
          //       className={s.close_btn}
          //     />
          //     <div className={s.content_wrapper}>
          //       <div className={s.thumbnail_wrapper}>
          //         <img
          //           src="https://cdn.dev.generative.xyz/capture/dapp-1687761463373198532-1687761486.png"
          //           alt={`Thumbnail of feature`}
          //         />
          //       </div>
          //       <div>
          //         <h6>Unlock {getFeatureByIndex(featIndex)}</h6>
          //         <p>
          //           You are eligible to unlock {getFeatureByIndex(featIndex)}.
          //         </p>
          //       </div>
          //     </div>
          //     <Button className={s.unlock_btn} onClick={goToTokenPage}>
          //       Unlock now
          //       <IconSVG
          //         src={`${CDN_URL}/ic-arrow-right.svg`}
          //         maxWidth={'14'}
          //         maxHeight={'14'}
          //       />
          //     </Button>
          //   </div>
          // )
        )}
    </div>
  );
};

export default FeatureAlert;
