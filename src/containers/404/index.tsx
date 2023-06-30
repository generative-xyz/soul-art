import { CDN_URL } from '@/configs';
import { Container } from './404.styled';

const Page404: React.FC = (): React.ReactElement => {
  return (
    <Container>
      <img className='image' src={`${CDN_URL}/404-bg.svg`} alt="404 background" />
      <h1 className="page-title">404 not found</h1>
    </Container>
  );
};

export default Page404;
