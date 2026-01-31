import express from "express";
import cors from "cors";

import storeRoutes from "./routes/store.routes.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

const app = express();

/* =========================
   🔥 FIX FOR MOBILE CORS
   ========================= */

// Explicit CORS + Preflight handling
app.use(cors({
    origin: true,
    credentials: true,
}));

// Body parsers (MUST be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   Routes
   ========================= */

app.use("/api/stores", storeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/reports", reportsRoutes);

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Fresh Sutra backend running 🚀",
    });
});

export default app;
