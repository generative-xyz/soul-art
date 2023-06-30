import s from './style.module.scss';
import cs from 'classnames';
import Text from '@/animations/Text';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';

type ItemProps = {
  key: string;
  title: string;
  leftImg: string;
  leftContent: string | undefined;
  middleIcon: string;
  middleContent: string;
  rightImg: string;
  rightContent: string | undefined;
  arrowRevert: boolean;
  type: number | string;
};

const Item: React.FC<ItemProps> = ({
  title,
  leftImg,
  leftContent,
  middleIcon,
  middleContent,
  rightImg,
  rightContent,
  arrowRevert,
  type,
}) => {
  const ItemType1 = () => {
    return (
      <div className={s.itemType}>
        <div className={s.boxContent}>
          <IconSVG
            src={`${CDN_URL}/tech/upArrow.svg`}
            maxHeight={'66px'}
            maxWidth={'10px'}
            className={s.arrow}
          />
          <Text size={'16'} className={s.content}>
            A collector adopts and nurtures a Soul
          </Text>
        </div>
        <div className={s.boxContent}>
          <IconSVG
            src={`${CDN_URL}/tech/downArrow.svg`}
            maxHeight={'66px'}
            maxWidth={'10px'}
            className={`${s.arrow} }`}
          />
          <Text size={'16'} className={s.content}>
            A Soul leaves it’s collection
          </Text>
        </div>
      </div>
    );
  };
  const ItemType2 = () => {
    return (
      <div className={s.itemType}>
        <div className={s.boxContent}>
          <IconSVG
            src={`${CDN_URL}/tech/downArrow.svg`}
            maxHeight={'66px'}
            maxWidth={'10px'}
            className={`${s.arrow} }`}
          />
          <p className={s.content}>A collector pays the adoption fees in $GM</p>
        </div>
      </div>
    );
  };
  const Paragraph = () => {
    return (
      <div className={s.paragraph}>
        <Text size={'24'}>
          The Souls DAO serves as a decentralized governance mechanism, allowing
          collectors to make decisions and steer the direction of the Souls
          protocol. Through the DAO, collectors can propose and vote on
          important matters, including changes to the Soul orphanage rules,
          community initiatives, and resource allocation.
        </Text>
      </div>
    );
  };

  return (
    <div className={s.techItem}>
      <div className={s.wrapContent}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.techItem_box}>
          <div className={s.leftBox}>
            <img src={leftImg} alt="image" />
            <Text size={'16'} className={s.leftBox_title}>
              {leftContent}
            </Text>
          </div>

          <div className={s.middleBox}>
            <IconSVG
              src={`${CDN_URL}/tech/techArrow.svg`}
              maxHeight={'10px'}
              maxWidth={'66px'}
              className={cs(s.middleBox_arrow, arrowRevert ? s.left : '')}
            />
            <div className={s.middleBox_content}>
              <IconSVG src={middleIcon} maxHeight={'56px'} maxWidth={'56px'} />
              <Text size={'16'} className={s.content}>
                {middleContent}
              </Text>
            </div>
            <IconSVG
              src={`${CDN_URL}/tech/techArrow.svg`}
              maxHeight={'10px'}
              maxWidth={'66px'}
              className={cs(s.middleBox_arrow, arrowRevert ? s.left : '')}
            />
          </div>

          <div className={s.rightBox}>
            <img src={rightImg} alt="image" />
            <Text size={'16'} className={s.rightBox_title}>
              {rightContent}
            </Text>
          </div>
        </div>
      </div>
      {type === 1 ? <ItemType1 /> : ''}
      {type === 2 ? <ItemType2 /> : ''}
      {type === 'p' ? <Paragraph /> : ''}
    </div>
  );
};

export default Item;
