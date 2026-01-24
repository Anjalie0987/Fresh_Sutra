import express from "express";
import cors from "cors";

import storeRoutes from "./routes/store.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/stores", storeRoutes);

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Fresh Sutra backend running 🚀",
    });
});

export default app;
