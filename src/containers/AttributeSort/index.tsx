import { Accordion, Form } from 'react-bootstrap';
import { Button, Dropdown } from 'react-bootstrap';
import React, { HTMLAttributes, forwardRef } from 'react';

import IconSVG from '@/components/IconSVG';
import attributeStyles from './attribute.module.scss';

const FilterToggle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
    >
      {children}
    </div>
  ),
);
FilterToggle.displayName = 'FilterToggle';

const CDN_URL_IMG = 'https://storage.googleapis.com/generative-static-prod/soul-art';
const AttributeSort = () => {
  return (
    <div className={attributeStyles.attribute_box}>
      <div className={attributeStyles.attribute_container}>
        <div className={attributeStyles.attribute_leftContainer}>
          <Button className={attributeStyles.attribute_button}>Adopt</Button>
          <Button className={attributeStyles.attribute_button}>Live auction</Button>
          <Button className={attributeStyles.attribute_button}>You own</Button>
        </div>
        <div className={attributeStyles.attribute_rightContainer}>
          <div className={attributeStyles.attribute_top_rarity}>
            <p>Sort By: &nbsp;Top Rarity</p>
            <Button className={attributeStyles.attribute_chevronUp}>
              <IconSVG
                src={`${CDN_URL_IMG}/ic-dropdown.svg`}
                maxWidth="8"
                maxHeight="8"
              />
            </Button>
          </div>
          <div className={attributeStyles.attribute_divide}></div>
          <Dropdown>
            <Dropdown.Toggle as={FilterToggle} id="dropdown-custom-components">
              <div className={attributeStyles.attribute_filter}>
                <IconSVG
                  src={`${CDN_URL_IMG}/ic-filter.svg`}
                  maxWidth="15"
                  maxHeight="10"
                />
                <p> Attributes</p>
                <div className={attributeStyles.attribute_iconLive}>
                  <IconSVG
                    src={`${CDN_URL_IMG}/ellipse-live.svg`}
                    maxWidth="8"
                    maxHeight="8"
                  />
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className={attributeStyles.filterAttribute_container}>
              <p className={attributeStyles.filterAttribute_header}>Attributes</p>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className={attributeStyles.filterAttribute_title}>
                      Activation Function (1)
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={attributeStyles.filterAttribute_content}>
                      <div
                        className={
                          (attributeStyles.filterAttribute_content_item,
                          attributeStyles.filterAttribute_content_itemChecked)
                        }
                      >
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 1" checked />
                          <div>Slgmoid</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 2" />
                          <div>Slgmoid</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 3" />
                          <div>Slgmoid</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 4" />
                          <div>Slgmoid</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 5" />
                          <div>Slgmoid</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 6" />
                          <div>Slgmoid</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <div className={attributeStyles.filterAttribute_title}>
                      Birth Year
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={attributeStyles.filterAttribute_content}>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 1" />
                          <div>1934</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 2" />
                          <div>1940</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 3" />
                          <div>1970</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 4" />
                          <div>1983</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 5" />
                          <div>1990</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 6" />
                          <div>2000</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <div className={attributeStyles.filterAttribute_title}>
                      Color Palette (3)
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={attributeStyles.filterAttribute_content}>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 1" />
                          <div>Blue</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 2" />
                          <div>Red</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 3" />
                          <div>Green</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 4" />
                          <div>Pink</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 5" />
                          <div>Orange</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                      <div className={attributeStyles.filterAttribute_content_item}>
                        <span
                          className={
                            attributeStyles.filterAttribute_content_checkbox
                          }
                        >
                          <Form.Check aria-label="option 6" />
                          <div>Yellow</div>
                        </span>
                        <div
                          className={attributeStyles.filterAttribute_content_percent}
                        >
                          11&#37;
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AttributeSort;
