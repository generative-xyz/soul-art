import React from 'react';
import {GridDebug} from '@Animations/Grid/grid';
import {Hero} from './Hero';
import Owner from './SectionOwner';
import Tech from './Tech';
import Flare from './Flare';
import Living from './Living';
import SubLiving from './SubLiving';
import Sunback from './Sunback';
import {useSmoothScroll} from '@Hooks/useSmoothScroll';
import {FrameTop} from "@/containers/Landing/FrameTop";

export const LandingContainer: React.FC = () => {
    useSmoothScroll();
    return (
        <>
            <GridDebug/>
            <Hero/>
            <FrameTop/>
            {/*<Living />*/}
            {/*<SubLiving />*/}
            {/*<Owner />*/}
            <Flare/>
            <Tech/>
        </>
    );
};
