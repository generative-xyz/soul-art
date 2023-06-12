import s from './style.module.scss';
import {Loading} from "@/containers/Landing/Loading";
// import Text from "@Animations/Text";

export const Hero = (): JSX.Element => {

    return <div className={s.hero}>
        <div className={s.hero_bg}>
            <img src="https://storage.googleapis.com/generative-static-prod/soul-art/hero-bg-min.jpeg" alt="loading"/>
        </div>
        <Loading/>
        {/*<div className={s.hero_inner}>*/}
        {/*    <Text size={'d2'}>*/}
        {/*        Welcome to New Bitcoin City*/}
        {/*    </Text>*/}
        {/*</div>*/}
    </div>
}