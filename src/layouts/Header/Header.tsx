import { AnimFade } from '@Animations/Fade';
import classNames from 'classnames';
import ContentHeader from './ContentHeader';
import { Wrapper } from './Header.styled';
import headerStyles from './header.module.scss';

const Header = ({
  height,
  isAnimation,
  theme,
}: {
  height: number;
  isAnimation?: boolean;
  theme?: string;
}) => {
  return (
    <Wrapper
      className={classNames(
        headerStyles.header,
        theme ? headerStyles[theme] : ''
      )}
      style={{ height }}
    >
      {isAnimation ? (
        <AnimFade>
          <ContentHeader />
        </AnimFade>
      ) : (
        <ContentHeader />
      )}
    </Wrapper>
  );
};

export default Header;
