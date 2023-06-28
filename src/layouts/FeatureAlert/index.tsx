import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import s from './FeatureAlert.module.scss';

const FeatureAlert = () => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  // const [featureList, setFeatureList] = useState<number[]>([
  //   0, 1, 2, 3, 4, 5, 6, 7,
  // ]);

  // const { availableFeatures, ownerTokenId } = useContext(AssetsContext);

  // const router = useRouter();

  // const goToTokenPage = useCallback(() => {
  //   router.push(`${ROUTE_PATH.HOME}/${ownerTokenId}?tab=feat`);
  // }, [ownerTokenId, router]);

  // const getFeatureByIndex = (index: number): Feature | undefined => {
  //   const featureValues = Object.values(Feature);
  //   const feature = featureValues[index];
  //   return feature as Feature | undefined;
  // };

  // const handleCloseAlert = useCallback(
  //   (t: { id: string | undefined }, id: number) => {
  //     if (!availableFeatures) return;

  //     toast.remove(t.id);
  //     const closedAlert = JSON.parse(
  //       localStorage.getItem('closed_alert') || '[]'
  //     );

  //     const updatedClosedAlert = [...closedAlert, id];

  //     localStorage.setItem('closed_alert', JSON.stringify(updatedClosedAlert));

  //     // filter availableFeatures by closedAlert
  //   },
  //   [availableFeatures]
  // );

  // useEffect(() => {
  //   if (availableFeatures && availableFeatures.length > 0) {
  //     const closedAlert = JSON.parse(
  //       localStorage.getItem('closed_alert') || '[]'
  //     );
  //     const updatedAvailableFeatures = availableFeatures.filter(
  //       (feat: number) => {
  //         return !closedAlert.includes(feat);
  //       }
  //     );
  //     setFeatureList(updatedAvailableFeatures);
  //   }
  //   // setFeatureList([0, 1, 2, 3, 4, 5, 6, 7]);
  // }, [availableFeatures]);

  useEffect(() => {
    if (!isAuthenticated) toast.dismiss();
  }, [isAuthenticated]);

  return (
    <div className={s.wrapper}>
      {/* {isAuthenticated &&
        featureList &&
        featureList.length > 0 &&
        featureList.map(
          (featIndex: number) => {
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
                  transform: 'translateY(0px)',
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
        )} */}
    </div>
  );
};

export default FeatureAlert;
