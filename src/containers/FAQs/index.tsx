import { Accordion } from 'react-bootstrap';
import s from './FAQs.module.scss';
import FaqItem from './Item';

const FAQ_CONTENT = [
  {
    title: 'Who is eligible to adopt Souls?',
    desc: 'Souls can only be adopted by New Bitcoiners who contributed at least 1 $GM at the end of the GM crowdfunding event.',
  },
  {
    title: 'How many Souls are there?',
    desc: '1,247 Souls.',
  },
  {
    title: 'Can Souls be transferred and traded?',
    desc: 'No. Souls are soulbound artworks. They are not transferable and tradable.',
  },
  {
    title: "What if I've already sold my $GM after the event?",
    desc: 'You can still adopt a Soul. However, if you do not increase your $GM balance to at least 1 $GM, your Soul will leave you after 7 days.',
  },
  {
    title: 'What will happen if my $GM balance falls below one?',
    desc: "You'll have 7 days to get your $GM balance up to at least 1 $GM. Otherwise, your Soul will leave you and join the Souls Orphanage where it can be adopted by other collectors.",
  },
  {
    title: 'What is the procedure for adoption?',
    desc: 'To adopt a Soul, you can participate in a bidding adoption process.  Bidders place their adoption bids, competing with others who also seek to provide a loving home for the same Soul.  The bidding process ensures a fair and transparent allocation of Souls, with the highest bidder adopting the Soul.  90% of the proceeds from the winning bids go to the Souls DAO, reinforcing the financial sustainability and growth of the ecosystem.  The remaining 10% of the winning bids go to the Souls core team as artist royalties.',
  },
  {
    title: 'How long does the adoption process take?',
    desc: '7 days.',
  },
];

const FAQs = () => {
  return (
    <div className={s.wrapper}>
      <h2>FAQs</h2>
      <div className={s.faq_content}>
        <Accordion
          //   defaultActiveKey={['']}
          alwaysOpen
          className={s.faq_content_wrapper}
        >
          {FAQ_CONTENT.map((item, index) => (
            <FaqItem content={item} key={index} index={index} />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
