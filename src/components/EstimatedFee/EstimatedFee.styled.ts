import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: ${px2rem(12)} 0;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  margin-bottom: ${px2rem(32)};

  .est-fee-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: ${px2rem(12)};
    }
  }

  .est-fee-title {
    font-weight: 500;
    font-size: ${px2rem(14)};
    line-height: 1.4;
    text-transform: uppercase;
    margin-bottom: ${px2rem(20)};
    letter-spacing: 0.08em;
  }

  .est-fee-item-title {
    font-weight: 400;
    font-size: ${px2rem(14)};
    line-height: 1.2;
    opacity: 0.6;
  }

  .est-fee-item-value {
    font-weight: 500;
    font-size: ${px2rem(14)};
    line-height: 1.2;
  }
`;
