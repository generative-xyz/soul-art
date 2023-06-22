import s from './style.module.scss';

type InfoItemProps = {
  key: number;
  title: string;
  desc: string;
  tag: string;
  color: string;
};

const InfoItem: React.FC<InfoItemProps> = ({ title, desc, tag, color }) => {
  return (
    <div className={s.infoItem}>
      <div className={s.leftItem}>
        <p className={s.itemTitle}>{title}</p>
        <p className={`${s.itemDesc} ${color === 'green' ? s.green : ''}`}>
          {desc}
        </p>
      </div>
      <div className={s.rightItem}>
        <div className={s.tag}>
          <span>{tag}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoItem;
