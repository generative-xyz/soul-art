import s from './style.module.scss';
import Text from '@/animations/Text';
import { AnimFade } from '@/animations/Fade';
import TextAnimate from '@Components/TextAnimate';
import { useScrollFixed } from '@Hooks/useScorllFixed';
import { useContext, useEffect, useRef, useState } from 'react';
import { PAGE_READY } from '@Constants/common';
import { CDN_URL } from '@/configs';
import { AnimateContext } from '@/contexts/animate-context';
import loadImage from 'image-promise';
import { MathMap } from '@Services/Animate/AnimateMathUtil';
import { Col, Container } from 'react-bootstrap';
import Slider from 'react-slick';

const SectionFlys = (): JSX.Element => {
  const { pageStatus, registerLoader, unRegisterLoader } =
    useContext(AnimateContext);
  const refBox = useRef<HTMLDivElement | null>(null);
  const refImages = useRef<HTMLDivElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const [urls, setUrls] = useState<string[]>([]);
  const [maxWidthScroll, setMaxWidthScroll] = useState<number>();

  useEffect(() => {
    if (pageStatus === PAGE_READY) {
      registerLoader();
      const imgs: string[] = [];
      for (let i = 1; i <= 22; i += 2) {
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

  useEffect(() => {
    setMaxWidthScroll(refImages.current?.scrollWidth);
  }, [refImages.current?.scrollWidth]);

  useScrollFixed(refBox, maxWidthScroll!, self => {
    const m = self.progress * 100;
    const width =
      ((refContainer.current?.clientWidth || 0) / (maxWidthScroll || 1)) * 100;
    const scroll = MathMap(m, 0, 100, 0, 100 - width);

    if (refImages.current) {
      refImages.current.style.transform = `translateX(${-scroll}%)`;
    }
  });

  const settings = {
    dots: false,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
  };

  return (
    <div ref={refBox} className={s.livingArtSection}>
      <Container className={s.containerTop}>
        <Col ref={refContainer} xs={12} md={12} lg={12} className={s.columnTop}>
          <div ref={refImages} className={s.livingArtSection_images}>
            {urls.map((url, index) => {
              return (
                <div className={s.wrapImg} key={index}>
                  <img src={url} alt="img" />
                </div>
              );
            })}
          </div>
        </Col>
        <Slider className={s.mobileSlider} {...settings}>
          {urls.map((url, index) => {
            return (
              <div className={s.wrapImg} key={index}>
                <img src={url} alt="img" />
              </div>
            );
          })}
        </Slider>
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
              {`Every Soul has a design with the sun as its focal point. The sun has a rich metaphorical meaning in addition to its literal meaning of warmth and light. It is reminiscent of the "good morning" salutation that is frequently used in the crypto community, denoting optimism and the beginning of a new chapter.`}
            </Text>
            <AnimFade className={s.tag} offset={0.2}>
              <TextAnimate>
                <span>The “Good Morning” piece of Generative Art</span>
              </TextAnimate>
            </AnimFade>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default SectionFlys;
