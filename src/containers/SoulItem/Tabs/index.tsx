import { Tab, Tabs } from 'react-bootstrap';

import IconSVG from '@/components/IconSVG';
import { ROUTE_PATH } from '@/constants/route-path';
import Link from 'next/link';
import TabsStyles from './style.module.scss';
import TabFeatures from './TabFeatures';
import { IToken } from '@/interfaces/api/marketplace';

const auctionTabHeader = [
  // {
  //   title: 'Live auction',
  //   type: 'live',
  // },
  {
    title: 'Description',
    type: 'desc',
  },
  // {
  //   title: 'Attributes',
  //   type: 'attr',
  // },
  {
    title: 'Interactions',
    type: 'inter',
  },
  {
    title: 'Features',
    type: 'feat',
  },
];

// const liveAuctionData = [
//   {
//     userImg: 'img-user.svg',
//     userAddress: '012831236821763812638',
//   },
//   {
//     userImg: 'img-user.svg',
//     userAddress: '012831236821763812638',
//   },
//   {
//     userImg: 'img-user.svg',
//     userAddress: '012831236821763812638',
//   },
//   {
//     userImg: 'img-user.svg',
//     userAddress: '012831236821763812638',
//   },
//   {
//     userImg: 'img-user.svg',
//     userAddress: '012831236821763812638',
//   },
//   {
//     userImg: 'img-user.svg',
//     userAddress: '012831236821763812638',
//   },
//   {
//     userImg: 'img-user.svg',
//     userAddress: '012831236821763812638',
//   },
//   {
//     userImg: 'img-user.svg',
//     userAddress: '012831236821763812638',
//   },
// ];

// const attributeData = [
//   {
//     type: 'activation function',
//     typeName: 'ReLU',
//     rare: '51',
//   },
//   {
//     type: 'birth year',
//     typeName: 'ReLU',
//     rare: '5',
//   },
//   {
//     type: 'color palette',
//     typeName: 'ReLU',
//     rare: '70',
//   },
//   {
//     type: 'dataset',
//     typeName: 'ReLU',
//     rare: '59',
//   },
//   {
//     type: 'deep learning framework',
//     typeName: 'ReLU',
//     rare: '11',
//   },
//   {
//     type: 'hardware acceleration',
//     typeName: 'ReLU',
//     rare: '37',
//   },
//   {
//     type: 'birth year',
//     typeName: 'ReLU',
//     rare: '11',
//   },
// ];

const interactionData = [
  {
    keyText: 'i',
    keyDesc: 'Show/hide technical information.',
  },
  {
    keyText: 'u',
    keyDesc: 'Update the AI mode',
  },
  {
    keyText: 'b',
    keyDesc: 'Hide/show borders',
  },
  {
    keyText: 'k',
    keyDesc: 'Save the hi-res image of the Soul to your computer',
  },
  {
    keyText: 's',
    keyDesc: 'Save the screenshot of the Soul to your computer',
  },
];
// const  TabLiveAuction = () => {
//   return (
//     <>
//       {liveAuctionData.map((liveAucData, index) => (
//         <div className={TabsStyles.content_auction_tabLive} key={index}>
//           <div className={TabsStyles.content_auction_tabLiveLeft}>
//             <div className={TabsStyles.content_auction_tabLiveLeftIcon}>
//               <IconSVG
//                 src={`${CDN_URL}/${liveAucData.userImg}`}
//                 maxWidth={'58'}
//                 maxHeight={'58'}
//               ></IconSVG>
//             </div>
//             <div className={TabsStyles.content_auction_tabLiveLeftAddress}>
//               {formatLongAddress(`${liveAucData.userAddress}`)}
//             </div>
//           </div>
//           <div className={TabsStyles.content_auction_tabLiveRight}>
//             <p className={TabsStyles.content_auction_tabLiveRightPrice}>
//               1.5 BTC
//             </p>
//             <p className={TabsStyles.content_auction_tabLiveRightTime}>
//               Jan 18, 2022 at 6:25pm
//             </p>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

