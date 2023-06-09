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
  return (
    <div ref={refBox} className={s.main}>
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
                      {` Ownership assumes an exceptional definition within the world of Souls.
Since Souls cannot be transferred or sold, they represent a very close personal connection to your beliefs. A soul searches for a new connection with someone whose belief is strong when it senses a decline in your attention.`}
                    </Text>
                  </div>

                  <div ref={lPart2} className={s.wrapSectionContent_item}>
                    <Text className={s.sectionContent}>
                      {`When you adopt a Soul, the funds contribute to the support of the Souls DAO. This self-governing and decentralized organization is dedicated to nurturing the community and advancing forthcoming endeavors.`}
                    </Text>
                  </div>
                </div>
                <AnimFade offset={0.2} className={s.tag}>
                  <TextAnimate>
                    <span>A one-of-a-kind approach to ownership</span>
                  </TextAnimate>
                </AnimFade>
              </div>
            </Col>
          </Container>
        </div>
      </VideoBg>
    </div>
  );
};

export default Flare;
