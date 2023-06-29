import { CDN_URL } from '@/configs';
import FAQs from '@/containers/FAQs';
import Layout from '@/layouts';
import { NextPage } from 'next';

const FAQsPage: NextPage = () => {
  return (
    <Layout>
      <FAQs />
    </Layout>
  );
};

export default FAQsPage;

export async function getServerSideProps() {
  return {
    props: {
      seoInfo: {
        title: 'The Souls | FAQs',
        description:
          'Browse available Souls, submit adoption proposals, and view adopted Souls.',
        image: `${CDN_URL}/soul-metadata.jpg`,
      },
    },
  };
}
