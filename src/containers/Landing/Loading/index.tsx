import s from './style.module.scss';
import classNames from "classnames";
import Text from "@Animations/Text";

export const Loading = (): JSX.Element => {

    return <div className={s.loading}>
        <div className={classNames(s.loading_over, s.loading_over__left)}>
            <img src="https://storage.googleapis.com/generative-static-prod/soul-art/loading-left-min.png"
                 alt="loading-left-min"/>
        </div>
        <div className={classNames(s.loading_over, s.loading_over__right)}>
            <img src="https://storage.googleapis.com/generative-static-prod/soul-art/loading-right-min.png"
                 alt="loading-right-min"/>
        </div>
        <div className={s.loading_icon}>
            <img className={s.loading_icon_dark}
                 src="https://storage.googleapis.com/generative-static-prod/soul-art/ic-loading-dark.svg"
                 alt="ic-loading"/>
            <img src="https://storage.googleapis.com/generative-static-prod/soul-art/ic-loading.svg" alt="ic-loading"/>
        </div>
        <div className={s.loading_inner}>
            <Text size={'d2'} className={'mb-1_16'}>
                Welcome to New Bitcoin City
            </Text>
            <Text size={'20'} className={'text-'}>
                Let the tale of Souls inspire you.
            </Text>
        </div>
    </div>
}