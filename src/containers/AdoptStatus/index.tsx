import React, { useEffect, useMemo, useState } from 'react';
import withConnectedWallet from '@/hocs/withConnectedWallet';
import s from './styles.module.scss';
import Table from '@/components/Table';
import { IAuctionBid } from '@/interfaces/api/auction';
import { getBidderList } from '@/services/auction';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import uniqBy from 'lodash/uniqBy';
import { useSelector } from 'react-redux';
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AuctionStatus } from '@/enums/soul';
import cs from 'classnames';
import AuctionCountDown from './AuctionCountDown';
import { formatDateTime } from '@/utils/time';
import { formatEthPrice } from '@/utils/format';
import Button from '@/components/Button';
import InfiniteLoading from '@/components/InfiniteLoading';
import useGetBalanceOf from '@/hooks/contract-operations/soul/useGetBalanceOf';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import ModalBid from '../SoulItem/AuctionInfo/ModalBid';
import ModalError from '../SoulItem/AuctionInfo/ModalError';
import SettleAuctionButton from '../SoulItem/AuctionInfo/SettleAuctionButton';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';

const LIMIT_PAGE = 20;

const AdoptStatus: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const user = useSelector(getUserSelector);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [bidders, setBidders] = useState<Array<IAuctionBid>>([]);
  const [selectedBid, setSelectedBid] = useState<IAuctionBid | null>(null);
  const [showBidModal, setShowBidModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [hasSoul, setHasSoul] = useState(false);
  const { run: getBalanceOf } = useContractOperation({
    operation: useGetBalanceOf,
    inscribable: false,
  });

  const handleCloseBidModal = () => {
    setShowBidModal(false);
    setSelectedBid(null);
  };

  const handleShowBidModal = async (bid: IAuctionBid) => {
    try {
      const tokenBalanceBN = await getBalanceOf();
      if (tokenBalanceBN.isGreaterThan(0)) {
        setShowErrorModal(true);
        return;
      }
      setSelectedBid(bid);
      setShowBidModal(true);
    } catch (err: unknown) {
      logger.error(err);
      setSelectedBid(null);
      setShowBidModal(false);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const checkIsWinner = (bid: IAuctionBid): boolean => {
    return bid.ranking === 1;
  };

  const fetchBidders = async (p?: number) => {
    if (!user?.walletAddress) return;

    try {
      setLoading(true);

      const tokenBalanceBN = await getBalanceOf();
      if (tokenBalanceBN.isGreaterThan(0)) {
        setHasSoul(true);
      } else {
        setHasSoul(false);
      }

      const page = p || Math.floor(bidders.length / LIMIT_PAGE) + 1;
      const { items, total } = await getBidderList({
        page,
        limit: LIMIT_PAGE,
        owner: user.walletAddress?.toLowerCase(),
      });

      if (page === 1) {
        setBidders(items || []);
      } else {
        setBidders(prev => uniqBy([...prev, ...items], 'sender'));
      }

      if (bidders.length < total) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (err: unknown) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRarestTrait = (bid: IAuctionBid): string => {
    let rarestTrait = null;
    let smallestPercent = Number.MAX_VALUE;
    const data = bid.attributes;

    for (let i = 0; i < data.length; i++) {
      const trait = data[i];
      if (trait.percent < smallestPercent) {
        smallestPercent = trait.percent;
        rarestTrait = trait;
      }
    }

    return rarestTrait?.traitType || '-';
  };

  const renderStatus = (bid: IAuctionBid) => {
    if (!user || !bid) {
      return (
        <div className={cs(s.status, s.unknown)}>
          <span>-</span>
        </div>
      );
    }

    if (bid.auction?.status === AuctionStatus.INPROGRESS) {
      return <span className={cs(s.status, s.bidding)}>Bidding</span>;
    }
    if (checkIsWinner(bid)) {
      return <span className={cs(s.status, s.win)}>Win</span>;
    } else {
      return <span className={cs(s.status, s.lose)}>Lose</span>;
    }
  };

  const renderDateOrCountDown = (bid: IAuctionBid) => {
    if (bid?.auction?.status === AuctionStatus.INPROGRESS) {
      return <AuctionCountDown bid={bid} />;
    }
    return (
      <p className={s.dataText}>
        {formatDateTime({
          dateTime: bid.time,
          formatPattern: 'MMM D, YYYY [at] h:mma [UTC]',
        })}
      </p>
    );
  };

  const renderAction = (bid: IAuctionBid) => {
    const isWinner = checkIsWinner(bid);
    if (bid?.auction?.status === AuctionStatus.INPROGRESS) {
      return (
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="bottom"
          overlay={
            hasSoul ? (
              <Tooltip id="adopt-tooltip" className={s.action_tooltip}>
                <p>
                  You have already adopted a Soul and are unable to participate
                  in this bid.
                  <br />
                  You will receive a refund when it ends.
                </p>
              </Tooltip>
            ) : (
              <></>
            )
          }
        >
          <div className="w-fit">
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.stopPropagation();
                handleShowBidModal(bid);
              }}
              className={cs(s.actionBtn, hasSoul && s.disabled)}
              title={hasSoul ? 'Waiting...' : 'Bid up'}
            >
              {hasSoul ? 'Waiting...' : 'Bid up'}
            </Button>
          </div>
        </OverlayTrigger>
      );
    }
    if (bid?.auction?.status === AuctionStatus.ENDED) {
      const btnLabel = isWinner && !hasSoul ? 'Adopt' : 'Settle';
      return (
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="bottom"
          overlay={
            isWinner && !hasSoul ? (
              <Tooltip id="adopt-tooltip" className={s.action_tooltip}>
                <p>
                  Each wallet can only adopt one Soul at a time.
                  <br />
                  If you win multiple bids, you can only choose one Soul to
                  adopt, and the rest will be canceled with a refund.
                </p>
              </Tooltip>
            ) : (
              <></>
            )
          }
        >
          <div className="w-fit">
            <SettleAuctionButton
              className={s.actionBtn}
              title={btnLabel}
              tokenId={bid.tokenId}
            />
          </div>
        </OverlayTrigger>
      );
    }

    if (bid?.auction?.status === AuctionStatus.SETTLED) {
      const btnLabel =
        isWinner &&
        bid?.owner?.toLowerCase() === user?.walletAddress?.toLowerCase()
          ? 'Adopted soul'
          : 'Refunded';
      return (
        <Button className={s.actionBtn} disabled>
          {btnLabel}
        </Button>
      );
    }
  };

  const tableData = useMemo(() => {
    return bidders.map((bid, index) => {
      return {
        id: index.toString(),
        config: {
          onClick: () => {
            router.push(`${ROUTE_PATH.HOME}/${bid.tokenId}`);
          },
        },
        render: {
          item: (
            <div className={s.itemWrapper}>
              <img
                className={s.thumbnail}
                src={bid.imageCapture}
                alt={bid.tokenId}
              />
              <div className={s.tokenInfo}>
                <p className={s.tokenId}>{`Soul #${bid.tokenId}`}</p>
                <p className={s.traitName}>{`Trait: ${getRarestTrait(bid)}`}</p>
              </div>
            </div>
          ),
          ranking: (
            <div className={s.rankingWrapper}>
              <p className={s.dataText}>{bid.ranking}</p>
            </div>
          ),
          status: <div className={s.statusWrapper}>{renderStatus(bid)}</div>,
          date: (
            <div className={s.dateWrapper}>{renderDateOrCountDown(bid)}</div>
          ),
          amount: (
            <div className={s.amountWrapper}>
              <p className={s.dataText}>{`${formatEthPrice(bid.amount)} GM`}</p>
            </div>
          ),
          action: <div className={s.actionWrapper}>{renderAction(bid)}</div>,
        },
      };
    });
  }, [bidders]);

  useEffect(() => {
    fetchBidders(1);
  }, [user?.walletAddress]);

  return (
    <>
      <div className={s.adoptStatus}>
        <Container className={s.container}>
          <h1 className={s.sectionTitle}>Bidding History</h1>
          <div className={`small-scrollbar`}>
            <Table
              tableHead={[
                'Item',
                'Ranking',
                'Status',
                'Date',
                'Amount bid',
                'Action',
              ]}
              classWrapper={s.tableData}
              data={tableData}
            />
            {hasMore && (
              <InfiniteLoading
                fetchMoreData={fetchBidders}
                isLoading={loading}
                hasMoreData={hasMore}
              />
            )}
          </div>
        </Container>
      </div>
      <ModalBid
        show={showBidModal}
        handleClose={handleCloseBidModal}
        tokenId={selectedBid?.tokenId || ''}
        imageCapture={selectedBid?.imageCapture || ''}
      />
      <ModalError show={showErrorModal} handleClose={handleCloseErrorModal} />
    </>
  );
};

export default React.memo(withConnectedWallet(AdoptStatus));
