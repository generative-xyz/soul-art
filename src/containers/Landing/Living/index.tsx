import s from './style.module.scss';
import TextAnimate from '@/components/TextAnimate';

const Living = () => {
    return (
        <div className={s.livingArtSection}>
            <div className={s.container}>
                <div className={s.wrapContent}>

                    <p className={s.sectionContent}>
                        {
                            `Souls are not static art but dynamic entities that reflect human behavior. They react to market dynamics, mirroring feelings of fear, greed, and belief. The interconnected nature of the Souls is fascinating, as one soul's changes can affect another soul within the collective.`
                        }
                    </p>
                    <div className={s.tag}>
                        <TextAnimate>
                            <span>Collective performance art that reflects human behavior</span>
                        </TextAnimate>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Living;
