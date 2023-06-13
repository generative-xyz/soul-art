import { LandingContainer } from '@/containers/Landing';
import { AnimateProvider } from '@Context/Animate';

const LandingPage = () => {

  return (
    <AnimateProvider>
      <LandingContainer />
    </AnimateProvider>
  );
};

export default LandingPage;
