import React from 'react';
import Hero from '../../components/home/Hero';
import AdSlot from '../../components/AdSlot';
import HowItWorks from '../../components/home/HowItWorks';
import PopularJuices from '../../components/home/PopularJuices';
import HotDeals from '../../components/home/HotDeals';
import SEO from '../../components/common/SEO';

const Home = () => {
    return (
        <>
            <SEO
                title="Home"
                description="The freshest juice delivery platform near you. Order cold-pressed, hygienic juices online."
            />
            <Hero />
            <AdSlot variant="banner" />
            <HowItWorks />
            <PopularJuices />
            <HotDeals />
        </>
    );
};

export default Home;
