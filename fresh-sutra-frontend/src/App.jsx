import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './components/layout/MainLayout';
import SEO from './components/common/SEO';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <CartProvider>
                    <SEO
                        title="Home"
                        description="Welcome to Fresh Sutra - Your destination for fresh, healthy juices."
                    />
                    <MainLayout className="relative">
                        <AppRoutes />
                    </MainLayout>
                </CartProvider>
            </Router>
        </HelmetProvider>
    );
}

export default App;
