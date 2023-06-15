import IconSVG from '@Components/IconSVG';
import s from './style.module.scss';
import {useContext, useEffect, useState, useCallback} from "react";
import {AnimateContext} from "@Context/Animate";
import {MathMap} from "@Services/Animate/AnimateMathUtil";
import { progressPlay, progressPoint, progressZoom } from '@/constants/asset';

const ProgressBar = () => {
    const [po, setPo] = useState<number>(0);
    const [rote, setRote] = useState<number>(0);
    const {lenis} = useContext(AnimateContext);

    const getPo = useCallback(
        () => {
            setPo(lenis?.progress || 0)
            setRote(rote + 1);
        },
        [lenis, rote],
    );

    useEffect(() => {
        lenis?.on('scroll', getPo);
        return () => {
            lenis?.off('scroll', getPo);
        }
    }, [lenis, getPo]);

    return (
        <div className={s.progressBar} style={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            '--rote': `${MathMap(po, 0, 1, 0, 360)}deg`
        }}>
            <IconSVG
                src={progressPlay}
                maxWidth={'48'}
                maxHeight={'48'}
                className={`${s.playBtn} ${s.btn}`}
            />
            <div className={s.progress} style={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                '--po': `${po * 100}%`,
            }}>
                <IconSVG
                    src={progressPoint}
                    maxWidth={'20'}
                    maxHeight={'20'}
                    className={s.point}
                />
                <div className={s.line}/>
                <div className={s.line_po}/>
            </div>
            <IconSVG
                src={progressZoom}
                maxWidth={'36'}
                maxHeight={'36'}
                className={`${s.zoomBtn} ${s.btn}`}
            />
        </div>
    );
};

export default ProgressBar;
