import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import LocationAccess from '../pages/public/LocationAccess';
import NearbyStores from '../pages/NearbyStores';
import StoreDetail from '../pages/StoreDetail';
import OrderSummary from '../pages/OrderSummary';
import PlaceOrder from '../pages/PlaceOrder';
import OrderPlaced from '../pages/OrderPlaced';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/location" element={<LocationAccess />} />
            <Route path="/stores-near-you" element={<NearbyStores />} />
            <Route path="/store/:storeId" element={<StoreDetail />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/order-placed" element={<OrderPlaced />} />
        </Routes>
    );
};

export default AppRoutes;
