import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Wrapper = styled.div`
  height: 100vh;
  padding-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  .mainContent {
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
      margin-bottom: ${px2rem(28)};
    }
  }
`;

export const ConnectWalletButton = styled.button`
  font-size: ${px2rem(14)};
  line-height: 1.4;
  font-weight: 400;
  display: flex;
  align-items: center;
  border: 1px solid #ECECEC;
  backdrop-filter: blur(2px);
  border-radius: 100px !important;
  padding: ${px2rem(12)} ${px2rem(20)} !important;
  display: flex;
  gap: ${px2rem(12)};
  margin: 0 auto;

  :disabled {
    opacity: 0.8;
  }
`;
