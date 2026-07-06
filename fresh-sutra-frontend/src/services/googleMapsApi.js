/**
 * Google Maps API Service
 *
 * All REST API calls (nearby, geocode) go through the backend proxy
 * to avoid CORS issues and REST 412 errors with static keys.
 *
 * For Map rendering, we use the client-side Map SDK which
 * authenticates via the VITE_GOOGLE_MAPS_API_KEY.
 */
import { API_BASE_URL as BASE_URL } from '../config/api';

const API_BASE_URL = `${BASE_URL}/api/stores`;

// ─── Nearby Search (via Backend Proxy) ────────────────────────
/**
 * Search for nearby juice stores via the backend Google Places proxy.
 *
 * @param {number} lat  — Latitude
 * @param {number} lng  — Longitude
 * @returns {Promise<Array>} — Array of normalized place objects
 */
export const searchNearbyPlaces = async (lat, lng) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/nearby-juice-stores?lat=${lat}&lng=${lng}`
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Nearby search failed:', response.status, errorData);
            throw new Error(errorData.error || `Nearby search failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Already normalized by backend
    } catch (error) {
        console.error('Nearby search API call failed:', error);
        throw error;
    }
};

// ─── Geocoding (via Backend Proxy) ─────────────────────────────
/**
 * Geocode a text query to lat/lng via the backend Google Geocoding proxy.
 *
 * @param {string} query — Address or place name
 * @returns {Promise<{lat: number, lng: number, name: string} | null>}
 */
export const geocodeAddress = async (query) => {
    if (!query || query.trim().length < 2) return null;

    try {
        const response = await fetch(
            `${API_BASE_URL}/geocode?query=${encodeURIComponent(query.trim())}`
        );

        if (!response.ok) {
            console.error('Geocode failed:', response.status);
            return null;
        }

        const data = await response.json();
        return data; // { lat, lng, name } or null
    } catch (error) {
        console.error('Geocoding failed:', error);
        return null;
    }
};

// ─── Haversine Distance (client-side calculation) ──────────────
/**
 * Calculate approximate distance between two points using the Haversine formula.
 * This runs client-side — no API call needed.
 *
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {{ distanceKm: string, durationMin: string }}
 */
export const getApproxDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;

    // Rough driving estimate: avg 25 km/h in Indian city traffic
    const durationMin = Math.ceil((distanceKm / 25) * 60);

    return {
        distanceKm: distanceKm.toFixed(1),
        durationMin: `${durationMin}`,
    };
};
