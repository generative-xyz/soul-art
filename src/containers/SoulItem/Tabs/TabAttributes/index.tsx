import { ITokenAttributes } from '@/interfaces/token';
import s from './style.module.scss';

const TabAttributes = ({ attributes }: { attributes: ITokenAttributes[] }) => {
  return (
    <>
      {attributes.map((attr, index) => (
        <div
          className={s.content_auction_tabAttr}
          key={`${attr.traitType}-${index}`}
        >
          <div>
            <p className={s.content_auction_tabAttrType}>
              {attr.traitType}
            </p>
            <p className={s.content_auction_tabAttrTypeName}>
              {attr.value}
            </p>
          </div>
          <div className={s.content_auction_tabAttrRare}>
            {(attr.percent * 100).toFixed(0)}&#37;
          </div>
        </div>
      ))}
    </>
  );
};

export default TabAttributes;
