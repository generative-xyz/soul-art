import React, { useContext, useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { getSoulHistories } from '@/services/soul';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import uniqBy from 'lodash/uniqBy';
import logger from '@/services/logger';
import Empty from '@/components/Empty';
import InfiniteLoading from '@/components/InfiniteLoading';
import Table from '@/components/Table';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { shortenAddress } from '@/utils';
import { ISoulHistoryItem } from '@/interfaces/api/soul';
import { formatDateTime } from '@/utils/time';
import { Feature } from '@/constants/feature';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { formatEthPrice } from '@/utils/format';
import ImageWrapper from '@/components/ImageWrapper';
import { TC_EXPLORER_URL } from '@/configs';
import { LightboxContext } from '@/contexts/Lightbox/lighbox-context';

const LIMIT_PAGE = 20;

interface IProps {
  data: ITokenDetail;
}

const TabHistories: React.FC<IProps> = ({ data }: IProps): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const { handleShow } = useContext(LightboxContext);
  const [histories, setHistories] = useState<Array<ISoulHistoryItem>>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = async (p?: number) => {
    try {
      setLoading(true);
      const page = p || Math.floor(histories.length / LIMIT_PAGE) + 1;
      const res = await getSoulHistories({
        page,
        limit: LIMIT_PAGE,
        tokenId: data.tokenId,
      });

      if (page === 1) {
        setHistories(res || []);
      } else {
        setHistories((prev) => uniqBy([...prev, ...res], 'txHash'));
      }

      if (res.length === LIMIT_PAGE) {
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

  const handleOpenLightbox = (e: React.MouseEvent<HTMLImageElement>, history: ISoulHistoryItem) => {
    e.stopPropagation();
    handleShow(history.imageCapture);
  }

  const tableData = useMemo(() => {
    return histories.map((item, index) => {
      const featureName = Feature[item.featureName as keyof typeof Feature];
      return {
        id: index.toString(),
        config: {
          onClick: () => {
            window.open(`${TC_EXPLORER_URL}/tx/${item.txHash}`, '_blank', 'noopener,noreferrer');
          }
        },
        render: {
          thumbnail: (
            <div className={s.thumbnailWrapper}>
              <ImageWrapper
                onClick={(e) => handleOpenLightbox(e, item)}
                className={s.thumbnailImg}
                src={item.imageCapture}
                alt="thumbnail image" />
            </div>
          ),
          timeCapture: (
            <div className={s.timeCaptureWrapper}>
              <p className={s.dataSubText}>
                {formatDateTime({
                  dateTime: item.time,
                  formatPattern: 'YYYY-MM-DD'
                })}
              </p>
              <p className={s.dataText}>
                {formatDateTime({
                  dateTime: item.time,
                  formatPattern: 'HH:mm:ss [UTC]'
                })}
              </p>
            </div>
          ),
          owner: (
            <div
              className={s.ownerWrapper}
              onClick={(e) => {
                e.stopPropagation()
                window.open(`${TC_EXPLORER_URL}/address/${item.owner}`, '_blank', 'noopener,noreferrer');
              }}
            >
              <Jazzicon diameter={24} seed={jsNumberForAddress(item.owner)} />
              <p className={s.ownerAddress}>{user?.walletAddress?.toLowerCase() === item?.owner?.toLowerCase() ? 'You' : shortenAddress(item.owner)}</p>
            </div >
          ),
          info: (
            <div className={s.balanceWrapper}>
              <p className={s.dataSubText}>{`${item.holdTime.toLocaleString('us-EN')} blocks`}</p>
              <p className={s.dataText}>{`${formatEthPrice(item.balance)} GM`}</p>
            </div>
          ),
          event: (
            <div className={s.holdTimeWrapper}>
              <p className={s.dataSubText}>Unlock</p>
              <p className={s.dataText}>{featureName || '-'}</p>
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
    <>
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
    </>
  );
}

export default TabHistories;