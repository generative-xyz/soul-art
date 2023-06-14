import React, { FC, ReactNode, useState } from 'react';

import accordionCheckboxStyles from './accordion-checkbox.module.scss';

type AccordionCheckboxProps = {
  title?: ReactNode | string;
  labelData?: ReactNode | string;
};
const AccordionCheckBox: FC<AccordionCheckboxProps> = ({ title, labelData }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div
      className={
        isChecked
          ? accordionCheckboxStyles.filterAttribute_content_itemChecked
          : accordionCheckboxStyles.filterAttribute_content_item
      }
    >
      <span className={accordionCheckboxStyles.filterAttribute_content_checkbox}>
        <div>
          <label className={accordionCheckboxStyles.container_checkbox}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className={accordionCheckboxStyles.container_checkmark}></span>
          </label>
        </div>
        <div>{title}</div>
      </span>
      <div className={accordionCheckboxStyles.filterAttribute_content_percent}>
        {labelData}
      </div>
    </div>
  );
};

export default AccordionCheckBox;
