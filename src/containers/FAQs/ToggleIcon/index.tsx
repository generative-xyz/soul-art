import React from 'react';
import { StyledToggleIcon } from './ToggleIcon.styled';

const ToggleIcon = ({ isCollapse = true }: { isCollapse: boolean }) => {
  return (
    <StyledToggleIcon
      className={`circle-plus ${isCollapse ? 'closed' : 'opened'}`}
    >
      <div className="circle">
        <div className="horizontal"></div>
        <div className="vertical"></div>
      </div>
    </StyledToggleIcon>
  );
};

export default ToggleIcon;
