import Button from '@/components/Button';
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
        <h1 className={s['introduceBox-title']}>Lorem ipsum dolor sit amet</h1>
        <p className={s['introduceBox-desc']}>
          Once upon a time, in the magical land of New Bitcoin City, there was a
          unique and extraordinary force known as GM tokens. They were more than just
          digital assets—they were the embodiment of belief and hope for a brighter
          future.
        </p>

        <div className={s['introduceBox-buttons']}>
          <Button className={cs(s.button, s.init)}>Explore art</Button>
          <Button className={cs(s.button, s.trans)}>Claim Souls</Button>
        </div>

        <div className={s['introduceVideo']}>
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
        </div>
      </div>
      <HeroModal showModal={isShow} closeModal={handleCloseModal} />
    </div>
  );
};

export default Introduce;
