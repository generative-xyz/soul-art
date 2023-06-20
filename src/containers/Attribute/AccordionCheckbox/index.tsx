import React, { FC, ReactNode, useMemo } from 'react';

import accordionCheckboxStyles from './accordion-checkbox.module.scss';
import { useRouter } from 'next/router';
import { Field, useFormikContext } from 'formik';
import { ISubmitValues } from '..';

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

  const { submitForm, values } = useFormikContext<ISubmitValues>();

  const { setFieldValue } = useFormikContext();

  const isChecked = useMemo(() => {
    if (typeof router.query[traitName] !== 'string') return false;
    return router.query[traitName]?.includes(title);
  }, [router.query, title, traitName]);

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

      setFieldValue(
        'attributes',
        values?.attributes?.filter(attr => attr !== `${traitName}-${title}`)
      );
    } else {
      attributesArray.push(title);
      setFieldValue('attributes', [
        ...values?.attributes,
        `${traitName}-${title}`,
      ]);
    }

    const queries = {
      ...router.query,
      [traitName]: attributesArray.toString(),
    };

    attributesArray = attributesArray.filter(attribute => attribute !== '');

    if (attributesArray.length == 0) {
      delete queries[traitName];
    }

    submitForm();
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
      onClick={handleCheckboxChange}
    >
      <span
        className={accordionCheckboxStyles.filterAttribute_content_checkbox}
      >
        <div>
          <label className={accordionCheckboxStyles.container_checkbox}>
            <Field type="checkbox" checked={isChecked} />
            <span
              className={accordionCheckboxStyles.container_checkmark}
            ></span>
          </label>
        </div>
        <div>{title}</div>
      </span>
      <div className={accordionCheckboxStyles.filterAttribute_content_percent}>
        {labelData}&#37;
      </div>
    </div>
  );
};

export default AccordionCheckBox;
