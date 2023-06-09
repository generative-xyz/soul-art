import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${px2rem(24)};
  padding-bottom: ${px2rem(24)};

  .image {
    margin-bottom: ${px2rem(24)}
  }

  .content {
    color: #fff;
    font-weight: 400;
    font-size: ${px2rem(16)};
    line-height: 1.4;
  }
`;
