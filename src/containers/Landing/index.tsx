import React from 'react';
import {GridDebug} from '@Animations/Grid/grid';
import {Hero} from './Hero';
import Introduce from './Introduce';
import Owner from './SectionOwner';
import Tech from './Tech';
import Flare from './Flare';
import Living from './Lingving';
import SubLiving from './SubLiving';
import Sunback from './Sunback';
import {useSmoothScroll} from "@Hooks/useSmoothScroll";

export const LandingContainer: React.FC = () => {
    useSmoothScroll();
    return (
        <>
            <GridDebug/>
            <Hero/>
            <Introduce/>
            <Living/>
            <SubLiving/>
            <Owner/>
            <Flare/>
            <Sunback/>
            <Tech/>
        </>
    );
};
