import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import ToggleIcon from '../ToggleIcon';
import s from '../FAQs.module.scss';
import cs from 'classnames';

type Props = {
  content: {
    title: string;
    desc: string;
  };
  index: number;
};

const FaqItem = ({ content, index }: Props) => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <Accordion.Item eventKey={`${index}`} className={s.item}>
      <Accordion.Header
        className={s.item_header}
        onClick={() => setIsCollapse(!isCollapse)}
      >
        <div className={cs(s.item_title, isCollapse && s.item_title_border)}>
          <p>{content.title}</p>
          <ToggleIcon isCollapse={isCollapse} />
        </div>
      </Accordion.Header>
      <Accordion.Body className={s.item_body}>{content.desc}</Accordion.Body>
    </Accordion.Item>
  );
};

export default FaqItem;
