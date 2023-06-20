import px2rem from '@/utils/px2rem';
import { Popover } from 'react-bootstrap';
import styled, { DefaultTheme } from 'styled-components';

export const WalletPopover = styled(Popover)`
  width: ${px2rem(200)};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  /* border: 1px solid rgba(120, 170, 143); */
  background-color: rgba(255, 255, 255, 0.1);

  position: relative;

  .wrapper {
    padding: ${px2rem(16)} ${px2rem(20)};
    background-color: rgba(255, 255, 255, 0.1);
    z-index: 2;
  }

  .icCopy {
    cursor: pointer;
  }

  .wallet-tc,
  .wallet-btc {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${px2rem(16)};
  }

  .wallet-item {
    display: flex;
    align-items: center;
    gap: ${px2rem(8)};
  }
  .wallet-address {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  }

  .wallet-link,
  .wallet-disconnect {
    display: flex;
    align-items: center;
    gap: ${px2rem(12)};
    cursor: pointer;

    :hover {
      opacity: 0.6;
    }

    p {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    }
  }

  .wallet-link {
    margin-top: ${px2rem(20)};
    margin-bottom: ${px2rem(20)};
    p {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    }
  }

  .divider {
    margin-bottom: ${px2rem(16)};
    border-bottom: 1px solid #ececed;
    opacity: 0.15;
  }

  &.popover {
    /* display: none; */

    .popover-arrow {
      width: 100%;
      transform: translate(0px, 0px) !important;
    }

    .popover-arrow::after {
      width: 100%;
      border-bottom-color: transparent !important;
    }
  }
`;
