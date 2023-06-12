import React from "react";
import {GridDebug} from '@Animations/Grid/grid'
import {AnimateProvider} from "@Context/Animate";

export const LandingContainer: React.FC = () => {
    return (
        <>
            <AnimateProvider>
                {<GridDebug/>}
            </AnimateProvider>
        </>
    );
};
