import React, { ReactNode } from 'react';

import { Accordion } from 'react-bootstrap';
import AccordionCheckBox from '../AccordionCheckbox';
import accordionStyles from './accordion.module.scss';

const accordionData = [
  { headerContent: 'Activation Function (1)' },
  { headerContent: 'Birth Year' },
  { headerContent: 'Color Palette (3)' },
];

const accordionCheckboxData = [
  [
    {
      title: 'Slgmoid',
      labelData: '11',
    },
    {
      title: 'Slgmoid',
      labelData: '11',
    },
    {
      title: 'Slgmoid',
      labelData: '11',
    },
  ],
  [
    {
      title: '1934',
      labelData: '11',
    },
    {
      title: '1940',
      labelData: '11',
    },
    {
      title: '1970',
      labelData: '11',
    },
    {
      title: '1984',
      labelData: '11',
    },
  ],
  [
    {
      title: 'Red',
      labelData: '11',
    },
    {
      title: 'Green',
      labelData: '11',
    },
    {
      title: 'Blue',
      labelData: '11',
    },
    {
      title: 'Pink',
      labelData: '11',
    },
  ],
];

type AccordionContentProps = {
  eventKey: string;
  headerContent?: ReactNode | string;
  bodyContent?: ReactNode | string;
};

type AccordionComponentProps = {
  eventKey: string;
  headerContent?: ReactNode | string;
  bodyContent?: ReactNode | string;
};

const AccordionContent: React.FC<AccordionContentProps> = ({
  eventKey,
  headerContent,
}) => {
  return (
    <Accordion.Item eventKey={eventKey} className={accordionStyles.accordion_item}>
      <Accordion.Header className={accordionStyles.filterAttribute_accordionHeader}>
        <div className={accordionStyles.filterAttribute_title}>{headerContent}</div>
      </Accordion.Header>
      <Accordion.Body
        className={
          (accordionStyles.filterAttribute_accordionBody,
          accordionStyles.accordion_body)
        }
      >
        <div className={accordionStyles.filterAttribute_content}>
          {accordionCheckboxData.map((data, indexData) => {
            return (
              <React.Fragment key={indexData}>
                {eventKey === String(indexData) &&
                  data.map((checkboxData, index) => (
                    <AccordionCheckBox
                      key={index}
                      title={checkboxData.title}
                      labelData={checkboxData.labelData}
                    />
                  ))}
              </React.Fragment>
            );
          })}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const AccordionComponent: React.FC<AccordionComponentProps> = ({ bodyContent }) => {
  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      {accordionData.map(({ headerContent }, index) => (
        <AccordionContent
          key={index}
          eventKey={String(index)}
          headerContent={headerContent}
          bodyContent={bodyContent}
        />
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
