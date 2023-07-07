import { CDN_URL } from '@/configs';
import { ABOUT_GM_ID, ABOUT_NBC_ID, TOKENMICS_ID } from '@/constants/gm-page';
import { ROUTE_PATH } from '@/constants/route-path';
import cs from 'classnames';
import s from './styles.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import IconSVG from '@/components/IconSVG';
import RowContent from '@/components/RowContent';
import Button from '@/components/Button';
import { GM_TOKEN_PAGE } from '@/constants/url';

const Gm: React.FC = (): React.ReactElement => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handlePlayVideo = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleExpandVideo = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className={s.gmPage}>
      <div
        className={cs(s.mainBannerBlock, s.mainBannerBlock__campaginStarted)}
        id={ABOUT_GM_ID}
        data-section={ABOUT_GM_ID}
      >
        <div className={s.bannerHeader}>
          <div className={cs(s.container, 'container')}>
            <h1 className={s.heading}>$GM</h1>
            <p className={s.subHeading}>
              <b>The first smart contract on Bitcoin.</b>
            </p>
            <p className={s.headingText}>
              Ethereum’s heyday is over. Bitcoin is the new home for dapps and
              smart contracts. More than a memecoin, $GM is both{' '}
              <a
                href="https://twitter.com/punk3700/status/1657478010696798208"
                target="_blank"
                className={s.headingLink}
              >
                the first smart contract
              </a>{' '}
              ever deployed on Bitcoin and the cryptocurrency powering Souls,{' '}
              <a
                href="https://newbitcoincity.com/souls"
                target="_blank"
                className={s.headingLink}
              >
                the first cryptoart protocol
              </a>
              . In fact, you must hold $GM in order to adopt a Soul as they
              work in tandem.
            </p>
          </div>
        </div>
        <div className={s.actionWrapper}>
          <Button
            onClick={() =>
              window.open(GM_TOKEN_PAGE)
            }
            className={s.submitBtn}
          >
            Collect $GM
          </Button>
          <Button
            onClick={() => router.push(ROUTE_PATH.CLAIM)}
            className={s.bridgeBtn}
          >
            Adopt a Soul
          </Button>
        </div>
      </div>

      <div className={cs(s.container, 'container')}>
        <div className={s.videoWrapper}>
          <div className={s.videoInner}>
            <img
              src={`${CDN_URL}/video-thumbnail.png`}
              alt='thumbnail'
            />
            <div
              className={s.playIconWrapper}
              onClick={handlePlayVideo}
            >
              <IconSVG
                src={`${CDN_URL}/ic-play-circle.svg`}
                className={s.playIcon}
              />
            </div>
            <div
              className={s.expandedIconWrapper}
              onClick={handleExpandVideo}
            >
              <IconSVG
                src={`${CDN_URL}/ic-arrow-expand.svg`}
                className={s.expandIcon}
              />
            </div>
            <video
              className={`${s.video} ${isPlaying ? s.video__play : ''}`}
              controls
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              ref={videoRef}
            >
              <source
                src={`${CDN_URL}/gm_video.mp4`}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <RowContent
          className={s.sectionBlock}
          id={ABOUT_NBC_ID}
          data-section={ABOUT_NBC_ID}
          heading={'A historical symbol of New Bitcoin City.'}
          btns={
            <div className={s.actionsWrapper}>
              <Button
                className={s.button}
                onClick={() => {
                  window.open(ROUTE_PATH.HOME, '_blank');
                }}
              >
                Visit New Bitcoin City
              </Button>
              <Button
                className={s.button}
                onClick={() => {
                  window.open('https://trustless.computer/', '_blank');
                }}
              >
                Build with Trustless Computer
              </Button>
            </div>
          }
          isImageRight
          imgUrl={`${CDN_URL}/gm-img-2_3.png`}
        >
          <p className={s.contentParagraph}>
            Welcome to New Bitcoin City. It is a radically new way to explore
            Bitcoin — more than just a currency.
          </p>
          <p className={s.contentParagraph}>
            New Bitcoin City is a diverse corner of web3. All neighborhoods
            are unique.{' '}
            <a
              target="_blank"
              className={s.contentLink}
              href="https://generative.xyz/"
            >
              Generative Village
            </a>{' '}
            has some of the most unique crypto art.{' '}
            <a
              target="_blank"
              className={s.contentLink}
              href="https://trustless.market/"
            >
              DeFi District
            </a>{' '}
            powers decentralized finance.{' '}
            <a
              target="_blank"
              className={s.contentLink}
              href="https://generative.xyz/ai"
            >
              Perceptrons Square
            </a>{' '}
            is known for on-chain AI.{' '}
            <a
              target="_blank"
              className={s.contentLink}
              href="https://generative.xyz/metaverse"
            >
              Fantasy Land
            </a>{' '}
            is an autonomous, self-evolving metaverse.
          </p>
          <p className={s.contentParagraph}>
            New Bitcoin City is powered by{' '}
            <a
              target="_blank"
              className={s.contentLink}
              href="https://trustless.computer/"
            >
              Trustless Computer
            </a>{' '}
            protocol. Trustless Computer lets developers write smart contracts
            on Bitcoin. Now you can build dapps on Bitcoin.
          </p>
          <p className={s.contentParagraph}>
            GM is the first smart contract ever deployed on New Bitcoin City.
          </p>
        </RowContent>
      </div>

      <div className={s.grayBg}>
        <div className={cs(s.container, 'container')}>
          <RowContent
            className={cs(s.sectionBlock)}
            id={TOKENMICS_ID}
            data-section={TOKENMICS_ID}
            heading={'Tokenomics'}
            btns={<></>}
            imgUrl={`${CDN_URL}/gm-img-3_1.png`}
          >
            <p className={s.listTitle}>
              <b>Total supply:</b> 10,000 $GM tokens
            </p>
            <ul className={s.contentList}>
              <li className={s.contentListItem}>80% crowdfunded</li>
              <li className={s.contentListItem}>
                10% reserved (future CEX listings, bridges, and liquidity
                pools)
              </li>
              <li className={s.contentListItem}>10% dev</li>
            </ul>
            <p className={s.listTitle}>
              <b>Fair Distribution:</b>
            </p>
            <ul className={s.contentList}>
              <li className={s.contentListItem}>
                Distributed via crowdfunding
              </li>
              <li className={s.contentListItem}>
                Renounced contract ownership
              </li>
              <li className={s.contentListItem}>No taxes on transactions</li>
            </ul>
          </RowContent>
        </div>
      </div>
    </div>
  );
};

export default Gm;
