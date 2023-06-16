import Banner from '@/components/Banner';
import { SoulsContainer } from '@/containers/Souls';
import Layout from '@/layouts';
import { FC } from 'react';

const SoulsPage: FC = () => {
  return (
    <Layout>
      <Banner type={'normal'} />
      <SoulsContainer />
    </Layout>
  );
};

export default SoulsPage;
