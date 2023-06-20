import { ITokenDetail } from '@/interfaces/api/marketplace';
import TabAttributes from '../AuctionInfo/Tabs/TabAttributes';
import s from './style.module.scss';

const Info = ({ data }: { data: ITokenDetail }) => {
  // const array = [
  //   {
  //     id: 1,
  //     title: 'Owner’s Buy / Sell rate',
  //     desc: '0.4',
  //     tag: 'Art’s texture',
  //     color: 'init',
  //   },
  //   {
  //     id: 2,
  //     title: 'Owner’s GM Balance ',
  //     desc: '10',
  //     tag: 'Sun’s size',
  //     color: 'init',
  //   },
  //   {
  //     id: 3,
  //     title: 'Market’s Buy / Sell rate',
  //     desc: '0.65',
  //     tag: 'Nature’s phenomenons',
  //     color: 'init',
  //   },
  //   {
  //     id: 4,
  //     title: 'Price change within latest 100 blocks',
  //     desc: '+ 40%',
  //     tag: 'Sun’s y-postion',
  //     color: 'green',
  //   },
  // ];

  if (!data?.attributes || data.attributes.length === 0) return <> </>;

  return (
    <div className={s.detailInfo}>
      <h5 className={s['detaiInfo-title']}>Attributes</h5>
      <div className={s.infomation}>
        {/* {array.map(item => (
          <InfoItem
            key={item.id}
            title={item.title}
            desc={item.desc}
            tag={item.tag}
            color={item.color}
          />
        ))} */}
        <TabAttributes attributes={data.attributes} />
      </div>
    </div>
  );
};

export default Info;
