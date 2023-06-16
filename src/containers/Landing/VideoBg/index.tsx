import s from './style.module.scss';
import {ReactNode} from "react";
import classNames from "classnames";

interface IVideoBg {
    children: ReactNode
    className?: string,
    videoUrls: {
        webm?: string,
        mp4: string
    }
}

const VideoBg = ({children, videoUrls, className = ''}: IVideoBg): JSX.Element => {
    return (
        <div className={classNames(s.videoBg, className)}>
            <div className={s.videoBg_bg}>
                <video muted playsInline autoPlay>
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
