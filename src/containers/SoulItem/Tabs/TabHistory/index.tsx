import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { getSoulHistories } from '@/services/soul';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import uniqBy from 'lodash/uniqBy';
import logger from '@/services/logger';
import Empty from '@/components/Empty';
import InfiniteLoading from '@/components/InfiniteLoading';
import Table from '@/components/Table';
import { CDN_URL } from '@/configs';

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
      setHistories([1])
      setHasMore(false);
    } catch (err: unknown) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  }

  const tableData = histories.map((_, index) => {
    return {
      id: index.toString(),
      render: {
        thumbnail: (
          <div className={s.thumbnailWrapper}>
            <img src={`${CDN_URL}/claimImg.jpg`} alt="thumbnail image" />
          </div>
        ),
        timeCapture: (
          <div className={s.timeCaptureWrapper}>
            <p className={s.captureDate}>2023-02-13</p>
            <p className={s.captureTime}>19:44:15 UTC</p>
          </div>
        ),
        owner: (
          <div className={s.ownerWrapper}>

          </div>
        )
      },
    }
  });

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
          tableHead={['', 'Time capture', 'Owner', 'Balance', 'Hold time', 'Event']}
          className={s.historyTableData}
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