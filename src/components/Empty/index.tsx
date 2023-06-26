import { StyledEmpty } from './Empty.styled';
import { CDN_URL } from '@/configs';

export type TEmpty = {
  infoText?: string;
  theme?: 'dark' | 'light',
};

const Empty = ({ infoText = 'No data found', }: TEmpty) => {
  return (
    <StyledEmpty>
      <img
        width={95}
        height={95}
        src={`${CDN_URL}/empty-icon.svg`}
        alt="Empty icon"
        className={'image'}
      />
      <p className="content">{infoText}</p>
    </StyledEmpty>
  );
};

export default Empty;
