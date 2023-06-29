import Header from '@/layouts/Header';
import s from './style.module.scss';
import cs from 'classnames';
import { HEADER_HEIGHT } from '@/layouts';
import { CDN_URL, CLAIM_START_TIME } from '@/configs';
import { Container } from 'react-bootstrap';
import { ROUTE_PATH } from '@/constants/route-path';
import Link from 'next/link';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';
import { useMemo } from 'react';
import useTimeComparison from '@/hooks/useTimeComparison';

const Homepage = () => {
  const claimingStartComparisonResult = useTimeComparison(CLAIM_START_TIME);
  const isEventStarted =
    claimingStartComparisonResult !== null && claimingStartComparisonResult > 0;
  const renderCountdown = useMemo(() => {
    return (
      <>
        {!isEventStarted && (
          <span className={s.countdown}>
            <SonarWaveCircle />
            <CountdownText countDownTo={CLAIM_START_TIME} />
          </span>
        )}
      </>
    );
  }, [isEventStarted]);

  return (
    <div className={s.homeSection}>
      <Header height={HEADER_HEIGHT} isAnimation={false} theme={'dark'} />
      <div className={s.homeSection_background}>
        <img src={`${CDN_URL}/homebg.jpg`} alt="background" />
      </div>

      <Container className={s.container}>
        <div className={s.homeSection_box}>
          <p className={s.homeSection_content}>
            Souls and GM are two halves of a single artwork. Souls is the
            cryptoart protocol and GM is the native cryptocurrency powering the
            artwork.
          </p>
          <div className={s['homeSection-buttons']}>
            <Link href={ROUTE_PATH.CLAIM} className={cs(s.button, s.init)}>
              Adopt a Soul
              {renderCountdown}
            </Link>
            <Link
              href={'https://newbitcoincity.com/gm'}
              className={cs(s.button, s.trans)}
              target="_blank"
            >
              Get GM
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
