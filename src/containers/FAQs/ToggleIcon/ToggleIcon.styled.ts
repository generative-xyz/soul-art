import styled from 'styled-components';

export const StyledToggleIcon = styled.div`
  &.closed {
    .vertical {
      transition: all 0.5s ease-in-out;
      transform: rotate(-90deg);
    }
    .horizontal {
      transition: all 0.5s ease-in-out;
      transform: rotate(-90deg);
      opacity: 1;
    }
  }

  &.opened {
    // opacity: 1;
    .vertical {
      transition: all 0.5s ease-in-out;
      transform: rotate(90deg);
    }
    .horizontal {
      transition: all 0.5s ease-in-out;
      transform: rotate(90deg);
      opacity: 0;
    }
  }
  .circle {
    --size: 14px;
    position: relative;
    width: var(--size);
    height: var(--size);
    display: block;
  }

  .horizontal {
    position: absolute;
    background-color: #fff;
    width: 100%;
    height: 2px;
    left: 0;
    top: calc(var(--size) / 2 - 1px);
    border-radius: 12px;
  }
  .vertical {
    position: absolute;
    background-color: #fff;
    width: 2px;
    height: 100%;
    top: 0;
    left: calc(var(--size) / 2 - 1px);
    border-radius: 12px;
  }
`;
