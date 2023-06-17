import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import {Container} from 'react-bootstrap';
import VideoBg from '../VideoBg';
import Text from '@/animations/Text';
import {AnimFade} from '@/animations/Fade';
import {CDN_URL} from "@/configs";

const Flare: React.FC = () => {
    return (
        <div className={s.main}>
            <VideoBg videoUrls={{mp4: `${CDN_URL}/block-2-min.mp4`}}>
                <div className={s.flareSection}>
                    <Container className={s.container}>
                        <div className={s.wrapSectionContent}>
                            <Text
                                animOption={{screen: 0, offset: 0, type: 'paragraph'}}
                                className={s.sectionContent}
                            >
                                {
                                    `But beware, for as with any tale, there were challenges along the way. When doubt and uncertainty clouded the hearts of the believers, the sun's radiance waned, casting shadows upon the artworks.`
                                }
                            </Text>

                            <AnimFade offset={0.2}>
                                <a href="" className={s.tag}>
                                    <TextAnimate>
                                        <span>Lorem ipsum dolor</span>
                                    </TextAnimate>
                                </a>
                            </AnimFade>
                        </div>
                    </Container>
                </div>
            </VideoBg>
        </div>
    );
};

export default Flare;
