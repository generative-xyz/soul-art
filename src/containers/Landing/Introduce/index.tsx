import Button from '@/components/Button';
import Text from '@Animations/Text';
import { AnimFade } from '@Animations/Fade';
import s from './style.module.scss';
import cs from 'classnames';
import ImageFrame from '@/components/ImageFrame';
import IconSVG from '@/components/IconSVG';
import HeroModal from './Modal';
import { useState } from 'react';
import { IMG_HERO_URL, modalPlay } from '@/constants/url';
import { Col, Container } from 'react-bootstrap';

const Introduce: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsShow(true);
  };

  const handleCloseModal = () => {
    setIsShow(false);
  };

  return (
    <div className={s.introduce}>
      <Container className={s.container}>
        <Col lg={{ span: 6, offset: 1 }} className={s.column}>
          <div className={s['introduceBox']}>
            <Text
              as={'h1'}
              size={'d1'}
              color={'white-primary'}
              animOption={{ screen: 0, offset: 0, type: 'heading' }}
              className={s['introduceBox-title']}
            >
              Lorem ipsum dolor sit amet
            </Text>
            <Text
              as={'p'}
              size={'24'}
              color={'white-primary'}
              animOption={{ screen: 0.3, offset: 0, type: 'paragraph' }}
              className={s['introduceBox-desc']}
            >
              Once upon a time, in the magical land of New Bitcoin City, there
              was a unique and extraordinary force known as GM tokens. They were
              more than just digital assets—they were the embodiment of belief
              and hope for a brighter future.
            </Text>

            <AnimFade className={s['introduceBox-buttons']} screen={0.6}>
              <Button className={cs(s.button, s.init)}>Explore art</Button>
              <Button className={cs(s.button, s.trans)}>Claim Souls</Button>
            </AnimFade>

            <AnimFade className={s['introduceVideo']} screen={1}>
              <h5 className={s['introduceVideo-title']}>Watch video story</h5>
              <div className={s['wrap-video']}>
                <ImageFrame>
                  <img src={IMG_HERO_URL} alt="videoplay" />
                  <IconSVG
                    src={modalPlay}
                    maxWidth={'40'}
                    maxHeight={'40'}
                    className={s.modalPlay}
                    onClick={handleOpenModal}
                  />
                </ImageFrame>
              </div>
            </AnimFade>
          </div>
        </Col>
      </Container>
      <HeroModal showModal={isShow} closeModal={handleCloseModal} />
    </div>
  );
};

export default Introduce;
