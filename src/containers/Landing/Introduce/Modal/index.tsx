import s from './style.module.scss';
import IconSVG from '@/components/IconSVG';
import ImageFrame from '@/components/ImageFrame';
import { modalClose } from '@/constants/asset';
import { useEffect } from 'react';
import { CDN_URL } from '@/configs';

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
};

const HeroModal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
  useEffect(() => {
    const backdrop = document.getElementById('js-modal');
    backdrop?.addEventListener('click', e => {
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
            <video controls>
              <source src={`${CDN_URL}/output.webm`} type="video/webm" />
              <source src={`${CDN_URL}/output.mp4`} type="video/mp4" />
            </video>
          </ImageFrame>
        </div>
      </div>
    </div>
  );
};

export default HeroModal;
