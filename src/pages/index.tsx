import {LandingContainer} from '@/containers/Landing';
import {AnimateProvider} from '@Context/Animate';
import React from "react";

const LandingPage = () => {
    return (
        <AnimateProvider>
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: `
        history.scrollRestoration = "manual"
        `,
                }}
            />
            <LandingContainer/>
        </AnimateProvider>
    );
};

export default LandingPage;
