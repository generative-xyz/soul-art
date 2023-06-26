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
import { CDN_URL, SOUL_CONTRACT } from '@/configs';
import { IAttribute } from '@/interfaces/attributes';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import classNames from 'classnames';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AccordionComponent from './Accordion';
import attributeStyles from './attribute.module.scss';
import cs from 'classnames';
import logger from '@/services/logger';
import { getCollectionNFTList } from '@/services/marketplace';

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

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [filterYourSoul, setFilterYourSoul] = useState(false);
  const [ownerHasSoul, setOwnerHasSoul] = useState(false);
  const user = useSelector(getUserSelector);

  const router = useRouter();

  const [isEnabledAttributesFilter, setIsEnabledAttributesFilter] =
    useState(false);

  const handleSelect = (eventKey: string | null) => {
    setSelectedOption(eventKey);
    router.push(
      {
        query: { sortBy: 'rarity', sort: eventKey === 'Top Rarity' ? -1 : 1 },
      },
      undefined,
      { shallow: true }
    );
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

  const getOwnerToken = useCallback(async () => {
    if (user && user.walletAddress) {
      try {
        const res = await getCollectionNFTList({
          contract_address: SOUL_CONTRACT,
          owner: user.walletAddress,
        });
        setOwnerHasSoul(res.totalItem > 0);
      } catch (err: unknown) {
        logger.error("failed to get owner's Soul");
      }
    }
  }, []);

  const syncAttributesState = useMemo<boolean>(() => {
    return attributes.some(attr => router.query[attr.traitName]);
  }, [attributes]);

  const isOwnerHasSoul = useMemo(() => {
    if (!isAuthenticated) return false;
    return ownerHasSoul;
  }, [ownerHasSoul, isAuthenticated]);

  const handleFilterMyToken = () => {
    if (user && user.walletAddress) {
      router.push(
        {
          query: { owner: user.walletAddress },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleShowFilter = (show: boolean) => {
    const soulList = document.getElementById('soul-list') as HTMLDivElement;
    if (!soulList) return;
    if (show) {
      soulList.style.pointerEvents = 'none';
    } else {
      soulList.style.pointerEvents = 'auto';
    }
  };

  useEffect(() => {
    getOwnerToken();
  }, []);

  useEffect(() => {
    if (router.query.owner) {
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
        {isOwnerHasSoul && (
          <div className={attributeStyles.attribute_leftContainer}>
            <Button
              className={cs(
                attributeStyles.attribute_button,
                !filterYourSoul && attributeStyles.active
              )}
              onClick={handleGetAllTokens}
            >
              All
            </Button>
            <Button
              className={cs(
                attributeStyles.attribute_button,
                filterYourSoul && attributeStyles.active
              )}
              onClick={handleFilterMyToken}
            >
              Your Soul
            </Button>

            {/* <Button className={attributeStyles.attribute_button}>Adopt</Button> */}
            {/* <Button className={attributeStyles.attribute_button}>
    Live auction
  </Button>
  <Button className={attributeStyles.attribute_button}>You own</Button> */}
          </div>
        )}
        <div className={attributeStyles.attribute_rightContainer}>
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
                {selectedOption ? selectedOption : 'Top Rarity'}
                <div className={attributeStyles.attribute_chevronUp}>
                  <IconSVG src={`${CDN_URL}/ic-dropdown.svg`} maxWidth={'10'} />
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
          </Dropdown>
          <div className={attributeStyles.attribute_divide} />
          <Dropdown drop="up" onToggle={show => handleShowFilter(show)}>
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
