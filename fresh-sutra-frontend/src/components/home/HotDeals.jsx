import React, { useState, useEffect } from 'react';
import OrangeJuiceImg from '../../assets/images/img3.png';
import PineappleJuiceImg from '../../assets/images/img4.png';
import MixedFruitJuiceImg from '../../assets/images/mixed.png';
import WatermelonJuiceImg from '../../assets/images/watermelon.png';
import PartyPopperImg from '../../assets/images/party-popper.png';
import { FaStar, FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { API_BASE_URL } from '../../config/api';

const storeImages = [OrangeJuiceImg, PineappleJuiceImg, MixedFruitJuiceImg, WatermelonJuiceImg];

const StoreCard = ({ store, index }) => {
    // Pick an image deterministically based on index
    const image = storeImages[index % storeImages.length];
    
    return (
        <div className="flex-none w-[280px] md:w-full md:flex-1 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group snap-start border border-neutral-100 flex flex-col items-start h-full relative overflow-hidden">
            {/* Top Badge: Open/Closed */}
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm mb-4 ${store.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                {store.isOpen ? 'Open Now' : 'Closed'}
            </div>

            {/* Spacious Image Container */}
            <div className="w-full h-40 mb-4 flex items-center justify-center relative">
                <img
                    src={image}
                    alt={store.name}
                    className="w-4/5 h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="mt-auto w-full flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-900 mb-1 leading-tight group-hover:text-secondary transition-colors line-clamp-1" title={store.name}>
                    {store.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(store.rating || 0) ? "text-yellow-400" : "text-gray-200"} />
                        ))}
                    </div>
                    <span className="text-xs text-neutral-500 font-medium">({store.rating || 0})</span>
                </div>

                {/* Address */}
                <p className="text-neutral-500 text-xs leading-relaxed mb-4 line-clamp-2 min-h-[32px] flex-1">
                    <FaStore className="inline mr-1 text-gray-400" />
                    {store.address || store.category || "Local Juice Shop"}
                </p>

                {/* Distance */}
                <div className="flex items-center gap-2 pt-3 border-t border-neutral-50 text-secondary-red font-bold text-sm mt-auto">
                     <FaMapMarkerAlt />
                     <span>{store.distanceKm} km away</span>
                </div>
            </div>
        </div>
    );
};

const SkeletonCard = () => (
    <div className="flex-none w-[280px] md:w-full md:flex-1 bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col items-start h-full animate-pulse">
        <div className="w-16 h-6 bg-gray-200 rounded-full mb-4"></div>
        <div className="w-full h-40 bg-gray-100 rounded-xl mb-4"></div>
        <div className="w-3/4 h-6 bg-gray-200 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded mb-4"></div>
        <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded mb-4"></div>
        <div className="w-full pt-3 border-t border-neutral-50">
            <div className="w-1/2 h-5 bg-gray-200 rounded"></div>
        </div>
    </div>
);

const HotDeals = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStores = async (lat, lng) => {
            try {
                setLoading(true);
                const res = await fetch(`${API_BASE_URL}/api/stores/nearby-juice-stores?lat=${lat}&lng=${lng}`);
                if (!res.ok) throw new Error("Failed to fetch stores");
                const data = await res.json();
                // Take only the top 4 closest stores
                setStores(data.slice(0, 4));
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchFallbackStores = async () => {
            // Default to a central location (e.g., Connaught Place, New Delhi) if location denied
            fetchStores(28.6304, 77.2177);
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchStores(position.coords.latitude, position.coords.longitude);
                },
                (err) => {
                    console.warn("Location denied or error:", err);
                    fetchFallbackStores();
                },
                { timeout: 10000 }
            );
        } else {
            fetchFallbackStores();
        }
    }, []);

    return (
        <section className="w-full py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
                            Nearby Juice Stores
                        </h2>
                        <img
                            src={PartyPopperImg}
                            alt="Celebration"
                            className="w-8 md:w-10 -mt-1"
                        />
                    </div>
                    <p className="text-lg text-neutral-500 font-medium">
                        Find the freshest juice around you
                    </p>
                </div>

                {/* Content */}
                {loading ? (
                     <div className="flex overflow-x-auto pb-8 md:pb-0 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory scrollbar-hide md:gap-8 px-2 md:px-0">
                         {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                     </div>
                ) : error ? (
                    <div className="text-center p-8 bg-red-50 rounded-2xl text-red-600 font-medium border border-red-100 max-w-2xl mx-auto">
                        Oops! We couldn't fetch nearby stores right now. Please try again later.
                    </div>
                ) : stores.length === 0 ? (
                     <div className="text-center p-12 bg-gray-50 rounded-2xl border border-gray-100 max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Stores Found</h3>
                        <p className="text-gray-500">We couldn't find any juice stores near your location. We are expanding quickly, check back soon!</p>
                     </div>
                ) : (
                    <div className="flex overflow-x-auto pb-8 md:pb-0 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory scrollbar-hide md:gap-8 px-2 md:px-0 scroll-smooth">
                        {stores.map((store, index) => (
                            <StoreCard key={store.id || index} store={store} index={index} />
                        ))}
                    </div>
                )}

                {/* Disclaimer */}
                <p className="text-center text-xs text-neutral-400 mt-8 font-medium tracking-wide">
                    Stores and availability may vary by location.
                </p>
            </div>
        </section>
    );
};

export default HotDeals;
