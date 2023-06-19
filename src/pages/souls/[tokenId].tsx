import Banner from '@/components/Banner';
import { SOUL_CONTRACT } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { SEO_IMAGE, SEO_TITLE } from '@/constants/seo';
import SoulItem from '@/containers/SoulItem';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import Layout from '@/layouts';
import logger from '@/services/logger';
import { getNFTDetail } from '@/services/marketplace';
import { GetServerSidePropsContext } from 'next';

const SoulDetailPage = ({ item }: { item: ITokenDetail }) => {
  return (
    <Layout>
      <Banner type={'normal'} />
      <SoulItem data={item} />
    </Layout>
  );
};

export default SoulDetailPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { query } = context;
    const { tokenId } = query as { tokenId: string };
    const data = await getNFTDetail({
      contractAddress: SOUL_CONTRACT.toLowerCase(),
      tokenId: tokenId,
    });

    return {
      props: {
        item: data,
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
