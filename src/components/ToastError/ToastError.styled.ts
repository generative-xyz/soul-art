import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const ToastPending = styled.div`
  font-size: ${px2rem(16)};
  font-weight: 400;
  width: ${px2rem(410)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px2rem(22)};

  .content {
    margin-left: ${px2rem(8)};
  }

  .wallet-link {
    display: flex;
    align-items: center;
    color: #898989;
    font-weight: 600;
    gap: ${px2rem(4)};
  }
`;
