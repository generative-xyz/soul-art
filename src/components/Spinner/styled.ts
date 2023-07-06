import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

const Container = styled.div<{
  width: string | number;
  height: string | number;
}>`
  position: relative;
  width: ${({ width }) => px2rem(width)};
  height: ${({ height }) => px2rem(height)};
  animation: rotateLoop 4s infinite linear;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-width: 80px;
  }

  @keyframes rotateLoop {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export { Container };
