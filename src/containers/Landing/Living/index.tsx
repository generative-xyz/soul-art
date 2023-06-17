import s from './style.module.scss';
import TextAnimate from '@/components/TextAnimate';

const Living = () => {
    return (
        <div className={s.livingArtSection}>
            <div className={s.container}>
                <div className={s.wrapContent}>
                    <p className={s.sectionContent}>
                        {
                            `Souls react to the owner's GM balance and trading behavior. As the owner acquires more GM
                        tokens, the Soul grows in size. It also mimics the patterns of the owner's trading style,
                        whether it's a steady hand guiding the brushstrokes or a flurry of dynamic lines.`
                        }
                    </p>
                    <a href="" className={s.tag}>
                        <TextAnimate>
                            <span>Each Soul familiarizes itself to its owner</span>
                        </TextAnimate>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Living;
