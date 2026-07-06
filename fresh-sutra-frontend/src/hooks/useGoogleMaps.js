import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to dynamically load the Google Maps Map SDK + Places Library.
 * Returns { isLoaded, loadError } so consumers know when the SDK is ready.
 */
const useGoogleMaps = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const loadAttempted = useRef(false);

    useEffect(() => {
        // Already loaded from a previous render or another component
        if (window.google && window.google.maps) {
            setIsLoaded(true);
            return;
        }

        // Prevent duplicate script injection across React strict-mode double mounts
        if (loadAttempted.current) return;
        loadAttempted.current = true;

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            const err = new Error(
                'Google Maps API key is missing. Set VITE_GOOGLE_MAPS_API_KEY in your .env file.'
            );
            setLoadError(err);
            console.error(err.message);
            return;
        }

        // Check for existing scripts (e.g. from HMR)
        const existingMapScript = document.querySelector(
            'script[src*="maps.googleapis.com/maps/api/js"]'
        );
        if (existingMapScript) {
            // Scripts already injected — wait for them
            const checkReady = setInterval(() => {
                if (window.google && window.google.maps) {
                    clearInterval(checkReady);
                    setIsLoaded(true);
                }
            }, 200);
            return () => clearInterval(checkReady);
        }

        const mapScript = document.createElement('script');
        mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        mapScript.async = true;

        mapScript.onload = () => {
            if (window.google && window.google.maps) {
                setIsLoaded(true);
            } else {
                setLoadError(new Error('Google Maps SDK loaded but `window.google.maps` is unavailable.'));
            }
        };

        mapScript.onerror = (err) => {
            setLoadError(err);
            console.error('Failed to load Google Maps SDK', err);
        };

        document.head.appendChild(mapScript);
    }, []);

    return { isLoaded, loadError };
};

export default useGoogleMaps;
