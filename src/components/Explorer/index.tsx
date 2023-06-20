import React from 'react';
import styles from './style.module.scss';

interface IProps {
  url: string;
}

const Explorer: React.FC<IProps> = ({ url }: IProps): React.ReactElement => {
  return (
    <iframe
      className={styles.explorer}
      sandbox={'allow-same-origin allow-scripts'}
      src={url}
      id="frame-art"
    />
  );
};

export default Explorer;
