import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import cs from 'classnames';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';
import { Container } from 'react-bootstrap';
import { mobileIntroduce, modalPlay } from '@/constants/asset';
import Text from '@Animations/Text';
import { CDN_URL } from '@/configs';
import ImageFrame from '@/components/ImageFrame';
import classNames from 'classnames';

type IMobileIntroduce = {
  isShow: boolean;
  handleOpenModal: () => void;
};

const MobileIntroduce: React.FC<IMobileIntroduce> = ({
  isShow,
  handleOpenModal,
}) => {
  return (
    <div className={`${s.mobileIntroduce} ${isShow ? s.popupOpen : ''}`}>
      <Container className={s.container}>
        <div className={s.mobileImg}>
          <img src={mobileIntroduce} alt="background image" />
        </div>

        <div className={s.wrapContent}>
          <Text
            as={'h1'}
            size={'d1'}
            color={'white-primary'}
            className={s['introduceBox-title']}
          >
            Souls: The Soulbound Art Protocol
          </Text>
          <Text
            as={'p'}
            size={'24'}
            color={'white-primary'}
            className={s['introduceBox-desc']}
          >
            {`Souls is a new kind of art (“soulbound”) and the first-ever art protocol. Souls cannot be bought or sold. A nurtured Soul will stay with you forever, but a neglected Soul might leave you to find a new home. All Souls are interconnected — creating a collective performance art experience. The Souls protocol is managed by the collector-run DAO and powered by the cryptocurrency Good Morning (GM).`}
          </Text>

          <div className={s['introduceBox-buttons']}>
            <Link href={ROUTE_PATH.CLAIM} className={cs(s.button, s.init)}>
              Adopt a Soul
              <span className={s.countdown}>
                <SonarWaveCircle />
                <CountdownText />
              </span>
            </Link>
            <Link
              href={'https://discord.gg/sBTeHRW5Xb'}
              className={cs(s.button, s.trans)}
              target="_blank"
            >
              <IconSVG
                src={`${CDN_URL}/ic-discord.svg`}
                maxWidth={'20'}
              ></IconSVG>
              Join Discord
            </Link>
          </div>

          <div className={s.mobileIntroduce_actions}>
            <div className={s.mobileIntroduce_actions_item}>
              <div className={s['introduceVideo']}>
                <h5 className={s['introduceVideo-title']}>Watch the film</h5>
                <div className={s['wrap-video']} onClick={handleOpenModal}>
                  <ImageFrame type={'small'}>
                    <img src={`${CDN_URL}/poster-thumb.jpg`} alt="videoplay" />
                    <IconSVG
                      src={modalPlay}
                      maxWidth={'40'}
                      maxHeight={'40'}
                      className={s.modalPlay}
                    />
                  </ImageFrame>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                s.mobileIntroduce_actions_item,
                s.mobileIntroduce_actions_item__pdf
              )}
            >
              <div className={s['introduceVideo']}>
                <h5 className={s['introduceVideo-title']}>
                  Read the Whitepaper
                </h5>
                <div
                  className={classNames(s['wrap-video'], s['wrap-pdf'])}
                  onClick={() => {
                    window.open(`https://newbitcoincity.com/souls.pdf`);
                  }}
                >
                  <ImageFrame type={'small'}>
                    <div className={s.content}>
                      <IconSVG
                        src={`${CDN_URL}/icon-pdf.svg`}
                        maxWidth={'45'}
                        maxHeight={'55'}
                        className={s.modalPlay}
                      />
                    </div>
                  </ImageFrame>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileIntroduce;
