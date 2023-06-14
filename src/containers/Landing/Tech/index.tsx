import { Container, Row, Col } from 'react-bootstrap';
import TechItem from './TechItem';
import s from './style.module.scss';
import { contentItem } from './TechItem';
import { useState, useEffect } from 'react';
import { techOverlay } from '@/constants/url';

const Tech: React.FC = () => {
  const contentArray: contentItem[] = [
    {
      id: 1,
      title: 'Sun top down',
      content:
        'Lorem ipsum dolor sit amet consectetur. Erat tincidunt feugiat egestas accumsan orci mauris integer rutrum nec. Et tincidunt enim ultrices facilisis nullam sed. Nisl urna pellentesque ut volutpat. Tellus mattis porttitor donec ac sed.',
    },
    {
      id: 2,
      title: 'Sun big small',
      content:
        'Lorem ipsum dolor sit amet consectetur. Erat tincidunt feugiat egestas accumsan orci mauris integer rutrum nec. Et tincidunt enim ultrices facilisis nullam sed. Nisl urna pellentesque ut volutpat. Tellus mattis porttitor donec ac sed.',
    },
    {
      id: 3,
      title: 'Wave',
      content:
        'Lorem ipsum dolor sit amet consectetur. Erat tincidunt feugiat egestas accumsan orci mauris integer rutrum nec. Et tincidunt enim ultrices facilisis nullam sed. Nisl urna pellentesque ut volutpat. Tellus mattis porttitor donec ac sed.',
    },
    {
      id: 4,
      title: 'Foreground',
      content:
        'Lorem ipsum dolor sit amet consectetur. Erat tincidunt feugiat egestas accumsan orci mauris integer rutrum nec. Et tincidunt enim ultrices facilisis nullam sed. Nisl urna pellentesque ut volutpat. Tellus mattis porttitor donec ac sed.',
    },
    {
      id: 5,
      title: 'Flare',
      content:
        'Lorem ipsum dolor sit amet consectetur. Erat tincidunt feugiat egestas accumsan orci mauris integer rutrum nec. Et tincidunt enim ultrices facilisis nullam sed. Nisl urna pellentesque ut volutpat. Tellus mattis porttitor donec ac sed.',
    },
    {
      id: 6,
      title: 'Clound',
      content:
        'Lorem ipsum dolor sit amet consectetur. Erat tincidunt feugiat egestas accumsan orci mauris integer rutrum nec. Et tincidunt enim ultrices facilisis nullam sed. Nisl urna pellentesque ut volutpat. Tellus mattis porttitor donec ac sed.',
    },
  ];

  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('js-tech');
      const sectionTop = section?.offsetTop || 0;
      const scrollPosition = Math.floor(
        window.pageYOffset || document.documentElement.scrollTop
      );

      if (scrollPosition >= sectionTop) {
        // console.log(1);
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]);

  return (
    <>
      <div id={'js-tech'} className={s.techSection}>
        <div className={s['background']}>
          <img src={techOverlay} alt="background" />
        </div>
        <Container>
          <Row>
            <Col
              className={`${s.leftContainer} ${isFixed ? s.fixed : ''}`}
              lg={5}
            >
              <div className={s.wrapLeftContainer}>
                <h1 className={s['leftContainer-title']}>
                  Technical Information Explanation
                </h1>
              </div>
            </Col>
            <Col className={s['right-container']} lg={7}>
              {contentArray.map(item => (
                <TechItem key={item.id} item={item} />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Tech;
