import React from 'react';
import s from './styles.module.scss';
import { CDN_URL } from '@/configs';
import Link from 'next/link';
import { DISCORD_URL } from '@/constants/common';

const Discord: React.FC = (): React.ReactElement => {
  return (
    <div className={s.discord}>
      <h3 className={s.blockTitle}>New adopter?</h3>
      <div className={s.discordContainer}>
        <div className={s.mainContent}>
          <div className={s.discordLogoWrapper}>
            <img
              className={s.discordLogo}
              src={`${CDN_URL}/discord-logo.svg`}
              alt="discord-logo"
            />
          </div>
          <img
            className={s.discordUsers}
            src={`${CDN_URL}/discord-user-2.png`}
            alt="discord-users"
          />
          <p className={s.discordText}>
            There are no Souls available for adoption. Join the New Bitcoin City
            Discord to be the first to know.
          </p>
          <Link href={DISCORD_URL} target="_blank" className={s.joinBtn}>
            Join Discord
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Discord;
