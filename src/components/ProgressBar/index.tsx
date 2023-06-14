import { progressPlay, progressPoint, progressZoom } from '@/constants/url';
import IconSVG from '../IconSVG';
import s from './style.module.scss';

const ProgressBar = () => {
  return (
    <div className={s.progressBar}>
      <IconSVG
        src={progressPlay}
        maxWidth={'48'}
        maxHeight={'48'}
        className={`${s.playBtn} ${s.btn}`}
      />
      <div className={s.progress}>
        <IconSVG
          src={progressPoint}
          maxWidth={'20'}
          maxHeight={'20'}
          className={s.point}
        />
        <div id={'js-line'} className={s.line}></div>
      </div>
      <IconSVG
        src={progressZoom}
        maxWidth={'36'}
        maxHeight={'36'}
        className={`${s.zoomBtn} ${s.btn}`}
      />
    </div>
  );
};

export default ProgressBar;
