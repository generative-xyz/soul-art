import InfiniteLoading from '@/components/InfiniteLoading';
import SoulCard from '@/components/SoulCard';
import Spinner from '@/components/Spinner';
import { CDN_URL, SOUL_CONTRACT } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import AttributeSort from '@/containers/Souls/Attribute';
import { IToken } from '@/interfaces/api/marketplace';
import { IAttribute } from '@/interfaces/attributes';
import { getCollectionNFTList } from '@/services/marketplace';
import { getSoulAttributes } from '@/services/soul';
import cs from 'classnames';
import { debounce, pick } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import s from './souls.module.scss';

const LIMIT_PAGE = 20;

export interface Props {
  isOrphanagePage?: boolean;
}

export const SoulsContainer: React.FC<Props> = ({}: Props) => {
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

        const { sortBy, is_orphan, sort, owner } = pick(router.query, [
          'sortBy',
          'is_orphan',
          'sort',
          'owner',
        ]) as {
          sortBy?: string;
          is_orphan?: number;
          sort?: number;
          owner?: string;
        };

        const query: {
          page: number;
          limit: number;
          owner?: string;
          sort_by?: string;
          sort?: number;
        } = {
          page,
          limit: LIMIT_PAGE,
          owner: owner || undefined,
          sort_by: sortBy || undefined,
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
              const AttributeValueArr = value.split('|');
              AttributeValueArr.map(trailValue => {
                attributesFilter.push(`${trail}:${trailValue}`);
              });
            }
          }
        }
        const data = await getCollectionNFTList({
          contract_address: SOUL_CONTRACT,
          attributes: attributesFilter.join('|'),
          is_orphan,
          ...query,
        });

        if (isFetchMore) {
          setSouls(prev => [...prev, ...data.items]);
          // setSouls(prev => uniqBy([...prev, ...data.items], 'tokenId'));

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
    }
  }, [isFetchSuccessAttributes, fetchSouls, attributes]);

  useEffect(() => {
    setHasMore(true);
    setSouls([]);
  }, [router.query]);

  if (initialLoading) {
    return (
      <div className={s.loadingWrapper}>
        <Spinner width={200} height={200} />
      </div>
    );
  }

  if (souls && souls.length === 0 && !isFetching) {
    if (!router.query.is_orphan) {
      return (
        <div className={s.emptyWrapper}>
          <div className={s.empty}>
            <div className={s.empty_thumbnailWrapper}>
              <img
                src={`${CDN_URL}/img-empty-thumbnail.png`}
                alt="empty thumbnail image"
              />
            </div>
            <p className={s.empty_content}>Be the first one to adopt a Soul.</p>
            <Link href={ROUTE_PATH.CLAIM} className={s.empty_adopt}>
              Adopt a Soul
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className={cs(s.emptyWrapper, s.orphanageEmpty)}>
        <div className={s.empty}>
          <h5>Souls Orphanage</h5>
          <div className={s.empty_thumbnailWrapper}>
            <img
              src={`${CDN_URL}/orphan-empty-thumbnail%20(1).png`}
              alt="empty thumbnail image"
            />
          </div>
          <p className={s.empty_content}>
            The Soul orphanage is where users can browse available Souls, submit
            adoption proposals, and view their adopted Souls.
          </p>
          <div className={s.cta_btns}>
            <Link href={ROUTE_PATH.STORY} className={s.empty_adopt}>
              View Story
            </Link>
            <Link
              href={ROUTE_PATH.GALLERY}
              className={cs(s.empty_adopt, s.empty_gallery)}
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${s.list} small-scrollbar`}>
        <div className={s.mobileFilter_backdrop} id={'backdropFilter'}></div>
        <div className={`${s.art} small-scrollbar`} id="soul-list">
          <Container className={s.grid_container}>
            {souls &&
              souls.length > 0 &&
              souls.map(item => {
                return (
                  <SoulCard
                    key={`token-${item.tokenId}`}
                    href={`${ROUTE_PATH.HOME}/${item.tokenId}`}
                    image={!!item.imageCapture ? item.imageCapture : item.image}
                    tokenId={item.tokenId}
                    title={!!item.name ? item.name : `Soul #${item.tokenId}`}
                    ownerAddr={item.owner}
                    className={s.grid_item}
                    auctionStatus={item.auctionStatus}
                    endBlock={item.endBlock}
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
