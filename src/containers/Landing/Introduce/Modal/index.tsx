import s from './style.module.scss';
import IconSVG from '@/components/IconSVG';
import ImageFrame from '@/components/ImageFrame';
import { useEffect } from 'react';

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
};

const HeroModal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
  const modalClose =
    'https://storage.googleapis.com/generative-static-prod/soul-art/mdClose.svg';
  const videoSrc = 'https://www.youtube.com/watch?v=PEM0Vs8jf1w';

  useEffect(() => {
    const backdrop = document.getElementById('js-modal');
    backdrop?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }, [showModal]);

  return (
    <div id={'js-modal'} className={`${s.modal} ${showModal ? s.show : ''}`}>
      <div className={s.wrapVideo}>
        <div className={s.videoBox}>
          <div onClick={closeModal} className={s.closeModal}>
            <IconSVG src={modalClose} maxWidth={'15'} maxHeight={'15'} />
            <span>Close</span>
          </div>
          <ImageFrame>
            <video src={videoSrc}></video>
          </ImageFrame>
        </div>
      </div>
    </div>
  );
};

export default HeroModal;
