import prisma from "../config/prisma.js";

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
