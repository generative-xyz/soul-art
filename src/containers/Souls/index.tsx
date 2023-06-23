import InfiniteLoading from '@/components/InfiniteLoading';
import SoulsCard from '@/components/SoulCards';
import Spinner from '@/components/Spinner';
import { CDN_URL, SOUL_CONTRACT } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import AttributeSort from '@/containers/Attribute';
import { IToken } from '@/interfaces/api/marketplace';
import { IAttribute } from '@/interfaces/attributes';
import logger from '@/services/logger';
import { getCollectionNFTList } from '@/services/marketplace';
import { getSoulAttributes } from '@/services/soul';
import { debounce, pick } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import soulsStyles from './souls.module.scss';

const LIMIT_PAGE = 32;

export const SoulsContainer: React.FC = () => {
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [souls, setSouls] = useState<IToken[]>([]);
  const [attributes, setAttributes] = useState<IAttribute[]>();
  const [isFetchSuccessAttributes, setIsSuccessAttributes] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

        const { sortBy, sort, owner } = pick(router.query, [
          'sortBy',
          'sort',
          'owner',
        ]) as {
          sortBy?: string;
          sort?: number;
          owner?: string;
        };

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
          owner: owner || undefined,
          sortBy: sortBy || undefined,
          sort: sort || undefined,
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
        const data = await getCollectionNFTList({
          contract_address: SOUL_CONTRACT,
          attributes: attributesFilter.toString(),
          ...query,
        });

        if (isFetchMore) {
          setSouls(prev => [...prev, ...data.items]);
          // setSouls([]);
        } else {
          setSouls(data.items);
          // setSouls([]);
        }

        if (data.items.length < LIMIT_PAGE) {
          setHasMore(false);
        }
      } catch (error) {
      } finally {
        setIsFetching(false);
        setInitialLoading(false);
      }
    },
    [router.query, attributes]
  );

  useEffect(() => {
    if (isFetchSuccessAttributes && attributes) {
      fetchSouls();
      logger.info('fetchSouls');
    }
  }, [isFetchSuccessAttributes, fetchSouls, attributes]);

  if (initialLoading) {
    return (
      <div className="grid-center h-full-view">
        <Spinner width={200} height={200} />
      </div>
    );
  }

  if (souls && souls.length === 0 && !router.query) {
    return (
      <div className={soulsStyles.emptyWrapper}>
        <div className={soulsStyles.empty}>
          <div className={soulsStyles.empty_thumbnailWrapper}>
            <img
              src={`${CDN_URL}/img-empty-thumbnail.png`}
              alt="empty thumbnail image"
            />
          </div>
          <p className={soulsStyles.empty_content}>
            Be the first one to adopt a Soul. Adopt a Soul here.
          </p>
          <Link href={ROUTE_PATH.CLAIM} className={soulsStyles.empty_adopt}>
            Adopt a Soul
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${soulsStyles.list} small-scrollbar`}>
        <div className={`${soulsStyles.art} small-scrollbar`} id="soul-list">
          <Container className={soulsStyles.grid_container}>
            {souls &&
              souls.length > 0 &&
              souls.map(item => {
                return (
                  <SoulsCard
                    key={`token-${item.tokenId}`}
                    href={`${ROUTE_PATH.HOME}/${item.tokenId}`}
                    image={!!item.imageCapture ? item.imageCapture : item.image}
                    tokenId={item.tokenId}
                    title={!!item.name ? item.name : `Souls #${item.tokenId}`}
                    ownerAddr={item.owner}
                    className={soulsStyles.grid_item}
                  />
                );
              })}
          </Container>
          <InfiniteLoading
            fetchMoreData={debounceLoadMore}
            isLoading={isFetching}
            hasMoreData={hasMore}
          />
        </div>
      </div>
      <AttributeSort attributes={attributes || []} />
    </>
  );
};
