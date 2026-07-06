import prisma from "../config/prisma.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Haversine formula to calculate distance in km
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export const createStore = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;

        if (!name || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: "Missing required fields: name, latitude, longitude" });
        }

        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: "Latitude and longitude must be numbers" });
        }

        const store = await prisma.store.create({
            data: {
                name,
                latitude,
                longitude,
            },
        });

        res.status(201).json(store);
    } catch (error) {
        console.error("Error creating store:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllStores = async (req, res) => {
    try {
        const stores = await prisma.store.findMany();
        res.status(200).json(stores);
    } catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getNearbyStores = async (req, res) => {
    try {
        const { lat, lng, radius } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ error: "Missing required query parameters: lat, lng" });
        }

        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);
        const radiusKm = radius ? parseFloat(radius) : 10; // Default radius 10km

        if (isNaN(userLat) || isNaN(userLng) || isNaN(radiusKm)) {
            return res.status(400).json({ error: "lat, lng, and radius must be valid numbers" });
        }

        const stores = await prisma.store.findMany();

        const nearbyStores = stores
            .map((store) => {
                const distance = getDistance(userLat, userLng, store.latitude, store.longitude);
                return { ...store, distanceKm: distance };
            })
            .filter((store) => store.distanceKm <= radiusKm)
            .sort((a, b) => a.distanceKm - b.distanceKm);

        res.status(200).json(nearbyStores);
    } catch (error) {
        console.error("Error fetching nearby stores:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Proxy: Google Places Nearby Search
 * GET /api/stores/nearby-juice-stores?lat=...&lng=...
 *
 * Calls Mappls Nearby API from the backend (no CORS issues)
 * and normalizes the response for the frontend.
 */
export const getNearbyJuiceStores = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ error: "Missing required query parameters: lat, lng" });
        }

        if (!GOOGLE_MAPS_API_KEY) {
            console.error("[StoreController] CRITICAL: GOOGLE_MAPS_API_KEY missing in backend .env");
            return res.status(500).json({ error: "Server configuration error: Missing Google Maps API Key" });
        }

        console.log(`[StoreController] Fetching nearby juice stores via Google Maps for ${lat},${lng}`);

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
        const response = await axios.get(url, {
            params: {
                location: `${lat},${lng}`,
                radius: 5000,
                keyword: "juice shop OR fruit juice OR juice bar",
                key: GOOGLE_MAPS_API_KEY
            },
        });

        const data = response.data;
        const places = data.results || [];

        // Normalize to consistent shape for frontend
        const normalizedPlaces = places.map((place) => {
            const distance = getDistance(parseFloat(lat), parseFloat(lng), place.geometry.location.lat, place.geometry.location.lng);
            return {
                id: place.place_id,
                name: place.name || "Unknown Store",
                address: place.vicinity || "",
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
                distanceKm: parseFloat(distance.toFixed(2)),
                distanceMeters: Math.round(distance * 1000),
                rating: place.rating || 0,
                isOpen: place.opening_hours ? place.opening_hours.open_now : true,
                category: place.types ? place.types.join(", ") : "",
                eLoc: place.place_id,
            };
        });
        
        normalizedPlaces.sort((a, b) => a.distanceKm - b.distanceKm);

        console.log(`[StoreController] Found ${normalizedPlaces.length} juice stores via Google Maps`);
        res.status(200).json(normalizedPlaces);
    } catch (error) {
        console.error("[StoreController] Google Places API Error:", error.message);
        if (error.response) {
            console.error("[StoreController] Response Status:", error.response.status);
            console.error("[StoreController] Response Data:", error.response.data);
        }
        res.status(500).json({ error: "Failed to fetch nearby juice stores" });
    }
};

/**
 * Proxy: Google Maps Geocoding
 * GET /api/stores/geocode?query=...
 *
 * Geocodes a text query to lat/lng using Google Geocoding API.
 */
export const geocodeLocation = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim().length < 2) {
            return res.status(400).json({ error: "Query must be at least 2 characters" });
        }

        if (!GOOGLE_MAPS_API_KEY) {
            console.error("[StoreController] CRITICAL: GOOGLE_MAPS_API_KEY missing in backend .env");
            return res.status(500).json({ error: "Server configuration error: Missing Google Maps API Key" });
        }

        console.log(`[StoreController] Geocoding: "${query}"`);

        const url = `https://maps.googleapis.com/maps/api/geocode/json`;
        const response = await axios.get(url, {
            params: { address: query.trim(), key: GOOGLE_MAPS_API_KEY },
        });

        const data = response.data;
        const results = data.results || [];

        if (!results || results.length === 0) {
            return res.status(200).json(null);
        }

        const top = results[0];
        res.status(200).json({
            lat: parseFloat(top.geometry.location.lat),
            lng: parseFloat(top.geometry.location.lng),
            name: top.formatted_address || query,
        });
    } catch (error) {
        console.error("[StoreController] Geocoding Error:", error.message);
        if (error.response) {
            console.error("[StoreController] Response Status:", error.response.status);
            console.error("[StoreController] Response Data:", error.response.data);
        }
        res.status(500).json({ error: "Geocoding failed" });
    }
};
