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
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { IAttribute } from '@/interfaces/attributes';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import cs from 'classnames';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AccordionComponent from './Accordion';
import attributeStyles from './attribute.module.scss';
import useWindowResize from '@/hooks/useWindowResize';

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
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const [selectedOption, setSelectedOption] = useState<string | null>('Newest');
  const [filterYourSoul, setFilterYourSoul] = useState(false);
  const user = useSelector(getUserSelector);

  const isMobile = useWindowResize();
  const [isShowMobile, setIsShowMobile] = useState<boolean>(false);
  const router = useRouter();

  const isMobileCheck = useMemo((): boolean => {
    return isMobile.isMobile;
  }, [isMobile]);

  const [isEnabledAttributesFilter, setIsEnabledAttributesFilter] =
    useState(false);

  const [activeItem, setActiveItem] = useState<string | null>('Newest');

  const handleItemClick = (eventKey: string) => {
    setActiveItem(eventKey);
  };

  const isActive = (eventKey: string) =>
    activeItem === eventKey
      ? attributeStyles.attribute_mobileRarity_itemChecked
      : attributeStyles.attribute_mobileRarity_item;

  const handleSelect = (eventKey: string | null) => {
    setSelectedOption(eventKey);
    if (eventKey === '' || eventKey === 'Newest') {
      router.push(
        {
          query: {},
        },
        undefined,
        { shallow: true }
      );
    } else if (eventKey === 'Highest GM Balance') {
      router.push(
        {
          query: { sortBy: 'soul_balance_of', sort: -1 },
        },
        undefined,
        { shallow: true }
      );
    } else {
      router.push(
        {
          query: { sortBy: 'rarity', sort: eventKey === 'Top Rarity' ? -1 : 1 },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleOnSubmit = useCallback((submitVal: ISubmitValues) => {
    setIsEnabledAttributesFilter(!!submitVal.attributes.length);
  }, []);

  const handleGetAllTokens = () => {
    router.push(
      {
        query: {},
      },
      undefined,
      { shallow: true }
    );
  };

  const syncAttributesState = useMemo<boolean>(() => {
    return attributes.some(attr => router.query[attr.traitName]);
  }, [attributes, router]);

  const handleFilterOrphan = () => {
    router.push(
      {
        query: { is_orphan: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleShowFilter = (show: boolean) => {
    const soulList = document.getElementById('soul-list') as HTMLDivElement;
    const header = document.getElementById('header') as HTMLDivElement;
    const backdropFilter = document.getElementById(
      'backdropFilter'
    ) as HTMLDivElement;
    if (!soulList) return;
    if (show) {
      soulList.style.pointerEvents = 'none';

      setIsShowMobile(true);
    } else {
      soulList.style.pointerEvents = 'auto';
      setIsShowMobile(false);
    }

    if (isMobileCheck && show) {
      header.style.zIndex = '0';
      backdropFilter.style.display = 'block';
    } else {
      backdropFilter.style.display = 'none';
      header.style.zIndex = '7';
    }
  };

  useEffect(() => {
    if (router.query.is_orphan) {
      setFilterYourSoul(true);
    } else {
      setFilterYourSoul(false);
    }
  }, [router.query, isAuthenticated, router]);

  useEffect(() => {
    if (
      !isAuthenticated ||
      (isAuthenticated && user && router.query.owner !== user.walletAddress)
    ) {
      setFilterYourSoul(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { owner, ...rest } = router.query;
      router.push(
        {
          query: {
            ...rest,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    setIsEnabledAttributesFilter(syncAttributesState);
  }, [syncAttributesState]);

  return (
    <div className={attributeStyles.attribute_box}>
      <div className={attributeStyles.attribute_container}>
        <div
          className={`${attributeStyles.attribute_leftContainer} ${
            isMobileCheck && isShowMobile ? attributeStyles.isHide : ''
          }`}
        >
          <Button
            className={cs(
              attributeStyles.attribute_button,
              !filterYourSoul && attributeStyles.active
            )}
            onClick={handleGetAllTokens}
          >
            Gallery
          </Button>
          <Button
            className={cs(
              attributeStyles.attribute_button,
              filterYourSoul && attributeStyles.active
            )}
            onClick={handleFilterOrphan}
          >
            Orphanage
          </Button>
        </div>
        <div className={`${attributeStyles.attribute_rightContainer}`}>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              id="dropdown-basic"
              className={
                attributeStyles.attribute_rightContainer_dropdownToggle
              }
            >
              <div className={attributeStyles.attribute_top_rarity}>
                <p>Sort By:</p>
                &nbsp;
                {selectedOption ? selectedOption : 'Newest'}
                <div className={attributeStyles.attribute_chevronUp}>
                  <IconSVG
                    src={`${CDN_URL}/ic-dropdown.svg`}
                    maxWidth={'10'}
                    maxHeight={'10'}
                  />
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              className={attributeStyles.attribute_rarity_container}
            >
              <Dropdown.Item
                className={attributeStyles.attribute_rarity_option}
                eventKey="Newest"
              >
                Newest
              </Dropdown.Item>
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
              <Dropdown.Item
                className={attributeStyles.attribute_rarity_option}
                eventKey="Highest GM Balance"
              >
                Highest GM Balance
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={attributeStyles.attribute_divide} />
          <Dropdown drop="up" onToggle={show => handleShowFilter(show)}>
            <Dropdown.Toggle as={FilterToggle} id="dropdown-custom-components">
              <div className={`${attributeStyles.attribute_filter}`}>
                {isMobileCheck && isShowMobile ? (
                  <IconSVG
                    src={`${CDN_URL}/close.svg`}
                    maxWidth="20"
                    maxHeight="20"
                  />
                ) : (
                  <IconSVG
                    src={`${CDN_URL}/ic-filter.svg`}
                    maxWidth="15"
                    maxHeight="10"
                  />
                )}
                <p>{isMobileCheck && isShowMobile ? 'Close' : 'Attributes'}</p>
                <div
                  className={cs(
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
              className={`${attributeStyles.filterAttribute_container} small-scrollbar`}
            >
              <Dropdown
                className={attributeStyles.attribute_mobileRarity}
                onSelect={handleSelect}
              >
                <p className={attributeStyles.attribute_mobileRarity_header}>
                  Sort by
                </p>
                <Dropdown.Item
                  className={`${isActive('Newest')}`}
                  eventKey="Newest"
                  onClick={() => handleItemClick('Newest')}
                >
                  <span></span>
                  Newest
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${isActive('Top Rarity')}`}
                  eventKey="Top Rarity"
                  onClick={() => handleItemClick('Top Rarity')}
                >
                  <span></span>
                  Top Rarity
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${isActive('Bottom Rarity')}`}
                  eventKey="Bottom Rarity"
                  onClick={() => handleItemClick('Bottom Rarity')}
                >
                  <span></span>
                  Bottom Rarity
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${isActive(' Highest GM Balance')}`}
                  eventKey=" Highest GM Balance"
                  onClick={() => handleItemClick(' Highest GM Balance')}
                >
                  <span></span>
                  Highest GM Balance
                </Dropdown.Item>
              </Dropdown>
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
// box-shadow: 0px 0px 24px -6px rgba(0, 0, 0, 0.08);
export default memo(AttributeSort);
