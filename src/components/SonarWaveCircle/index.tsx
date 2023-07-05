import React from 'react';
import s from './styles.module.scss';
import cs from 'classnames';

interface IProps {
  className?: string;
}

const SonarWaveCircle: React.FC<IProps> = ({ className }: IProps): React.ReactElement => {
  return (
    <div className={cs(s.sonarWrapper, className)}>
      <div className={cs(s.sonarEmitter, 'sonarEmitter')}>
        <div className={s.sonarWave}></div>
      </div>
    </div>
  )
}

export default SonarWaveCircle;