import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import SEO from './components/common/SEO';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

// Page Imports
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import LocationAccess from './pages/public/LocationAccess';
import NearbyStores from './pages/NearbyStores';
import StoreDetail from './pages/StoreDetail';
import OrderSummary from './pages/OrderSummary';
import PlaceOrder from './pages/PlaceOrder';
import OrderPlaced from './pages/OrderPlaced';
import JoinUs from './pages/public/JoinUs';
import AdminDashboard from './pages/admin/Dashboard';

const RootLayout = () => (
    <AuthProvider>
        <CartProvider>
            <SEO
                title="Home"
                description="Welcome to Fresh Sutra - Your destination for fresh, healthy juices."
            />
            <MainLayout className="relative">
                <Outlet />
            </MainLayout>
        </CartProvider>
    </AuthProvider>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "location", element: <LocationAccess /> },
            { path: "stores-near-you", element: <NearbyStores /> },
            { path: "store/:storeId", element: <StoreDetail /> },
            { path: "order-summary", element: <OrderSummary /> },
            { path: "place-order", element: <PlaceOrder /> },
            { path: "order-placed", element: <OrderPlaced /> },
            { path: "order-success", element: <OrderPlaced /> },
            { path: "join-us", element: <JoinUs /> },
            { path: "admin/dashboard", element: <AdminDashboard /> }
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
