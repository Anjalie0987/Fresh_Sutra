import { useNavigate } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const LocationAccess = () => {
    const navigate = useNavigate();

    const handleEnableLocation = () => {
        if (!navigator.geolocation) {
            // Fallback if geolocation is not supported
            localStorage.setItem('userLocation', JSON.stringify({ lat: 28.6139, lng: 77.2090 }));
            navigate('/stores-near-you');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const loc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                localStorage.setItem('userLocation', JSON.stringify(loc));
                navigate('/stores-near-you');
            },
            (error) => {
                console.warn("Location access denied/error:", error);
                // Fallback to coordinates
                const fallback = { lat: 28.6139, lng: 77.2090 };
                localStorage.setItem('userLocation', JSON.stringify(fallback));
                navigate('/stores-near-you');
            }
        );
    };

    const handleManualLocation = () => {
        // Static mapping for manual entry (e.g. simulating user chose "New Delhi")
        // Using the same default coordinates for now as per "static mapping is fine"
        const manualLoc = { lat: 28.6139, lng: 77.2090 };
        localStorage.setItem('userLocation', JSON.stringify(manualLoc));
        navigate('/stores-near-you');
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4 text-center">

            {/* Icon Illustration */}
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 animate-bounce transition-all duration-1000">
                <MdLocationOn className="text-secondary text-5xl" />
            </div>

            {/* Content */}
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Enable Location Access
            </h1>
            <p className="text-neutral-500 text-lg max-w-sm mb-10 leading-relaxed">
                We use your location to show fresh juice stores near you.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-xs">
                {/* Primary: Allow Access */}
                <button
                    onClick={handleEnableLocation}
                    className="w-full py-4 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98]"
                >
                    Allow Location Access
                </button>

                {/* Secondary: Manual Entry */}
                <button
                    onClick={handleManualLocation}
                    className="w-full py-4 bg-transparent text-neutral-500 font-semibold hover:text-neutral-800 transition-colors"
                >
                    Enter Location Manually
                </button>
            </div>

        </div>
    );
};

export default LocationAccess;
