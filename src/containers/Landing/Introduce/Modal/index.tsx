import s from './style.module.scss';
import IconSVG from '@/components/IconSVG';
import ImageFrame from '@/components/ImageFrame';
import { modalClose } from '@/constants/asset';
import { useEffect, useRef } from 'react';
import { CDN_URL } from '@/configs';

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
};

const HeroModal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const backdrop = document.getElementById('js-modal');

    backdrop?.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      videoRef.current?.pause();
      closeModal();
    });

    if (showModal) {
      videoRef.current?.play();
    }
  }, [showModal]);

  return (
    <div id={'js-modal'} className={`${s.modal} ${showModal ? s.show : ''}`}>
      <div className={s.wrapVideo}>
        <div className={s.videoBox}>
          <div onClick={closeModal} className={s.closeModal}>
            <IconSVG
              src={modalClose}
              maxWidth={'15'}
              maxHeight={'15'}
              className={s.iconClose}
            />
            <span>Close</span>
          </div>
          <ImageFrame>
            <video ref={videoRef} controls>
              <source src={`${CDN_URL}/TaleOfSoul_04_Compress.mp4`} type="video/mp4" />
            </video>
          </ImageFrame>
        </div>
      </div>
    </div>
  );
};

export default HeroModal;
