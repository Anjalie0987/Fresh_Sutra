import { useState, useEffect } from 'react';

const useGoogleMaps = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        // If already loaded, set state and return
        if (window.google && window.google.maps) {
            setIsLoaded(true);
            return;
        }

        // Check if script is already present to prevent duplicates
        const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');

        if (existingScript) {
            // If script exists but not loaded, listen for load event
            const handleLoad = () => setIsLoaded(true);
            const handleError = (err) => setLoadError(err);

            existingScript.addEventListener('load', handleLoad);
            existingScript.addEventListener('error', handleError);

            return () => {
                existingScript.removeEventListener('load', handleLoad);
                existingScript.removeEventListener('error', handleError);
            };
        }

        // Create new script tag
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            setLoadError(new Error("Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your environment."));
            console.error("Google Maps API key is missing.");
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        const handleLoad = () => setIsLoaded(true);
        const handleError = (err) => {
            setLoadError(err);
            console.error("Failed to load Google Maps SDK", err);
        };

        script.addEventListener('load', handleLoad);
        script.addEventListener('error', handleError);

        document.body.appendChild(script);

        return () => {
            script.removeEventListener('load', handleLoad);
            script.removeEventListener('error', handleError);
            // We usually don't remove the script on unmount to cache it for other components
        };
    }, []);

    return { isLoaded, loadError };
};

export default useGoogleMaps;
