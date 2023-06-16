import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import { Container } from 'react-bootstrap';
import VideoBg from '../VideoBg';
import { WEBM_VIDEO_URL1, MP4_VIDEO_URL1 } from '@Constants/url';
import Text from '@/animations/Text';
import { AnimFade } from '@/animations/Fade';

const Flare: React.FC = () => {
  return (
    <div className={s.main}>
      <VideoBg videoUrls={{ mp4: MP4_VIDEO_URL1, webm: WEBM_VIDEO_URL1 }}>
        <div className={s.flareSection}>
          <Container className={s.container}>
            <div className={s.wrapSectionContent}>
              <Text
                animOption={{ screen: 0, offset: 0.5, type: 'paragraph' }}
                className={s.sectionContent}
              >
                But beware, for as with any tale, there were challenges along
                the way. When doubt and uncertainty clouded the hearts of the
                believers, the sun&apos;s radiance waned, casting shadows upon
                the artworks.
              </Text>

              <AnimFade offset={0.7}>
                <a href="" className={s.tag}>
                  <TextAnimate>
                    <span>Lorem ipsum dolor</span>
                  </TextAnimate>
                </a>
              </AnimFade>
            </div>
          </Container>
        </div>
      </VideoBg>
    </div>
  );
};

export default Flare;
