import React from 'react';
import Card from 'react-bootstrap/Card';
import cl from './style.module.scss';

interface ClaimedProps {
  status: string;
}

const Claimed: React.FC<ClaimedProps> = ({ status }) => {
  return (
    <div className={cl.container}>
      {status === 'waiting' ? null : (
        <div className={cl.claimed_noti}>
          <span className={cl.claimed_noti__status}>Claim success</span>
          <span className={cl.claimed_noti__icon}></span>
          <span className={cl.claimed_noti__time}>Jan 18, 2022 at 6:25pm</span>
        </div>
      )}
      <Card className={cl.cards}>
        <div className={cl.cards_art}>
          <img
            className={cl.cards_art_image}
            src="https://dapp.trustless.computer/dapp/api/nft-explorer/collections/0x16efdc6d3f977e39dac0eb0e123feffed4320bc0/nfts/1200/content"
            alt="image"
          />
        </div>
        <div className={cl.cards_info}>
          <Card.Title className={cl.cards_info__artName}>
            Soralis #123
          </Card.Title>
          {status === 'waiting' ? (
            <p className={cl.cards_info__status}>
              <span>
                <img
                  src="https://storage.googleapis.com/generative-static-prod/soul-art/prime_clock.svg"
                  alt="waiting"
                />
              </span>
              <span className={cl.cards_info__status_waiting}>Waiting</span>
            </p>
          ) : (
            <p className={cl.cards_info__status}>
              <span>
                <img
                  src="https://storage.googleapis.com/generative-static-prod/soul-art/check-contained.svg"
                  alt="success"
                />
              </span>
              <span className={cl.cards_info__status_success}>Received</span>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Claimed;
