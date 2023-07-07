import React from 'react';
import cs from 'classnames';
import s from './styles.module.scss';
import { ROUTE_PATH } from '@/constants/route-path';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { DISCORD_URL, TWITTER_URL } from '@/constants/common';
import Accordion from 'react-bootstrap/Accordion';

interface IProps {
  theme?: string;
  show: boolean;
  handleClose: () => void;
}

const MobileMenu: React.FC<IProps> = ({
  theme,
  show,
  handleClose,
}): React.ReactElement => {
  return (
    <div className={cs(s.mobileMenu, theme ? s[theme] : '', 'dark', show ? s.show : '')}>
      <div className={s.wrapper}>
        <div className={s.menuHeader}>
          <a className={s.nbcLogo} href={ROUTE_PATH.NBC_HOME}>
            NBC
          </a>
          <Button className={s.closeBtn} onClick={handleClose}>
            <IconSVG
              maxWidth='24'
              maxHeight='24'
              src={`${CDN_URL}/ic-menu-close.svg`}
            />
          </Button>
        </div>
        <div className={cs(s.menuBody, 'disable-scrollbar')}>
          <ul className={s.menuList}>
            <li className={s.menuItem}>
              <a className={s.menuLink} href={ROUTE_PATH.NBC_GAMEFI}>
                GameFi
              </a>
            </li>
            <li className={s.menuItem}>
              <a className={s.menuLink} href={ROUTE_PATH.NBC_DEFI}>
                DeFi
              </a>
            </li>
            <li className={s.menuItem}>
              <a className={s.menuLink} href={ROUTE_PATH.NBC_NFT}>
                NFTs
              </a>
            </li>
            <li className={s.menuItem}>
              <Accordion className={s.accordion} defaultActiveKey="">
                <Accordion.Item className={s.accordionItem} eventKey="0">
                  <Accordion.Header className={s.accordionHeader}>GM & Souls</Accordion.Header>
                  <Accordion.Body className={s.accordionBody}>
                    <ul className={s.soulMenu}>
                      <li className={s.soulMenuItem}>
                        <a className={s.menuLink} href={ROUTE_PATH.STORY}>
                          Souls
                        </a>
                      </li>
                      <li className={s.soulMenuItem}>
                        <a className={s.menuLink} href={ROUTE_PATH.GM}>
                          GM
                        </a>
                      </li>
                      <li className={s.soulMenuItem}>
                        <a className={s.menuLink} href={ROUTE_PATH.ORPHANAGE}>
                          Orphanage
                        </a>
                      </li>
                      <li className={s.soulMenuItem}>
                        <a className={s.menuLink} href={ROUTE_PATH.TECH}>
                          Tech
                        </a>
                      </li>
                      <li className={s.soulMenuItem}>
                        <a className={s.menuLink} href={ROUTE_PATH.ART}>
                          Art
                        </a>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>
            <li className={s.menuItem}>
              <a className={cs(s.menuLink, s.gradientText)} href={ROUTE_PATH.NBC_BUILDER}>
                Builder
              </a>
            </li>
            <li className={s.menuItem}>
              <a className={s.menuLink} href={ROUTE_PATH.NBC_STORY}>
                Our Story
              </a>
            </li>
          </ul>
          <div className={s.socialWrapper}>
            <a href={DISCORD_URL} className={s.socialLink}>
              <IconSVG
                src={`${CDN_URL}/ic-discord.svg`}
                type="fill"
                color={'black'}
                maxHeight='20'
                maxWidth='20'
              />
            </a>
            <a href={TWITTER_URL} className={s.socialLink}>
              <IconSVG
                src={`${CDN_URL}/ic_twitter.svg`}
                type="fill"
                color={'black'}
                className={s.menuItem_icon}
                maxHeight='20'
                maxWidth='20'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MobileMenu);
