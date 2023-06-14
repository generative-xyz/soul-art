import React from 'react';
import sl from './style.module.scss';

const ClaimSlider = () => {
  return (
    <div className={sl.slider}>
      <div className={sl.slider_background}>
        <div className={sl.slider_background__imageleft}>
          <img
            src="https://dapp.trustless.computer/dapp/api/nft-explorer/collections/0x16efdc6d3f977e39dac0eb0e123feffed4320bc0/nfts/1200/content"
            alt="Image 3"
          />
        </div>
        <div className={sl.slider_background__imageright}>
          <img
            src="https://dapp.trustless.computer/dapp/api/nft-explorer/collections/0x16efdc6d3f977e39dac0eb0e123feffed4320bc0/nfts/1200/content"
            alt="Image 2"
          />
        </div>
      </div>
      <div className={sl.slider_foreground}>
        <img
          className={sl.slider_foreground__image}
          src="https://dapp.trustless.computer/dapp/api/nft-explorer/collections/0x16efdc6d3f977e39dac0eb0e123feffed4320bc0/nfts/1200/content"
          alt="Image 1"
        />
      </div>
    </div>
  );
};

export default ClaimSlider;
