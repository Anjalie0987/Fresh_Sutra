import express from "express";
import { createStore, getAllStores, getNearbyStores } from "../controllers/store.controller.js";

const router = express.Router();

router.post("/", createStore);
router.get("/", getAllStores);
router.get("/nearby", getNearbyStores);

export default router;
