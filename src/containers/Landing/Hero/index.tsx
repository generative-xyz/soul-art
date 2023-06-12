import s from './style.module.scss';
import {Loading} from "@/containers/Landing/Loading";

export const Hero = (): JSX.Element => {

    return <div className={s.hero}>
        <div className={s.hero_bg}>
            <img src={`https://storage.googleapis.com/generative-static-prod/soul-art/loading.jpeg`} alt="loading"/>
        </div>
        <Loading />
    </div>
}