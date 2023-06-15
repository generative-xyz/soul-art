import React, { FC, ReactNode, useMemo } from 'react';

import accordionCheckboxStyles from './accordion-checkbox.module.scss';
import { useRouter } from 'next/router';

type AccordionCheckboxProps = {
  title: string;
  labelData?: ReactNode | string;
  traitName: string;
};
const AccordionCheckBox: FC<AccordionCheckboxProps> = ({
  traitName,
  title,
  labelData,
}) => {
  const router = useRouter();

  const isChecked = useMemo(() => {
    if (typeof router.query[traitName] !== 'string') return false;
    return router.query[traitName]?.includes(title);
  }, [router.query]);

  const handleCheckboxChange = () => {
    const routerAttributesVal = router.query[traitName];
    let attributesArray: string[] = [];
    if (typeof routerAttributesVal === 'string') {
      attributesArray = routerAttributesVal.split(',');
    }

    if (attributesArray?.includes(title)) {
      attributesArray = attributesArray.filter(
        attribute => attribute !== title
      );
    } else {
      attributesArray.push(title);
    }

    const queries = {
      ...router.query,
      [traitName]: attributesArray.toString(),
    };

    attributesArray = attributesArray.filter(attribute => attribute !== '');

    if (attributesArray.length == 0) {
      delete queries[traitName];
    }
    router.push(
      {
        query: queries,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div
      className={
        isChecked
          ? accordionCheckboxStyles.filterAttribute_content_itemChecked
          : accordionCheckboxStyles.filterAttribute_content_item
      }
    >
      <span
        className={accordionCheckboxStyles.filterAttribute_content_checkbox}
      >
        <div>
          <label className={accordionCheckboxStyles.container_checkbox}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span
              className={accordionCheckboxStyles.container_checkmark}
            ></span>
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
