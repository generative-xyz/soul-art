import Button from '@/components/Button';
import s from './style.module.scss';
import cs from 'classnames';
import VideoBg from '../VideoBg';
import { MP4_VIDEO_URL2, WEBM_VIDEO_URL2 } from '@/constants/url';
import Text from '@/animations/Text';
import { AnimFade } from '@/animations/Fade';

const Sunback = () => {
  return (
    <VideoBg videoUrls={{ mp4: MP4_VIDEO_URL2, webm: WEBM_VIDEO_URL2 }}>
      <div className={s.sunbackSection}>
        <div className={s.wrapContent}>
          <Text
            animOption={{ screen: 0, offset: 0, type: 'heading' }}
            className={s.sectionTitle}
          >
            Lorem ipsum dolo sit amet consectetur.
          </Text>
          <Text
            animOption={{ screen: 0, offset: 0.1, type: 'paragraph' }}
            className={s.sectionContent}
          >
            Welcome to New Bitcoin City, where the sun&apos;s enchantment and
            the belief in GM tokens guide us toward a future brighter than we
            can ever imagine.
          </Text>
          <AnimFade offset={0.2}>
            <div className={s.buttons}>
              <Button className={cs(s.button, s.init)}>Explore art</Button>
              <Button className={cs(s.button, s.trans)}>Claim Souls</Button>
            </div>
          </AnimFade>
        </div>
      </div>
    </VideoBg>
  );
};

export default Sunback;