const TabDescription = () => {
  return (
    <div className={TabsStyles.content_auction_tabDesc}>
      <div className={TabsStyles.content_auction_tabDescHead}>
        <div>
          <IconSVG
            src={`${CDN_URL}/ic-sun.svg`}
            maxWidth={'40'}
            className={TabsStyles.content_auction_tabDescHeadIcon}
          ></IconSVG>
        </div>
        <p>Learn more about Soul</p>
        <Link
          href={ROUTE_PATH.ART}
          className={TabsStyles.content_auction_tabDescHeadButton}
        >
          Explore
          <IconSVG
            src={`${CDN_URL}/bannerArrow.svg`}
            maxWidth={'10.67'}
            maxHeight={'8'}
          ></IconSVG>
        </Link>
      </div>
      <div className={TabsStyles.content_auction_tabDescText}>
        Souls is an open-source project and protocol that portrays the future of
        Bitcoin as vastly more helpful than just a currency. The Souls art
        protocol is a system of interconnected living artworks, trustlessly
        choreographed by unstoppable smart contracts, financially managed by a
        collector-run DAO, and powered by a native cryptocurrency.
        <br />
        <br />
        Unlike any artwork before it, Souls artworks are soulbound and therefore
        non-transferable. You cannot buy and sell a soul. Also, unlike any
        artwork before it, Souls artworks are living organisms; they leave their
        collectors and join the Souls orphanage if their collectors stop taking
        care of them. The only way to collect a soul is to adopt an abandoned
        one from the orphanage.
        <br />
        <br />
        Visually, at the microlevel, each soul is a dynamic artwork that
        personalises itself based on the collector’s belief in the future of
        Bitcoin over time. And at the macro level, all Souls artworks
        collectively embody our behaviours in crypto, such as fear (FUD), greed
        (FOMO), and belief (HODL), creating a collective performance art
        experience.
      </div>
    </div>
  );
};

// const  TabAttribute = () => {
//   return (
//     <>
//       {attributeData.map((attrData, index) => (
//         <div className={TabsStyles.content_auction_tabAttr} key={index}>
//           <div>
//             <p className={TabsStyles.content_auction_tabAttrType}>
//               {attrData.type}
//             </p>
//             <p className={TabsStyles.content_auction_tabAttrTypeName}>
//               {attrData.typeName}
//             </p>
//           </div>
//           <div className={TabsStyles.content_auction_tabAttrRare}>
//             {attrData.rare}&#37;
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

const TabInteraction = () => {
  return (
    <>
      {interactionData.map((interData, index) => (
        <div className={TabsStyles.content_auction_tabInter} key={index}>
          <div className={TabsStyles.content_auction_tabInterKeyText}>
            {interData.keyText}
          </div>
          <div className={TabsStyles.content_auction_tabInterKeyDesc}>
            {interData.keyDesc}
          </div>
        </div>
      ))}
    </>
  );
};

const CDN_URL =
  'https://storage.googleapis.com/generative-static-prod/soul-art';

const TabsComponent = ({ data }: { data: IToken }) => {
  return (
    <Tabs defaultActiveKey="0" className={TabsStyles.content_auction_tabs}>
      {auctionTabHeader.map((auctionHeader, index) => {
        return (
          <Tab
            eventKey={index}
            key={index}
            title={auctionHeader.title}
            className={`${TabsStyles.content_auction_tab}`}
          >
            <div
              className={`${TabsStyles.content_auction_tabBox} small-scrollbar`}
            >
              {/* {auctionHeader.type === 'live' && < TabLiveAuction />} */}
              {auctionHeader.type === 'desc' && <TabDescription />}
              {/* {auctionHeader.type === 'attr' && < TabAttribute />} */}
              {auctionHeader.type === 'inter' && <TabInteraction />}
              {auctionHeader.type === 'feat' && (
                <TabFeatures owner={data.owner} />
              )}
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default TabsComponent;
