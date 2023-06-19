
import React from 'react';

interface IProps {
  url: string;
}

const Explorer: React.FC<IProps> = ({ url }: IProps): React.ReactElement => {
  return (
    <iframe
      sandbox={'allow-same-origin allow-scripts'}
      src={url}
    />
  );
}

export default Explorer;