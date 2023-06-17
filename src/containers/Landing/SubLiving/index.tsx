import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import {Container, Col} from 'react-bootstrap';

const SubLiving = () => {
    return (
        <div className={s.subLivingSection}>
            <Container className={s.container}>
                <Col lg={{span: 4, offset: 1}} className={s.column}>
                    <div className={s.wrapContent}>
                        <p className={s.sectionContent}>
                            {
                                `Souls are not static art but dynamic entities that reflect human behavior. They react to
                            market dynamics, mirroring feelings of fear, greed, and belief. The interconnected nature of
                            the Souls is fascinating, as one soul's changes can affect another soul within the
                            collective.`
                            }
                        </p>
                        <a href="" className={s.tag}>
                            <TextAnimate>
                                <span>Collective performance art that reflects human behavior</span>
                            </TextAnimate>
                        </a>
                    </div>
                </Col>
            </Container>
        </div>
    );
};

export default SubLiving;
