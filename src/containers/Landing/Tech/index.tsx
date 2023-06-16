import { Container, Row, Col } from 'react-bootstrap';
import TechItem from './TechItem';
import Text from '@Animations/Text';
import s from './style.module.scss';
import { contentItem } from './TechItem';
import { techOverlay } from '@/constants/asset';

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

  return (
    <>
      <div className={s.techSection}>
        <div className={s['background']}>
          <img src={techOverlay} alt="background" />
        </div>
        <Container className={s.container}>
          <Row>
            <Col className={`${s.leftContainer}`} lg={5}>
              <div className={s.wrapLeftContainer}>
                <Text
                  size={'d0'}
                  color={'primary-white'}
                  animOption={{ screen: 0, offset: 0, type: 'heading' }}
                  className={s['leftContainer-title']}
                >
                  Technical Information Explanation
                </Text>
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
