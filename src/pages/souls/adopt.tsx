// import Banner from '@/components/Banner';
import { CDN_URL } from '@/configs';
import ClaimPage from '@/containers/Claim';
import Layout from '@/layouts';
import { NextPage } from 'next';
import React from 'react';

const AdoptPage: NextPage = (): React.ReactElement => {
  return (
    <Layout>
      {/*<Banner type={'claim'} />*/}
      <ClaimPage />
    </Layout>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      seoInfo: {
        title: 'The Souls | Adopt Souls',
        description:
          'Adopt Souls - the first-ever soulbound art that are non-transferable and intimately linked to you.',
        image: `${CDN_URL}/soul-metadata.jpg`,
      },
    },
  };
}

export default AdoptPage;
