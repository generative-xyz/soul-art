import React, { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { getSoulHistories } from '@/services/soul';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import uniqBy from 'lodash/uniqBy';
import logger from '@/services/logger';
import Empty from '@/components/Empty';
import InfiniteLoading from '@/components/InfiniteLoading';
import Table from '@/components/Table';
import { CDN_URL } from '@/configs';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { shortenAddress } from '@/utils';

const LIMIT_PAGE = 20;

interface IProps {
  data: ITokenDetail;
}

const TabHistory: React.FC<IProps> = ({ data }: IProps): React.ReactElement => {
  const [histories, setHistories] = useState<Array<unknown>>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = async (p?: number) => {
    try {
      const page = p || Math.floor(histories.length / LIMIT_PAGE) + 1;
      const { items, total } = await getSoulHistories({
        page,
        limit: LIMIT_PAGE,
        tokenId: data.tokenId,
      });

      if (page === 1) {
        setHistories(items || []);
      } else {
        setHistories((prev) => uniqBy([...prev, ...items], 'id'));
      }

      if (histories.length < total) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (err: unknown) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  }

  const tableData = useMemo(() => {
    return histories.map((_, index) => {
      return {
        id: index.toString(),
        render: {
          thumbnail: (
            <div className={s.thumbnailWrapper}>
              <img className={s.thumbnailImg} src={`${CDN_URL}/claimImg.jpg`} alt="thumbnail image" />
            </div>
          ),
          timeCapture: (
            <div className={s.timeCaptureWrapper}>
              <p className={s.dataSubText}>2023-02-13</p>
              <p className={s.dataText}>19:44:15 UTC</p>
            </div>
          ),
          owner: (
            <div className={s.ownerWrapper}>
              <Jazzicon diameter={24} seed={jsNumberForAddress('0xbfcACA954aF46f0CBf1c6743518ff33d0062f2C9')} />
              <p className={s.ownerAddress}>{shortenAddress('0xbfcACA954aF46f0CBf1c6743518ff33d0062f2C9')}</p>
            </div>
          ),
          info: (
            <div className={s.balanceWrapper}>
              <p className={s.dataSubText}>123 blocks</p>
              <p className={s.dataText}>201 GM</p>
            </div>
          ),
          event: (
            <div className={s.holdTimeWrapper}>
              <p className={s.dataSubText}>Unlock</p>
              <p className={s.dataText}>8 Cloud layers</p>
            </div>
          ),
        },
      }
    });
  }, [histories]);

  useEffect(() => {
    fetchData(1);
  }, [data])

  return (
    <div className={s.tabHistory}>
      {histories.length === 0 && (
        <div className={s.emptyWrapper}>
          <Empty />
        </div>
      )}
      {histories.length > 0 && (
        <Table
          tableHead={['Image', 'Time capture', 'Owner', 'Info', 'Event']}
          classWrapper={s.historyTableData}
          data={tableData}
        />
      )}
      {hasMore &&
        <InfiniteLoading
          fetchMoreData={fetchData}
          isLoading={loading}
          hasMoreData={hasMore}
        />
      }
    </div>
  );
}

export default TabHistory;