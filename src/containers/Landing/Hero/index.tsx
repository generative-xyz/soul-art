import s from './style.module.scss';
import {Loading} from "@/containers/Landing/Loading";

export const Hero = (): JSX.Element => {

    return <div className={s.hero}>
        <Loading/>
    </div>
}