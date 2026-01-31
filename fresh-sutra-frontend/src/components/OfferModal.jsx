import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { FiX, FiMapPin, FiInfo, FiClock } from 'react-icons/fi';

const OfferModal = ({ offer, onClose }) => {
    const navigate = useNavigate();

    // Handle ESC key press
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!offer) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleExplore = () => {
        onClose();
        navigate('/stores-near-you');
    };

    // Static details for demo purpose
    const staticDetails = [
        { icon: <FiInfo size={16} />, text: "Valid on all Fresh Sutra outlets" },
        { icon: <FiClock size={16} />, text: "Limited time offer" },
        { icon: <FiMapPin size={16} />, text: "Available for dine-in & takeaway" }
    ];

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden transform scale-95 animate-scaleIn transition-all duration-300 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 🔹 Header */}
                <div className={`p-6 pb-4 bg-gradient-to-r ${offer.bgGradient || 'from-gray-50 to-gray-100'} relative`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-gray-600 hover:text-gray-900"
                        aria-label="Close modal"
                    >
                        <FiX size={20} />
                    </button>

                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${offer.badgeColor}`}>
                        {offer.badge}
                    </span>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full shadow-sm">
                            {offer.icon}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 leading-tight">
                            {offer.title}
                        </h2>
                    </div>
                </div>

                {/* 🔹 Body */}
                <div className="p-6 pt-4">
                    <p className="text-gray-600 text-sm font-medium mb-6 leading-relaxed">
                        {offer.description}. Indulge in the freshness of nature with our specially curated offer.
                    </p>

                    <div className="h-px bg-gray-100 w-full mb-6"></div>

                    <div className="space-y-4 mb-8">
                        {staticDetails.map((detail, index) => (
                            <div key={index} className="flex items-center gap-3 text-gray-500 text-sm">
                                <span className="text-secondary">{detail.icon}</span>
                                <span>{detail.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* 🔹 Footer */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleExplore}
                            className="w-full py-3.5 bg-secondary text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-yellow-600 transition-all active:scale-[0.98]"
                        >
                            Explore Nearby Stores
                        </button>
                        <p className="text-center text-xs text-gray-400">
                            Offers may vary by store & location
                        </p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default OfferModal;
