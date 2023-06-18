import s from './style.module.scss';
import Text from '@/animations/Text';
import { AnimFade } from '@/animations/Fade';
import TextAnimate from '@Components/TextAnimate';
import { useScrollFixed } from '@Hooks/useScorllFixed';
import { useContext, useEffect, useRef, useState } from 'react';
import { PAGE_READY } from '@Constants/common';
import { gsap } from 'gsap';
import { CDN_URL } from '@/configs';
import { AnimateContext } from '@Context/Animate';
import loadImage from 'image-promise';
import { MathMap } from '@Services/Animate/AnimateMathUtil';
import { Col, Container } from 'react-bootstrap';

const SectionFlys = (): JSX.Element => {
  const { pageStatus, registerLoader, unRegisterLoader } =
    useContext(AnimateContext);
  const refBox = useRef<HTMLDivElement | null>(null);
  const refImages = useRef<HTMLDivElement | null>(null);
  const refCurrent = useRef<number>(-1);
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    if (pageStatus === PAGE_READY) {
      registerLoader();
      const imgs: string[] = [];
      for (let i = 1; i <= 22; i++) {
        imgs.push(`${CDN_URL}/souls/1%20(${i}).jpg`);
      }
      loadImage(imgs).finally(() => {
        unRegisterLoader();
        setUrls(imgs);
      });
    }

    return () => {
      if (pageStatus === PAGE_READY) {
        unRegisterLoader();
      }
    };
  }, [pageStatus, registerLoader, unRegisterLoader]);

  useScrollFixed(refBox, 22 * 100, self => {
    const m = self.progress * 100;
    const index = Math.floor(MathMap(m, 0, 100, 0, 21));

    if (refCurrent.current !== index) {
      if (refCurrent.current < index) {
        const current = refImages.current?.children[index];
        const prev = refImages.current?.children[index - 1];
        if (current) {
          gsap.fromTo(
            current,
            { y: window.innerHeight, opacity: 0 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
              zIndex: index,
            }
          );
        }

        if (prev)
          gsap.to(prev, {
            opacity: 0,
            y: -window.innerHeight,
            duration: 0.5,
            ease: 'power3.out',
            zIndex: index,
          });
      } else {
        const current = refImages.current?.children[index];
        const prev = refImages.current?.children[index + 1];
        if (current) {
          gsap.fromTo(
            current,
            { y: -window.innerHeight, opacity: 0 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
              zIndex: index,
            }
          );
        }

        if (prev)
          gsap.to(prev, {
            opacity: 0,
            y: 1000,
            duration: 0.5,
            ease: 'power3.out',
            zIndex: index,
          });
      }

      refCurrent.current = index;
    }
  });

  return (
    <div ref={refBox} className={s.livingArtSection}>
      <Container className={s.containerTop}>
        <Col
          xs={{ span: 8, offset: 2 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
          className={s.columnTop}
        >
          <div ref={refImages} className={s.livingArtSection_images}>
            {urls.map(url => {
              return (
                <>
                  <img src={url} alt="img" />
                </>
              );
            })}
          </div>
        </Col>
      </Container>

      <Container className={s.container}>
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 10, offset: 1 }}
          lg={{ span: 10, offset: 1 }}
          className={s.column}
        >
          <div className={s.wrapContent}>
            <Text
              animOption={{ offset: 0, screen: 0, type: 'paragraph' }}
              className={s.sectionContent}
            >
              {`Souls are not static art but dynamic entities that reflect human behavior. They react to market dynamics, mirroring feelings of fear, greed, and belief. The interconnected nature of the Souls is fascinating, as one soul's changes can affect another soul within the collective.`}
            </Text>
            <AnimFade className={s.tag} offset={0.2}>
              <TextAnimate>
                <span>
                  Collective performance art that reflects human behavior
                </span>
              </TextAnimate>
            </AnimFade>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default SectionFlys;
