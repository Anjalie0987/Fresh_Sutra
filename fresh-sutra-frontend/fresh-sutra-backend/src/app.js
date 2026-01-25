import express from "express";
import cors from "cors";

import storeRoutes from "./routes/store.routes.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

// Routes
app.use("/api/stores", storeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Fresh Sutra backend running 🚀",
    });
});

export default app;
