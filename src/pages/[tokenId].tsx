import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '@/layouts';
import { ROUTE_PATH } from '@/constants/route-path';
import { SEO_IMAGE, SEO_TITLE } from '@/constants/seo';
import logger from '@/services/logger';
import { getSoulDetail } from '@/services/soul';
import SoulItem from '@/containers/SoulItem';

const SoulDetailPage: NextPage = () => {
  return (
    <Layout>
      <SoulItem />
    </Layout>
  );
};

export default SoulDetailPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { query } = context;
    const { tokenId } = query as { tokenId: string };
    const data = await getSoulDetail({
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
