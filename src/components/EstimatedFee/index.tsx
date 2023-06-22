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
            {estimateTCGas ? (
              <p className="est-fee-item-value">
                {`~ ${formatEthPrice(estimateTCGas)} TC`}
              </p>
            ) : (
              <EllipsisLoading />
            )}
          </div>
          <div className={`est-fee-item`}>
            <p className="est-fee-item-title">BTC network fee</p>
            {estimateBTCGas ? (
              <p className="est-fee-item-value">
                {`~ ${formatBTCPrice(estimateBTCGas)} BTC`}
              </p>
            ) : (
              <EllipsisLoading />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(EstimatedFee);
