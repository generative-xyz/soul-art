import React, { useState } from 'react';
import soulsStyles from './souls.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IInscription } from '@/interfaces/api/inscription';
import { Spinner } from 'react-bootstrap';
import { debounce } from 'lodash';
import { ARTIFACT_CONTRACT } from '@/configs';
import { getCollectionNfts } from '@/services/nft-explorer';
import SoulsCard from '@/components/SoulsCard';

const LIMIT_PAGE = 32;

export const SoulsContainer: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);

  const [inscriptions, setInscriptions] = useState<IInscription[]>([]);
  const [filter, _setFilter] = useState<number | null>(null);
  const [isSortLatest, _setIsSortLatest] = useState<boolean>(true);

  const onLoadMoreNfts = () => {
    if (isFetching || inscriptions.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(inscriptions.length / LIMIT_PAGE) + 1;
    fetchInscriptions(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreNfts, 300);

  const fetchInscriptions = async (page = 1, isFetchMore = false) => {
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

      const data = await getCollectionNfts({
        contractAddress: ARTIFACT_CONTRACT,
        ...query,
      });

      if (isFetchMore) {
        setInscriptions((prev) => [...prev, ...data]);
      } else {
        setInscriptions(data);
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <InfiniteScroll
      className="list"
      dataLength={inscriptions?.length || 0}
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
        {inscriptions &&
          inscriptions.length > 0 &&
          inscriptions.map((item) => {
            return (
              <SoulsCard
                key={`token-${item.tokenId}`}
                href={`/${item.tokenId}`}
                image={item.image}
                contract={ARTIFACT_CONTRACT}
                tokenId={item.tokenId}
                contentType={item.contentType}
                title1={`Smart Inscription #${item.tokenId}`}
                fileSize={item?.size}
                className={soulsStyles.grid_item}
              />
            );
          })}
      </div>
    </InfiniteScroll>
  );
};
