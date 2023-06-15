import { LandingContainer } from '@/containers/Landing';
import { AnimateProvider } from '@Context/Animate';
import React from "react";

const LandingPage = () => {
  return (
    <AnimateProvider>
        <LandingContainer />
    </AnimateProvider>
  );
};

export default LandingPage;
