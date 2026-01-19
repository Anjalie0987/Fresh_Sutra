import { useNavigate } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const LocationAccess = () => {
    const navigate = useNavigate();

    const handleEnableLocation = () => {
        // Simulate permission approval
        navigate('/');
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
                    className="w-full py-4 bg-transparent text-neutral-500 font-semibold hover:text-neutral-800 transition-colors"
                >
                    Enter Location Manually
                </button>
            </div>

        </div>
    );
};

export default LocationAccess;
