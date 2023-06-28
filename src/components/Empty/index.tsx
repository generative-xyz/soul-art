import { StyledEmpty } from './Empty.styled';
import { CDN_URL } from '@/configs';

export interface IProps {
  infoText?: string;
  theme?: 'dark' | 'light';
  imgHeight?: number;
  className?: string;
};

const Empty: React.FC<IProps> = ({ infoText = 'No data yet', imgHeight = 120, className = '' }: IProps): React.ReactElement => {
  return (
    <StyledEmpty className={className}>
      <img
        width={'auto'}
        height={imgHeight}
        src={`${CDN_URL}/empty-box.svg`}
        alt="Empty icon"
        className={'image'}
      />
      <p className="content">{infoText}</p>
    </StyledEmpty>
  );
};

export default Empty;
