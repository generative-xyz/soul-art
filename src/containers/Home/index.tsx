import Header from '@/layouts/Header';
import s from './style.module.scss';
import { HEADER_HEIGHT } from '@/layouts';
import { CDN_URL } from '@/configs';
import HomeHero from "@/containers/Home/Hero";

const Homepage = () => {
  return (
    <div className={s.homeSection}>
      <Header height={HEADER_HEIGHT} isAnimation={false} theme={'dark'} />
      <HomeHero />
      <div className={s.homeSection_background}>
        <img src={`${CDN_URL}/homebg-1.png`} alt="background" />
      </div>
    </div>
  );
};

export default Homepage;
