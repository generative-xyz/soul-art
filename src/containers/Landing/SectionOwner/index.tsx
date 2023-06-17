import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import {AnimateContext} from '@/contexts/Animate';
import {Frames} from '@Animations/Frames';
import {useRef, useContext} from 'react';
import {useFrameProcessing} from '@/hooks/useFrameProcessing';
import {Container} from 'react-bootstrap';
import {CDN_URL} from '@/configs';

const Owner: React.FC = () => {
    const {registerLoader, unRegisterLoader} = useContext(AnimateContext);

    const lPart1 = useRef<HTMLDivElement>(null);

    const part1Frame = useFrameProcessing(lPart1, {
        startIn: 10,
        endIn: 20,
        startOut: 129,
        endOut: 119,
    });

    const processing = (frame: number) => {
        part1Frame(frame);
    };
    return (
        <div className={s.main}>
            <Frames
                width={1920}
                height={1080}
                urlFrame={`${CDN_URL}/sould-frames/%d.jpg`}
                // webmFrame={`https://cdn.generative.xyz/pages/home/block-3-2/block-3-v2-%d.png.webp`}
                totalFrames={129}
                onProcessing={processing}
                start={registerLoader}
                end={unRegisterLoader}
            >
                <div ref={lPart1} className={s.ownerSection}>
                    <Container className={s.container}>
                        <div className={s.wrapContent}>
                            <p className={s.sectionContent}>
                                {
                                    `In the world of SOULS, ownership takes on a unique meaning. Souls cannot be sold or transferred—representing a deep personal connection to your beliefs. When a Soul feels a decline in your attention, it seeks a new connection with someone whose belief burns bright.`
                                }
                            </p>
                            <a href="" className={s.tag}>
                                <TextAnimate>
                                    <span>Lorem ipsum dolor</span>
                                </TextAnimate>
                            </a>
                        </div>
                    </Container>
                </div>
            </Frames>
        </div>
    );
};

export default Owner;
