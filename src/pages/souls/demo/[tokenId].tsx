import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '@/layouts';
import { ROUTE_PATH } from '@/constants/route-path';
import { SEO_IMAGE, SEO_TITLE } from '@/constants/seo';
import logger from '@/services/logger';
import { getSoulDemoDetail } from '@/services/demo-soul';
import SoulItem from '@/containers/SoulItemDemo';
// import Banner from '@/components/Banner';

const SoulDetailPage: NextPage = () => {
  return (
    <Layout>
      {/*<Banner type={'normal'} />*/}
      <SoulItem />
    </Layout>
  );
};

export default SoulDetailPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { query } = context;
    const { tokenId } = query as { tokenId: string };
    const data = await getSoulDemoDetail({
      tokenId,
    });

    return {
      props: {
        seoInfo: {
          title: `${SEO_TITLE} | Soul #${tokenId}`,
          image: data.image || SEO_IMAGE,
        },
      },
    };
  } catch (err: unknown) {
    logger.error(err);

    return {
      redirect: {
        permanent: false,
        destination: ROUTE_PATH.NOT_FOUND,
      },
    };
  }
}
