import { CDN_URL } from '@/configs';
import HomeHero from '@/containers/Home/Hero';
import NbcHeader from '@/layouts/NbcHeader';
import s from './style.module.scss';

const Homepage = () => {
  return (
    <div className={s.homeSection}>
      <NbcHeader theme={'dark'} />
      <HomeHero />
      <div className={s.homeSection_background}>
        <img src={`${CDN_URL}/homebg-1.png`} alt="background" />
      </div>
    </div>
  );
};

export default Homepage;
