import AdoptStatus from '@/containers/AdoptStatus';
import Layout from '@/layouts';
import { NextPage } from 'next';
import React from 'react';

const AdoptStatusPage: NextPage = (): React.ReactElement => {
  return (
    <Layout>
      <AdoptStatus />
    </Layout>
  );
};

export default AdoptStatusPage;
