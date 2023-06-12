import s from './style.module.scss';
import {Loading} from "@/containers/Landing/Loading";
import Text from "@Animations/Text";

export const Hero = (): JSX.Element => {

    return <div className={s.hero}>
        <div className={s.hero_bg}>
            <img src={`https://storage.googleapis.com/generative-static-prod/soul-art/loading.jpeg`} alt="loading"/>
        </div>
        <div className="hero_inner">
            <Text>
                Welcome to New Bitcoin City
            </Text>
        </div>
        <Loading/>
    </div>
}