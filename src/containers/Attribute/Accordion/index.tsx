import React, { ReactNode } from 'react';

import { Accordion } from 'react-bootstrap';
import AccordionCheckBox from '../AccordionCheckbox';
import { IAttribute } from '@/interfaces/attributes';
import accordionStyles from './accordion.module.scss';
import { useRouter } from 'next/router';

type AccordionContentProps = {
  eventKey: string;
  headerContent?: ReactNode | string;
  bodyContent?: ReactNode | string;
};

type AccordionComponentProps = {
  eventKey: string;
  headerContent?: ReactNode | string;
  bodyContent?: ReactNode | string;
  attributes: IAttribute[];
};

export const AccordionContent: React.FC<AccordionContentProps> = ({
  eventKey,
  headerContent,
  bodyContent,
}) => {
  return (
    <Accordion.Item
      eventKey={eventKey}
      className={accordionStyles.accordion_item}
    >
      <Accordion.Header
        className={accordionStyles.filterAttribute_accordionHeader}
      >
        <div
          className={accordionStyles.filterAttribute_title}
          id={eventKey === '0' ? 'panelsStayOpen-headingOne' : ''}
        >
          {headerContent}
        </div>
      </Accordion.Header>
      <Accordion.Body className={accordionStyles.accordion_body}>
        <div
          className={accordionStyles.filterAttribute_content}
          id={eventKey === '0' ? 'panelsStayOpen-headingOne' : ''}
        >
          {bodyContent}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const AccordionComponent: React.FC<AccordionComponentProps> = ({
  attributes,
}) => {
  const router = useRouter();

  return (
    <Accordion
      defaultActiveKey="0"
      alwaysOpen
      className={accordionStyles.accordion_container}
    >
      {attributes?.map(({ traitName, traitValuesStat }, index) => {
        const currentQuery = router.query[traitName] as string;

        const selectedValues = currentQuery?.split(',').length;

        return (
          <AccordionContent
            key={index}
            eventKey={String(index)}
            headerContent={`${traitName} ${
              selectedValues > 0 ? `(${selectedValues})` : ''
            }`}
            bodyContent={
              <>
                {traitValuesStat.map(({ value, rarity }, indexData) => {
                  return (
                    <React.Fragment key={indexData}>
                      <AccordionCheckBox
                        traitName={traitName}
                        key={index}
                        title={value}
                        labelData={Math.round(rarity)}
                      />
                    </React.Fragment>
                  );
                })}
              </>
            }
          />
        );
      })}
    </Accordion>
  );
};

export default AccordionComponent;
