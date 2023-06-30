import { NextPage } from 'next';
import React from 'react';
import ArtLandingPage from '@/containers/Art';
import {CDN_URL} from "@/configs";

const LandingPage: NextPage = (): React.ReactElement => {
  return <ArtLandingPage />;
};

export async function getServerSideProps() {
  return {
    props: {
      seoInfo: {
        title: 'The Souls | Tech',
        description:
          'Enjoy Souls - a living masterpiece that is dynamically evolving and reacting to various stimuli.',
        image: `${CDN_URL}/soul-metadata.jpg`,
      },
    },
  };
}

export default LandingPage;
