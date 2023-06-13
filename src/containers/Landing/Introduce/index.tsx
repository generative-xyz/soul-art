import Button from '@/components/Button';
import Text from '@Animations/Text';
import s from './style.module.scss';
import cs from 'classnames';
import {AnimFade} from "@Animations/Fade";

const Introduce: React.FC = () => {
    return (
        <div className={s.introduce}>
            <div className={s['introduce-box']}>
                <Text animOption={{screen: 0, offset: 0, type: 'heading'}} className={s['introduce-box_title']}>Lorem
                    ipsum dolor sit amet</Text>
                <Text animOption={{screen: .3, offset: 0, type: 'paragraph'}} className={s['introduce-box_desc']}>
                    Once upon a time, in the magical land of New Bitcoin City, there was a
                    unique and extraordinary force known as GM tokens. They were more than just
                    digital assets—they were the embodiment of belief and hope for a brighter
                    future.
                </Text>

                <AnimFade className={s['introduce-box_buttons']} screen={.6}>
                    <Button className={cs(s.button, s.init)}>Example</Button>
                    <Button className={cs(s.button, s.trans)}>Example</Button>
                </AnimFade>

                <AnimFade className={s['introduce-video']} screen={1}>
                    <h5 className={s['introduce-video_title']}>Watch video story</h5>
                    <div className={s['wrap-video']}></div>
                </AnimFade>
            </div>
        </div>
    )
        ;
};

export default Introduce;
