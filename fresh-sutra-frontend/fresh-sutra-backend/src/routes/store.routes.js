import express from "express";
import { createStore, getAllStores, getNearbyStores, getNearbyJuiceStores } from "../controllers/store.controller.js";

const router = express.Router();

router.post("/", createStore);
router.get("/", getAllStores);
router.get("/nearby", getNearbyStores);
router.get("/nearby-juice-stores", getNearbyJuiceStores);

export default router;
