import Explorer from '@/components/Explorer'
import { NextPage } from 'next';

const GmLosePage: NextPage = (): JSX.Element => {
  return (
    <Explorer url={'/arts/top.html'} />
  );
};

export default GmLosePage;
