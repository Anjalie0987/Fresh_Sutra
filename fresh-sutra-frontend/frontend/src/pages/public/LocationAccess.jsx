import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const LocationAccess = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEnableLocation = () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const loc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                localStorage.setItem('userLocation', JSON.stringify(loc));
                // Redirect immediately to the store finder page
                navigate('/stores-near-you');
            },
            (err) => {
                console.warn("Location access denied/error:", err);
                // requirement: Stop "Detecting..." state
                setIsLoading(false);
                // requirement: Show friendly error message
                setError("Unable to detect your location. Please enter location manually.");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const handleManualLocation = () => {
        navigate('/stores-near-you', { state: { manualLocationMode: true } });
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4 text-center">

            {/* Icon Illustration */}
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 animate-bounce transition-all duration-1000">
                <MdLocationOn className="text-secondary text-5xl" />
            </div>

            {/* Content */}
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Enable Location Access
            </h1>
            <p className="text-neutral-500 text-lg max-w-sm mb-10 leading-relaxed">
                We use your location to show fresh juice stores near you.
            </p>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm max-w-xs border border-red-100">
                    {error}
                </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-xs">
                {/* Primary: Allow Access */}
                <button
                    onClick={handleEnableLocation}
                    disabled={isLoading}
                    className={`w-full py-4 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 transition-all active:scale-[0.98]
                        ${isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-yellow-600 hover:shadow-xl'}
                    `}
                >
                    {isLoading ? "Detecting..." : "Allow Location Access"}
                </button>

                {/* Secondary: Manual Entry */}
                <button
                    onClick={handleManualLocation}
                    className="w-full py-4 bg-transparent text-neutral-500 font-semibold hover:text-neutral-800 transition-colors"
                >
                    Enter Location Manually
                </button>
            </div>

        </div>
    );
};

export default LocationAccess;
