import React from "react";
import {GridDebug} from '@Animations/Grid/grid'
import {AnimateProvider} from "@Context/Animate";
import {Hero} from './Hero';

export const LandingContainer: React.FC = () => {
    return (
        <>
            <AnimateProvider>
                <Hero/>
                <GridDebug/>
            </AnimateProvider>
        </>
    );
};
