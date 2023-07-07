import { ITokenAttributes } from '@/interfaces/token';
import { useEffect, useState } from 'react';
import s from './style.module.scss';

const TabAttributes = ({ attributes }: { attributes: ITokenAttributes[] }) => {
  const [blockHeight, setBlockHeight] = useState(0);

  useEffect(() => {
    const mainSection = document.getElementById('soul-detail-main-section');
    // get height of main section
    if (mainSection) {
      setBlockHeight(mainSection.offsetHeight - 100);
    }
  }, []);

  return (
    <div
      className={`${s.wrapper} small-scrollbar`}
      style={{
        height: `${blockHeight}px`,
      }}
    >
      {attributes.map((attr, index) => (
        <div
          className={s.content_auction_tabAttr}
          key={`${attr.traitType}-${index}`}
        >
          <div>
            <p className={s.content_auction_tabAttrType}>{attr.traitType}</p>
            <p className={s.content_auction_tabAttrTypeName}>{attr.value}</p>
          </div>
          <div className={s.content_auction_tabAttrRare}>
            {(attr.percent * 100).toFixed(0)}&#37;
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabAttributes;
