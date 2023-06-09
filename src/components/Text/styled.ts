import px2rem from '@/utils/px2rem';
import styled from 'styled-components';
/* eslint-disable @typescript-eslint/no-explicit-any */
const BaseText = styled.p<{ color: string | undefined; align: string; maxWidth: string | number }>`
  color: ${({ color, theme }) => (color ? (theme as any)[color] : theme.white)};
  text-align: ${({ align }) => align};
  max-width: ${({ maxWidth }) => maxWidth};

  // FONT-SIZE
  &.size-extra-small {
    font-size: ${px2rem(11)};
    line-height: 160%;
  }
  &.size-small {
    font-size: ${px2rem(12)};
    line-height: 160%;
  }
  &.size-regular {
    font-size: ${px2rem(14)};
    line-height: 160%;
  }
  &.size-medium {
    font-size: ${px2rem(16)};
    line-height: 160%;
  }
  &.size-large {
    font-size: ${px2rem(18)};
    line-height: 160%;
  }

  // FONT-WEIGHT
  &.weight-bold {
    font-weight: 700;
  }
  &.weight-semibold {
    font-weight: 600;
  }
  &.weight-medium {
    font-weight: 500;
  }
  &.weight-regular {
    font-weight: 400;
  }
  &.weight-light {
    font-weight: 300;
  }
`;

export { BaseText };
