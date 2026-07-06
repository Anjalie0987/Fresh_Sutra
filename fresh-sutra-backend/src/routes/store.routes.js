import express from "express";
import { createStore, getAllStores, getNearbyStores, getNearbyJuiceStores, geocodeLocation } from "../controllers/store.controller.js";

const router = express.Router();

router.post("/", createStore);
router.get("/", getAllStores);
router.get("/nearby", getNearbyStores);
router.get("/nearby-juice-stores", getNearbyJuiceStores);
router.get("/geocode", geocodeLocation);

export default router;
