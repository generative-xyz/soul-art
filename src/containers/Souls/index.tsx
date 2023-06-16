import React, { useCallback, useEffect, useState } from 'react';
import soulsStyles from './souls.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ISoul } from '@/interfaces/api/soul';
import { Spinner } from 'react-bootstrap';
import { debounce, pick } from 'lodash';
import { ARTIFACT_CONTRACT } from '@/configs';
import SoulsCard from '@/components/SoulCards';
import { getSoulAttributes, getSoulsNfts } from '@/services/soul';
import AttributeSort from '../Attribute';
import { useRouter } from 'next/router';
import { IAttribute } from '@/interfaces/attributes';

const LIMIT_PAGE = 32;

export const SoulsContainer: React.FC = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [souls, setSouls] = useState<ISoul[]>([]);
  const [attributes, setAttributes] = useState<IAttribute[]>();
  const [isFetchSuccessAttributes, setIsSuccessAttributes] = useState(false);

  const fetchAttributes = async () => {
    try {
      const attributesData = await getSoulAttributes();
      setAttributes(attributesData);
      setIsSuccessAttributes(true);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const onLoadMoreSouls = () => {
    if (isFetching || souls.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(souls.length / LIMIT_PAGE) + 1;
    fetchSouls(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreSouls, 300);

  const fetchSouls = useCallback(
    async (page = 1, isFetchMore = false) => {
      try {
        setIsFetching(true);

        const query: {
          page: number;
          limit: number;
          owner?: string;
          isShowAll?: boolean;
          isBigFile?: boolean;
          sortBy?: string;
          sort?: number;
        } = {
          page,
          limit: LIMIT_PAGE,
          isShowAll: undefined,
          isBigFile: undefined,
          sortBy: undefined,
          sort: 1,
        };
        let attributesQuery;

        if (attributes) {
          attributesQuery = pick(router.query, [
            ...attributes?.map(att => att.traitName),
          ]);
        }

        const attributesFilter: string[] = [];

        if (attributesQuery) {
          for (const [trail, value] of Object.entries(attributesQuery)) {
            if (typeof value === 'string') {
              const AttributeValueArr = value.split(',');
              AttributeValueArr.map(trailValue => {
                attributesFilter.push(`${trail}:${trailValue}`);
              });
            }
          }
        }

        const data = await getSoulsNfts({
          attributes: attributesFilter.toString(),
          ...query,
        });

        if (isFetchMore) {
          setSouls(prev => [...prev, ...data]);
        } else {
          setSouls(data);
        }
      } catch (error) {
      } finally {
        setIsFetching(false);
      }
    },
    [router.query, attributes]
  );

  useEffect(() => {
    if (isFetchSuccessAttributes && attributes) {
      fetchSouls();
    }
  }, [isFetchSuccessAttributes, fetchSouls, attributes]);

  return (
    <InfiniteScroll
      className="list"
      dataLength={souls?.length || 0}
      hasMore={true}
      loader={
        isFetching && (
          <div className="loading">
            <Spinner />
          </div>
        )
      }
      next={debounceLoadMore}
    >
      <div className={soulsStyles.grid_container}>
        {souls &&
          souls.length > 0 &&
          souls.map(item => {
            return (
              <SoulsCard
                key={`token-${item.tokenId}`}
                href={`/${item.tokenId}`}
                image={item.image}
                contract={ARTIFACT_CONTRACT}
                tokenId={item.tokenId}
                title={`Souls Art #${item.tokenId}`}
                className={soulsStyles.grid_item}
              />
            );
          })}
      </div>
      <AttributeSort attributes={attributes || []} />
    </InfiniteScroll>
  );
};
