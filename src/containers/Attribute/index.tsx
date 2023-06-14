import {Button, Dropdown} from 'react-bootstrap';
import React, {HTMLAttributes, forwardRef, useState} from 'react';

import AccordionComponent from './Accordion';
import IconSVG from '@/components/IconSVG';
import attributeStyles from './attribute.module.scss';

const FilterToggle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({children, onClick}, ref) => (
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
const AttributeSort: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (eventKey: string | null) => {
        setSelectedOption(eventKey);
    };

    return (
        <div className={attributeStyles.attribute_box}>
            <div className={attributeStyles.attribute_container}>
                <div className={attributeStyles.attribute_leftContainer}>
                    <Button className={attributeStyles.attribute_button}>Adopt</Button>
                    <Button className={attributeStyles.attribute_button}>Live auction</Button>
                    <Button className={attributeStyles.attribute_button}>You own</Button>
                </div>
                <div className={attributeStyles.attribute_rightContainer}>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            className={attributeStyles.attribute_rightContainer_dropdownToggle}
                        >
                            <div className={attributeStyles.attribute_top_rarity}>
                                <p>Sort By:</p>
                                &nbsp;
                                {selectedOption ? selectedOption : 'Top Rarity'}
                                <Button className={attributeStyles.attribute_chevronUp}>
                                    <IconSVG
                                        src={`${CDN_URL_IMG}/ic-dropdown.svg`}
                                        maxWidth="8"
                                        maxHeight="8"
                                    />
                                </Button>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={attributeStyles.attribute_rarity_container}>
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
                    </Dropdown>
                    <div className={attributeStyles.attribute_divide} />
                    <Dropdown>
                        <Dropdown.Toggle as={FilterToggle} id="dropdown-custom-components">
                            <div className={attributeStyles.attribute_filter}>
                                <IconSVG
                                    src={`${CDN_URL_IMG}/ic-filter.svg`}
                                    maxWidth="15"
                                    maxHeight="10"
                                />
                                <p>Attributes</p>
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
                            <AccordionComponent eventKey="1"/>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default AttributeSort;
