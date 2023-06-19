import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import { Col, Container } from 'react-bootstrap';
import VideoBg from '../VideoBg';
import Text from '@/animations/Text';
import { AnimFade } from '@/animations/Fade';
import { CDN_URL } from '@/configs';
import { useScrollFixed } from '@Hooks/useScorllFixed';
import { useCallback, useRef } from 'react';
import { useFrameProcessing } from '@Hooks/useFrameProcessing';
import { useWindowSize } from '@trustless-computer/dapp-core';
import { mobileFlare } from '@/constants/asset';

const Flare: React.FC = () => {
  const refBox = useRef<HTMLDivElement | null>(null);
  const lPart1 = useRef<HTMLDivElement | null>(null);
  const lPart2 = useRef<HTMLDivElement | null>(null);

  const part1Frame = useFrameProcessing(lPart1, {
    startIn: 0,
    endIn: 0,
    startOut: 30,
    endOut: 40,
  });
  const part2Frame = useFrameProcessing(lPart2, {
    startIn: 50,
    endIn: 60,
    startOut: 100,
    endOut: 100,
  });

  const onUpdate = useCallback(
    (seft: any) => {
      part1Frame(seft.progress * 100);
      part2Frame(seft.progress * 100);
    },
    [part1Frame, part2Frame]
  );

  useScrollFixed(refBox, 1200, onUpdate);

  const { mobileScreen } = useWindowSize();

  const MobileFlare = () => {
    return (
      <div className={s.mobileFlare}>
        <div className={s.image}>
          <img src={mobileFlare} alt="background image" />
        </div>
        <Container className={s.container}>
          <div className={s.wrapSectionContent}>
            <div className={s.wrapSectionContent_inner}>
              <p className={s.sectionContent}>
                {`In the world of SOULS, ownership takes on a unique meaning. Souls cannot be sold or transferred—representing a deep personal connection to your beliefs. When a Soul feels a decline in your attention, it seeks a new connection with someone whose belief burns bright. `}
              </p>

              <p className={s.sectionContent}>
                {`The adoption process allows you to welcome a Soul into your digital realm, with the funds going to the SOULS DAO. This decentralized, autonomous organization supports the community and future projects. `}
              </p>
            </div>
            <div className={s.tag}>
              <TextAnimate>
                <span>A one-of-a-kind ownership system</span>
              </TextAnimate>
            </div>
          </div>
        </Container>
      </div>
    );
  };

  const DesktopFlare = () => {
    return (
      <VideoBg videoUrls={{ mp4: `${CDN_URL}/block-2-min.mp4` }}>
        <div className={s.flareSection}>
          <Container className={s.container}>
            <Col
              xs={{ span: 10, offset: 1 }}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              className={s.column}
            >
              <div className={s.wrapSectionContent}>
                <div className={s.wrapSectionContent_inner}>
                  <div ref={lPart1} className={s.wrapSectionContent_item}>
                    <Text className={s.sectionContent}>
                      {`In the world of SOULS, ownership takes on a unique meaning. Souls cannot be sold or transferred—representing a deep personal connection to your beliefs. When a Soul feels a decline in your attention, it seeks a new connection with someone whose belief burns bright. `}
                    </Text>
                  </div>

                  <div ref={lPart2} className={s.wrapSectionContent_item}>
                    <Text className={s.sectionContent}>
                      {`The adoption process allows you to welcome a Soul into your digital realm, with the funds going to the SOULS DAO. This decentralized, autonomous organization supports the community and future projects. `}
                    </Text>
                  </div>
                </div>
                <AnimFade offset={0.2} className={s.tag}>
                  <TextAnimate>
                    <span>A one-of-a-kind ownership system</span>
                  </TextAnimate>
                </AnimFade>
              </div>
            </Col>
          </Container>
        </div>
      </VideoBg>
    );
  };

  return (
    <div ref={refBox} className={s.main}>
      {mobileScreen ? <MobileFlare /> : <DesktopFlare />}
    </div>
  );
};

export default Flare;
