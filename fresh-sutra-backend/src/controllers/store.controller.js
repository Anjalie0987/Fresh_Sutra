import prisma from "../config/prisma.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

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

export const getNearbyJuiceStores = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ error: "Missing required query parameters: lat, lng" });
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        // Debug Log (Masked Key)
        console.log(`[StoreController] Fetching nearby juice stores for ${lat},${lng}`);
        console.log(`[StoreController] API Key Present: ${!!apiKey}`);

        if (!apiKey) {
            console.error("[StoreController] CRITICAL: Google Maps API Key missing in backend .env");
            return res.status(500).json({ error: "Server configuration error: Missing API Key" });
        }

        const radius = 1500; // 1.5 km
        const keyword = "juice";
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        // Check for Google API specific error statuses
        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            console.error("[StoreController] Google Places API Error:", data);
            return res.status(500).json({
                error: `Google API Error: ${data.status}`,
                details: data.error_message || "No details provided"
            });
        }

        const places = data.results.map(place => ({
            id: place.place_id,
            name: place.name,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            rating: place.rating || 0,
            address: place.vicinity,
            isOpen: place.opening_hours?.open_now,
            placeId: place.place_id
        }));

        res.status(200).json(places);

    } catch (error) {
        console.error("[StoreController] Backend Crash/Network Error:", error.message);
        if (error.response) {
            console.error("[StoreController] Response Data:", error.response.data);
        }
        res.status(500).json({ error: "Failed to fetch nearby stores due to server error" });
    }
};
