import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${px2rem(120)};

  .mainContent {
    text-align: center;

    .title {
      max-width: 600px;
      font-weight: 500;
      font-size: ${px2rem(24)};
      line-height: 1.4;
      text-align: center;
      margin-bottom: ${px2rem(12)};
    }

    .desc {
      font-weight: 400;
      font-size: ${px2rem(16)};
      line-height: 1.4;
      text-align: center;
      margin-bottom: ${px2rem(24)};
    }
  }
`;

export const ConnectWalletButton = styled.button`
  background: linear-gradient(#fff, #fff) padding-box,
    conic-gradient(
        from 168.15deg at 46.78% 60%,
        #8f7dc2 0deg,
        #00b2d9 135deg,
        #9099fc 256.87deg,
        #d87cee 360deg
      )
      border-box;
  color: #313149;
  padding: ${px2rem(10)} ${px2rem(20)};
  border: 2px solid transparent;
  border-radius: 100px;
  display: inline-block;
  font-size: ${px2rem(12)};
  line-height: 1.4;
  font-family: var(--sora-font);
  text-transform: uppercase;
  font-weight: 600;
  margin-inline: auto;

  &:disabled {
    opacity: 0.6;
  }

  :disabled {
    opacity: 0.8;
  }
`;
