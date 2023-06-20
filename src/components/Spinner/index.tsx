import { Container } from '@/components/Spinner/styled';
import { CDN_URL } from '@/configs';

interface IProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Spinner = ({ className, width = 80, height = 80 }: IProps) => (
  <Container className={className} width={width} height={height}>
    <img src={`${CDN_URL}/ic-loading-dark.svg`} alt="ic-loading" />
  </Container>
);

export default Spinner;
