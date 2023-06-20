import { ITokenAttributes } from '@/interfaces/token';
import TabsStyles from './style.module.scss';

const TabAttributes = ({ attributes }: { attributes: ITokenAttributes[] }) => {
  return (
    <>
      {attributes.map((attr, index) => (
        <div
          className={TabsStyles.content_auction_tabAttr}
          key={`${attr.traitType}-${index}`}
        >
          <div>
            <p className={TabsStyles.content_auction_tabAttrType}>
              {attr.traitType}
            </p>
            <p className={TabsStyles.content_auction_tabAttrTypeName}>
              {attr.value}
            </p>
          </div>
          <div className={TabsStyles.content_auction_tabAttrRare}>
            {(attr.percent * 100).toFixed(0)}&#37;
          </div>
        </div>
      ))}
    </>
  );
};

export default TabAttributes;
