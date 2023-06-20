import React, {
  HTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Dropdown } from 'react-bootstrap';

import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { IAttribute } from '@/interfaces/attributes';
import classNames from 'classnames';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import AccordionComponent from './Accordion';
import attributeStyles from './attribute.module.scss';

const FilterToggle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={e => {
        e.preventDefault();
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
    >
      {children}
    </div>
  )
);
FilterToggle.displayName = 'FilterToggle';

type AttributeSortProps = {
  attributes: IAttribute[];
};

export interface ISubmitValues {
  attributes: string[];
}

const AttributeSort: React.FC<AttributeSortProps> = ({ attributes }) => {
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  const [isEnabledAttributesFilter, setIsEnabledAttributesFilter] =
    useState(false);

  // const handleSelect = (eventKey: string | null) => {
  //   setSelectedOption(eventKey);
  // };

  const handleOnSubmit = useCallback((submitVal: ISubmitValues) => {
    setIsEnabledAttributesFilter(!!submitVal.attributes.length);
  }, []);

  const syncAttributesState = useMemo<boolean>(() => {
    return attributes.some(attr => router.query[attr.traitName]);
  }, [attributes]);

  useEffect(() => {
    setIsEnabledAttributesFilter(syncAttributesState);
  }, [syncAttributesState]);

  return (
    <div className={attributeStyles.attribute_box}>
      <div className={attributeStyles.attribute_container}>
        {/* <div className={attributeStyles.attribute_leftContainer}> */}
        {/* <Button className={attributeStyles.attribute_button}>Adopt</Button> */}
        {/* <Button className={attributeStyles.attribute_button}>
            Live auction
          </Button>
          <Button className={attributeStyles.attribute_button}>You own</Button> */}
        {/* </div> */}
        <div className={attributeStyles.attribute_rightContainer}>
          {/* <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              id="dropdown-basic"
              className={
                attributeStyles.attribute_rightContainer_dropdownToggle
              }
            >
              <div className={attributeStyles.attribute_top_rarity}>
                <p>Sort By:</p>
                &nbsp;
                {selectedOption ? selectedOption : 'Top Rarity'}
                <div className={attributeStyles.attribute_chevronUp}>
                  <IconSVG
                    src={`${CDN_URL}/ic-dropdown.svg`}
                    maxWidth={'8'}
                    maxHeight={'4'}
                  />
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              className={attributeStyles.attribute_rarity_container}
            >
              <Dropdown.Item
                className={attributeStyles.attribute_rarity_option}
                eventKey="Top Rarity"
              >
                Top Rarity
              </Dropdown.Item>
              <Dropdown.Item
                className={attributeStyles.attribute_rarity_option}
                eventKey="Bottom Rarity"
              >
                Bottom Rarity
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          {/* <div className={attributeStyles.attribute_divide} /> */}
          <Dropdown drop="up">
            <Dropdown.Toggle as={FilterToggle} id="dropdown-custom-components">
              <div className={attributeStyles.attribute_filter}>
                <IconSVG
                  src={`${CDN_URL}/ic-filter.svg`}
                  maxWidth="15"
                  maxHeight="10"
                />
                <p>Attributes</p>
                <div
                  className={classNames(
                    attributeStyles.attribute_iconLive,
                    isEnabledAttributesFilter &&
                      attributeStyles.attribute_iconLive_active
                  )}
                >
                  <div className={attributeStyles.dots_circle}></div>
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              className={attributeStyles.filterAttribute_container}
            >
              <p className={attributeStyles.filterAttribute_header}>
                Attributes
              </p>
              <div
                className={`${attributeStyles.filterAttribute_boxComponent} ${attributeStyles.filterAttribute_component} small-scrollbar`}
              >
                <Formik
                  initialValues={{
                    attributes: [],
                  }}
                  onSubmit={handleOnSubmit}
                >
                  <AccordionComponent eventKey="1" attributes={attributes} />
                </Formik>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default memo(AttributeSort);
