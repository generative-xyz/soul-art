import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import React from 'react';
import EllipsisLoading from '../EllipsisLoading';
import { Wrapper } from './EstimatedFee.styled';

interface IProps {
  estimateBTCGas: string | null;
  estimateTCGas: string | null;
  classNames?: string;
}

const EstimatedFee: React.FC<IProps> = ({
  estimateBTCGas,
  estimateTCGas,
  classNames,
}: IProps): React.ReactElement => {
  return (
    <Wrapper className={classNames}>
      <div className="est-fee">
        <div className="est-fee-options">
          <div className={`est-fee-item`}>
            <p className="est-fee-item-title">TC network fee</p>
            <p className="est-fee-item-value">
              {estimateTCGas ? (
                `~ ${formatEthPrice(estimateTCGas)} TC`
              ) : (
                <EllipsisLoading />
              )}
            </p>
          </div>
          <div className={`est-fee-item`}>
            <p className="est-fee-item-title">BTC network fee</p>
            <p className="est-fee-item-value">
              {estimateBTCGas ? (
                `~ ${formatBTCPrice(estimateBTCGas)} BTC`
              ) : (
                <EllipsisLoading />
              )}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(EstimatedFee);
