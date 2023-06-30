import { px2rem } from '@trustless-computer/dapp-core';
import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${px2rem(32)};

  .image {
    max-height: ${px2rem(192)};
    object-fit: contain;
    margin-left: ${px2rem(20)};
  }

  .page-title {
    font-weight: 500;
    font-size: ${px2rem(28)};
    line-height: 140%;
    color: #5B5B5B;
    text-align: center;
  }
`;
