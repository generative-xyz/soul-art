import s from './style.module.scss';

export const Loading = ():JSX.Element =>{

    return <div className={s.loading}>
            <div className={s.loading_icon}>
                <img className={s.loading_icon_dark} src="https://storage.googleapis.com/generative-static-prod/soul-art/ic-loading-dark.svg" alt="ic-loading"/>
                <img src="https://storage.googleapis.com/generative-static-prod/soul-art/ic-loading.svg" alt="ic-loading"/>
            </div>
    </div>
}