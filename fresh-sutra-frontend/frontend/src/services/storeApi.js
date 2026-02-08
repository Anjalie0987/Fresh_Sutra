/**
 * Service to interact with Store APIs
 */
import { API_BASE_URL as BASE_URL } from '../config/api';

const API_BASE_URL = `${BASE_URL}/api/stores`;



/**
 * Fetch nearby stores based on coordinates and radius
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} [radius=10] - Search radius in km
 * @returns {Promise<Array>} List of stores
 */
export const fetchNearbyStores = async (lat, lng, radius = 10) => {
    try {
        const response = await fetch(`${API_BASE_URL}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);

        if (!response.ok) {
            console.error("API failed", response.status);
            throw new Error(`Error fetching stores: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Returns array of stores with distanceKm
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};

/**
 * Fetch nearby juice stores from Google Places via Backend
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<Array>} List of Google Places stores
 */
export const fetchNearbyJuiceStores = async (lat, lng) => {
    try {
        const response = await fetch(`${API_BASE_URL}/nearby-juice-stores?lat=${lat}&lng=${lng}`);

        if (!response.ok) {
            console.error("API failed", response.status);
            throw new Error(`Error fetching juice stores: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};
