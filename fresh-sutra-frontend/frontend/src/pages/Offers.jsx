import React, { useState } from 'react';
import classNames from 'classnames';
import { FiGift, FiZap, FiAward, FiClock, FiMapPin, FiSmile } from 'react-icons/fi';
import AdSlot from '../components/AdSlot';
import OfferModal from '../components/OfferModal';

const Offers = () => {
    // Mock Data for Offers
    const offers = [
        {
            id: 1,
            title: "Fresh Start Offer",
            description: "Flat 20% OFF on your first juice order",
            badge: "New",
            badgeColor: "bg-blue-100 text-blue-700",
            bgGradient: "from-orange-50 to-orange-100",
            icon: <FiSmile className="text-orange-500" size={24} />
        },
        {
            id: 2,
            title: "Healthy Hour Deals",
            description: "Special prices everyday 4PM - 6PM",
            badge: "Limited Time",
            badgeColor: "bg-red-100 text-red-700",
            bgGradient: "from-green-50 to-green-100",
            icon: <FiClock className="text-green-600" size={24} />
        },
        {
            id: 3,
            title: "Nearby Store Specials",
            description: "Exclusive offers from juice shops near you",
            badge: "Trending",
            badgeColor: "bg-purple-100 text-purple-700",
            bgGradient: "from-purple-50 to-purple-100",
            icon: <FiMapPin className="text-purple-600" size={24} />
        },
        {
            id: 4,
            title: "Seasonal Juice Combos",
            description: "Try our limited-time summer fruit blends",
            badge: "Seasonal",
            badgeColor: "bg-yellow-100 text-yellow-700",
            bgGradient: "from-yellow-50 to-yellow-100",
            icon: <FiZap className="text-yellow-600" size={24} />
        }
    ];

    const [selectedOffer, setSelectedOffer] = useState(null);

    return (
        <div className="w-full min-h-screen bg-white pb-20 overflow-visible">
            {/* 🟢 SECTION 1: HERO / HEADER */}
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 to-red-400 text-white rounded-b-[2.5rem] shadow-lg mb-8">
                {/* Floating Icons Background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <FiGift className="absolute top-4 left-4 animate-bounce" size={40} />
                    <FiZap className="absolute top-1/2 right-8 animate-pulse" size={32} />
                    <FiSmile className="absolute bottom-4 left-1/3 animate-spin-slow" size={48} />
                </div>

                <div className="relative z-10 p-8 md:p-12 text-center animate-fadeIn">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight drop-shadow-sm">
                        Offers & Rewards
                    </h1>
                    <p className="text-lg md:text-xl font-medium opacity-90">
                        Save more on every sip 🍹
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">

                {/* 🟢 SECTION 2: FEATURED OFFERS (PRIMARY) */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <FiZap className="text-secondary text-xl" />
                        <h2 className="text-xl font-bold text-gray-800">Featured Offers</h2>
                    </div>

                    {/* Horizontal Scroll on Mobile, Grid on Desktop */}
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
                        {offers.map((offer) => (
                            <div
                                key={offer.id}
                                onClick={() => setSelectedOffer(offer)}
                                className={`relative p-5 rounded-2xl border border-transparent hover:border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br ${offer.bgGradient} cursor-pointer group`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${offer.badgeColor}`}>
                                        {offer.badge}
                                    </span>
                                    <div className="bg-white/60 p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        {offer.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-secondary transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium">
                                    {offer.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🟡 SECTION 3: AD SLOT (TARGETED – 1) */}
                <AdSlot variant="banner" className="my-10" />

                {/* 🟢 SECTION 4: REWARDS & LOYALTY (TEASER) */}
                <div className="mb-10 animate-fadeIn delay-100">
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
                        {/* Soft Blur Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 text-center">
                            <div className="inline-block p-3 bg-orange-50 rounded-full mb-4 shadow-sm text-secondary">
                                <FiAward size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Earn Rewards with Every Order
                            </h2>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                More juice, more perks. Our loyalty program is brewing something special for you! Rewards coming soon.
                            </p>

                            {/* Mock Progress Bar */}
                            <div className="max-w-xs mx-auto mb-6">
                                <div className="flex justify-between text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
                                    <span>Start</span>
                                    <span>Gold Member</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full w-2/3 shadow-sm relative">
                                        <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                                <p className="text-xs text-orange-500 font-bold mt-2 text-center">
                                    Coming Soon!
                                </p>
                            </div>

                            <div className="flex justify-center gap-6 md:gap-10 text-gray-500 text-sm font-medium">
                                <div className="flex flex-col items-center gap-1">
                                    <FiSmile className="text-secondary" size={20} />
                                    <span>Points</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <FiGift className="text-secondary" size={20} />
                                    <span>Gifts</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <FiZap className="text-secondary" size={20} />
                                    <span>Free Juice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🟡 SECTION 5: AD SLOT (INLINE / FEED) */}
                <AdSlot variant="inline" className="my-8" />

                {/* 🟢 SECTION 6: TRUST MICRO-COPY */}
                <div className="text-center mt-12 mb-4">
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        Offers may vary by location and store availability. Terms and conditions apply.
                    </p>
                </div>

            </div>

            {/* Offer Details Modal */}
            {selectedOffer && (
                <OfferModal
                    offer={selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                />
            )}
        </div>
    );
};

export default Offers;
