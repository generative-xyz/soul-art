import styled from 'styled-components';
import { AdditionalButtonProps } from '.';
/* eslint-disable @typescript-eslint/no-explicit-any */
export const StyledButton = styled.button<AdditionalButtonProps>`
  border-radius: ${({ borderRadius }) => borderRadius};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
