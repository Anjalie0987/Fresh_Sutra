import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import LocationAccess from '../pages/public/LocationAccess';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/location" element={<LocationAccess />} />
        </Routes>
    );
};

export default AppRoutes;
