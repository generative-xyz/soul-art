import React from "react";
import s from './styles.module.scss';
import IconSVG from "@/components/IconSVG";
import { CDN_URL } from "@/configs";
import { ROUTE_PATH } from "@/constants/route-path";
import Link from "next/link";
import cs from 'classnames';

const TabDescription: React.FC = (): React.ReactElement => {
  return (
    <div className={cs(s.tabDesc, 'small-scrollbar')}>
      <div className={s.tabDescHead}>
        <div>
          <IconSVG
            src={`${CDN_URL}/ic-sun.svg`}
            maxWidth={'40'}
            className={s.tabDescHeadIcon}
          />
        </div>
        <p>Learn more about Soul</p>
        <Link
          href={ROUTE_PATH.GALLERY}
          className={s.tabDescHeadButton}
        >
          Explore
          <IconSVG
            src={`${CDN_URL}/bannerArrow.svg`}
            maxWidth={'10.67'}
            maxHeight={'8'}
          ></IconSVG>
        </Link>
      </div>
      <div className={s.tabDescText}>
        Souls is an open-source project and protocol that portrays the future of
        Bitcoin as vastly more helpful than just a currency. The Souls art
        protocol is a system of interconnected living artworks, trustlessly
        choreographed by unstoppable smart contracts, financially managed by a
        collector-run DAO, and powered by a native cryptocurrency.
        <br />
        <br />
        Unlike any artwork before it, Souls artworks are soulbound and therefore
        non-transferable. You cannot buy and sell a soul. Also, unlike any
        artwork before it, Souls artworks are living organisms; they leave their
        collectors and join the Souls orphanage if their collectors stop taking
        care of them. The only way to collect a soul is to adopt an abandoned
        one from the orphanage.
        <br />
        <br />
        Visually, at the microlevel, each soul is a dynamic artwork that
        personalises itself based on the collector’s belief in the future of
        Bitcoin over time. And at the macro level, all Souls artworks
        collectively embody our behaviours in crypto, such as fear (FUD), greed
        (FOMO), and belief (HODL), creating a collective performance art
        experience.
      </div>
    </div>
  );
};

export default React.memo(TabDescription);