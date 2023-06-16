import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Wrapper = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;

  .mainContent {
    .title {
      max-width: 600px;
      font-weight: 500;
      font-size: ${px2rem(64)};
      line-height: 1.2;
      text-align: center;
      margin-bottom: ${px2rem(16)};
    }

    .desc {
      font-weight: 400;
      font-size: ${px2rem(24)};
      line-height: 1.4;
      text-align: center;
      margin-bottom: ${px2rem(32)};
    }

    .button-container {
      margin: auto;
    }
  }
`;

export const ConnectWalletButton = styled.button`
  padding: ${px2rem(15)} ${px2rem(24)};
  font-size: ${px2rem(32)};
  line-height: ${px2rem(26)};
  font-weight: 400;
  border-radius: 2px;
  position: relative;
  display: flex;
  align-items: center;

  .wallet-icon {
    margin-right: ${px2rem(12)};
  }

  :disabled {
    opacity: 0.8;
  }
`;
