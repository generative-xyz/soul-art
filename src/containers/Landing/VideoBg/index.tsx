import s from './style.module.scss';
import {ReactNode, useRef} from "react";
import classNames from "classnames";
import {useParallax} from "@Hooks/useParallax";

interface IVideoBg {
    children: ReactNode
    className?: string,
    videoUrls: {
        webm?: string,
        mp4: string
    }
}

const VideoBg = ({children, videoUrls, className = ''}: IVideoBg): JSX.Element => {
    const refBox = useRef<HTMLDivElement>(null);
    const refElement = useRef<HTMLDivElement>(null);

    useParallax(refBox, refElement, .5);
    return (
        <div ref={refBox} className={classNames(s.videoBg, className)}>
            <div ref={refElement} className={s.videoBg_bg}>
                <video muted playsInline autoPlay loop>
                    {
                        videoUrls.webm && <source src={videoUrls.webm} type="video/webm"/>
                    }
                    <source src={videoUrls.mp4} type="video/mp4"/>
                </video>
            </div>
            <div className={classNames(s.wrapContent, 'wrapContent')}>
                {
                    children
                }
            </div>
        </div>
    );
};

export default VideoBg;
