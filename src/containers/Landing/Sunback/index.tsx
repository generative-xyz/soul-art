import Button from '@/components/Button';
import s from './style.module.scss';
import cs from 'classnames';

const Sunback = () => {
  return (
    <div className={s.sunbackSection}>
      <div className={s.wrapContent}>
        <h1 className={s.sectionTitle}>Lorem ipsum dolo sit amet consectetur.</h1>
        <p className={s.sectionContent}>
          Welcome to New Bitcoin City, where the sun&apos;s enchantment and the
          belief in GM tokens guide us toward a future brighter than we can ever
          imagine.
        </p>

        <div className={s.buttons}>
          <Button className={cs(s.button, s.init)}>Explore art</Button>
          <Button className={cs(s.button, s.trans)}>Claim Souls</Button>
        </div>
      </div>
    </div>
  );
};

export default Sunback;
