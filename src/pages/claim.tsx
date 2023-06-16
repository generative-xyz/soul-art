import Banner from '@/components/Banner';
import ClaimPage from '@/containers/Claim';
import Layout from '@/layouts';
import React from 'react';

const Status = () => {
  return (
    <Layout>
      <Banner type={'claim'} />
      <ClaimPage />
    </Layout>
  );
};

export default Status;
