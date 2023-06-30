// import Banner from '@/components/Banner';
import { CDN_URL } from '@/configs';
import { SoulsContainer } from '@/containers/Souls';
import Layout from '@/layouts';
import { NextPage } from 'next';

const OrphanagePage: NextPage = () => {
  return (
    <Layout>
      <SoulsContainer isOrphanagePage={true} />
    </Layout>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      seoInfo: {
        title: 'The Souls | Orphanage',
        description:
          'Browse available Souls, submit adoption proposals, and view adopted Souls.',
        image: `${CDN_URL}/soul-metadata.jpg`,
      },
    },
  };
}

export default OrphanagePage;
