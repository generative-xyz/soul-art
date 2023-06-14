import React, { useEffect, useState } from 'react';
import soulsStyles from './souls.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ISoul } from '@/interfaces/api/soul';
import { Spinner } from 'react-bootstrap';
import { debounce } from 'lodash';
import { ARTIFACT_CONTRACT } from '@/configs';
import SoulsCard from '@/components/SoulCards';
import { getSoulsNfts } from '@/services/soul';

const LIMIT_PAGE = 32;

export const SoulsContainer: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);

  const [souls, setSouls] = useState<ISoul[]>([]);
  const [filter, _setFilter] = useState<number | null>(null);
  const [isSortLatest, _setIsSortLatest] = useState<boolean>(true);

  const onLoadMoreSouls = () => {
    if (isFetching || souls.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(souls.length / LIMIT_PAGE) + 1;
    fetchSouls(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreSouls, 300);

  useEffect(() => {
    fetchSouls();
  }, [filter, isSortLatest]);

  const fetchSouls = async (page = 1, isFetchMore = false) => {
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
        sort: isSortLatest ? -1 : 1,
      };

      switch (filter) {
        case 1:
          query.isShowAll = true;
          break;
        case 2:
          query.isShowAll = undefined;
          query.isBigFile = true;
          break;
        case 3:
          query.isShowAll = undefined;
          query.isBigFile = false;
          break;
        default:
          query.isShowAll = false;
          break;
      }

      const data = await getSoulsNfts({
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
  };

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
                title={`Smart Inscription #${item.tokenId}`}
                className={soulsStyles.grid_item}
              />
            );
          })}
      </div>
    </InfiniteScroll>
  );
};
