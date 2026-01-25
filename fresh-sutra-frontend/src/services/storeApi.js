/**
 * Service to interact with Store APIs
 */

const API_BASE_URL = 'http://localhost:5000/api/stores';

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
