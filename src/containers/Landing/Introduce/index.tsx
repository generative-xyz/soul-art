import Button from '@/components/Button';
import Text from '@Animations/Text';
import {AnimFade} from '@Animations/Fade';
import s from './style.module.scss';
import cs from 'classnames';
import ImageFrame from '@/components/ImageFrame';
import IconSVG from '@/components/IconSVG';
import HeroModal from './Modal';
import { useState } from 'react';

const Introduce: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const imgHero =
    'https://storage.googleapis.com/generative-static-prod/soul-art/mdImg.jpg';
  const modalPlay =
    'https://storage.googleapis.com/generative-static-prod/soul-art/mdPlay.svg';

  const handleOpenModal = () => {
    setIsShow(true);
  };

  const handleCloseModal = () => {
    setIsShow(false);
  };

  return (
    <div className={s.introduce}>
      <div className={s['introduceBox']}>
        <Text animOption={{screen: 0, offset: 0, type: 'heading'}} className={s['introduce-box_title']}>Lorem ipsum dolor sit amet</Text>
        <Text animOption={{screen: .3, offset: 0, type: 'paragraph'}} className={s['introduce-box_desc']}>
          Once upon a time, in the magical land of New Bitcoin City, there was a
          unique and extraordinary force known as GM tokens. They were more than just
          digital assets—they were the embodiment of belief and hope for a brighter
          future.
        </Text>

        <AnimFade className={s['introduce-box_buttons']} screen={.6}>
          <Button className={cs(s.button, s.init)}>Explore art</Button>
          <Button className={cs(s.button, s.trans)}>Claim Souls</Button>
        </AnimFade>

        <AnimFade className={s['introduce-video']} screen={1}>
          <h5 className={s['introduceVideo-title']}>Watch video story</h5>
          <div className={s['wrap-video']}>
            <ImageFrame>
              <img src={imgHero} alt="videoplay" />
              <IconSVG
                src={modalPlay}
                maxWidth={'40'}
                maxHeight={'40'}
                className={s.modalPlay}
                onClick={handleOpenModal}
              />
            </ImageFrame>
          </div>
        </AnimFade>
      </div>
      <HeroModal showModal={isShow} closeModal={handleCloseModal} />
    </div>
  );
};

export default Introduce;
