import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { Feature } from '@/constants/feature';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import s from './HistoryAlert.module.scss';

const HistoryAlert = () => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const [alertList, setAlertList] = useState<string[]>([]);

  const { historyAlerts, ownerTokenId } = useContext(AssetsContext);

  const router = useRouter();

  const goToTokenPage = useCallback(() => {
    router.push({ pathname: `${ROUTE_PATH.HOME}/${ownerTokenId}` }, undefined, {
      shallow: false,
    });
  }, [ownerTokenId]);

  const handleCloseAlert = useCallback(
    (t: { id: string | undefined }) => {
      if (!alertList) return;

      toast.dismiss(t.id);
      const closedAlert = JSON.parse(
        localStorage.getItem('closed_history_alert') || '[]'
      );

      const updatedClosedAlert = [...closedAlert, ...alertList];

      localStorage.setItem(
        'closed_history_alert',
        JSON.stringify(updatedClosedAlert)
      );
    },
    [alertList]
  );

  useEffect(() => {
    if (historyAlerts && historyAlerts.length > 0) {
      const closedAlert = JSON.parse(
        localStorage.getItem('closed_history_alert') || '[]'
      );
      const updatedHistoryAlerts = historyAlerts.filter(feat => {
        if (!feat.featureName) return;
        return !closedAlert.includes(feat.featureName);
      });
      setAlertList(updatedHistoryAlerts.map(feat => feat.featureName));
    }
  }, [historyAlerts]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.dismiss('history-alert');
      return;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!historyAlerts || !alertList || alertList.length === 0) return;

    const features = alertList
      .map((feat: string) => Feature[feat as keyof typeof Feature])
      .join(', ');

    toast(
      t => (
        <div className={s.alert_wrapper} key={t.id}>
          <div className={s.content_wrapper}>
            <div className={s.alert_heading}>
              <IconSVG
                maxHeight="20"
                maxWidth="20"
                src={`${CDN_URL}/ic-verify-check.svg`}
              />
              <h5>New Effects Added</h5>
            </div>
            <div className={s.thumbnail_wrapper}>
              <img
                src={historyAlerts[0].imageCapture}
                alt={`Thumbnail of feature`}
              />
            </div>
            <div className={s.content}>
              <p>{features} effects were unlocked successfully.</p>
            </div>
          </div>
          <Button
            className={s.unlock_btn}
            onClick={() => {
              handleCloseAlert(t);
              goToTokenPage();
            }}
          >
            Check your Soul here
            <IconSVG
              src={`${CDN_URL}/ic-arrow-right.svg`}
              maxWidth={'14'}
              maxHeight={'14'}
            />
          </Button>
          <Button className={s.close_btn} onClick={() => handleCloseAlert(t)}>
            Close
          </Button>
        </div>
      ),
      {
        id: `history-alert`,
        position: 'bottom-right',
        duration: Infinity,
        className: s.alert,
        style: {
          background: '#fff',
          boxShadow: '0px 0px 24px -6px rgba(0, 0, 0, 0.16)',
          borderRadius: '12px',
          padding: '20px',
          width: '248px',
          margin: '0px',
          transform: 'translateY(0px)',
        },
      }
    );
  }, [historyAlerts, alertList]);

  return <div className={s.wrapper}></div>;
};

export default HistoryAlert;
