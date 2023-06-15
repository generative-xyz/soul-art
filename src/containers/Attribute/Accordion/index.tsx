import React, { ReactNode } from 'react';

import { Accordion } from 'react-bootstrap';
import AccordionCheckBox from '../AccordionCheckbox';
import accordionStyles from './accordion.module.scss';
import { IAttribute } from '@/interfaces/attributes';

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
        <div className={accordionStyles.filterAttribute_title}>
          {headerContent}
        </div>
      </Accordion.Header>
      <Accordion.Body
        className={
          (accordionStyles.filterAttribute_accordionBody,
          accordionStyles.accordion_body)
        }
      >
        <div className={accordionStyles.filterAttribute_content}>
          {bodyContent}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const AccordionComponent: React.FC<AccordionComponentProps> = ({
  attributes,
}) => {
  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      {attributes?.map(({ traitName, traitValuesStat }, index) => (
        <AccordionContent
          key={index}
          eventKey={String(index)}
          headerContent={`${traitName}${
            traitValuesStat.length ? ` (${traitValuesStat.length})` : ''
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
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
