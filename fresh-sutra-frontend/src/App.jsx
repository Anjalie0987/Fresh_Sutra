import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import SEO from './components/common/SEO';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary'; // Updated to new component
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

// Lazy Load Pages
const Home = lazy(() => import('./pages/public/Home'));
const Offers = lazy(() => import('./pages/Offers'));
const Login = lazy(() => import('./pages/auth/Login'));
const LocationAccess = lazy(() => import('./pages/public/LocationAccess'));
const NearbyStores = lazy(() => import('./pages/NearbyStores'));
const StoreDetail = lazy(() => import('./pages/StoreDetail'));
const OrderSummary = lazy(() => import('./pages/OrderSummary'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const OrderPlaced = lazy(() => import('./pages/OrderPlaced'));
const JoinUs = lazy(() => import('./pages/public/JoinUs'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const HelpSupport = lazy(() => import('./pages/HelpSupport'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const FssaiCompliance = lazy(() => import('./pages/FssaiCompliance'));

// Loading Fallback Component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
    </div>
);

const RootLayout = () => (
    <AuthProvider>
        <CartProvider>
            <ScrollToTop />
            <SEO
                title="Home"
                description="Welcome to Fresh Sutra - Your destination for fresh, healthy juices."
            />
            {/* Global Error Boundary for the main layout */}
            <ErrorBoundary>
                <MainLayout className="relative">
                    {/* Suspense for Lazy Loaded Pages */}
                    <Suspense fallback={<PageLoader />}>
                        <Outlet />
                    </Suspense>
                </MainLayout>
            </ErrorBoundary>
        </CartProvider>
    </AuthProvider>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorBoundary />, // Catch router-level errors
        children: [
            { index: true, element: <Home /> },
            { path: "offers", element: <Offers /> },
            { path: "login", element: <Login /> },
            { path: "location", element: <LocationAccess /> },
            { path: "stores-near-you", element: <NearbyStores /> },
            { path: "store/:storeId", element: <StoreDetail /> },
            { path: "order-summary", element: <OrderSummary /> },
            { path: "place-order", element: <PlaceOrder /> },
            { path: "order-placed", element: <OrderPlaced /> },
            { path: "order-success", element: <OrderPlaced /> },
            { path: "join-us", element: <JoinUs /> },
            { path: "admin/dashboard", element: <AdminDashboard /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "help", element: <HelpSupport /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "terms-and-conditions", element: <TermsConditions /> },
            { path: "refund-policy", element: <RefundPolicy /> },
            { path: "fssai-compliance", element: <FssaiCompliance /> }
        ]
    }
]);

function App() {
    return (
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    );
}

export default App;
