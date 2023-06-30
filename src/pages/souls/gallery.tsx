// import Banner from '@/components/Banner';
import { CDN_URL } from '@/configs';
import { SoulsContainer } from '@/containers/Souls';
import Layout from '@/layouts';
import { NextPage } from 'next';

const SoulsPage: NextPage = () => {
  return (
    <Layout>
      {/*<Banner type={'normal'} />*/}
      <SoulsContainer />
    </Layout>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      seoInfo: {
        title: 'The Souls | Art',
        description:
          'Enjoy Souls - a living masterpiece that is dynamically evolving and reacting to various stimuli.',
        image: `${CDN_URL}/soul-metadata.jpg`,
      },
    },
  };
}

export default SoulsPage;
