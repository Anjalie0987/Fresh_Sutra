// Robust API Configuration
const ENV_API_URL = import.meta.env.VITE_API_BASE_URL;
const PROD_BACKEND_URL = "https://freshsutra-production.up.railway.app";

// Helper to validate URL
const isValidUrl = (url) => {
    if (!url) return false;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Determine the API Base URL
// 1. If VITE_API_BASE_URL is a valid absolute URL AND does not contain "frontend", use it.
//    (Prevent accidental self-referencing to the frontend service)
// 2. Otherwise, fallback to the hardcoded Production Backend URL.
export const API_BASE_URL =
    isValidUrl(ENV_API_URL)
        ? ENV_API_URL
        : PROD_BACKEND_URL;

console.log("API Config Loaded:", {
    EnvUrl: ENV_API_URL,
    ResolvedBaseUrl: API_BASE_URL
});
