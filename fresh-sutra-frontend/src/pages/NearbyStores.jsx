import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { FiList, FiMap, FiCheckCircle, FiSearch, FiAlertCircle } from 'react-icons/fi';
import useGoogleMaps from '../hooks/useGoogleMaps';

// Mock Data (Moved outside to simulate API response source)
const MOCK_STORES = [
    { id: 1, name: 'Juice Junction', distance: '0.8 km away', isFSSAI: true, lat: 28.4600, lng: 77.0270 },
    { id: 2, name: 'Fresh Sip Corner', distance: '1.2 km away', isFSSAI: true, lat: 28.4580, lng: 77.0250 },
    { id: 3, name: 'Green Delight Juices', distance: '2.5 km away', isFSSAI: true, lat: 28.4620, lng: 77.0280 },
    { id: 4, name: 'Daily Fresh Bar', distance: '3.1 km away', isFSSAI: true, lat: 28.4550, lng: 77.0240 },
    { id: 5, name: 'Nature Sip House', distance: '4.0 km away', isFSSAI: true, lat: 28.4650, lng: 77.0300 },
];

const StoreCardSkeleton = () => (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm animate-pulse">
        <div className="flex justify-between items-start mb-2">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-5 bg-gray-100 rounded w-16"></div>
        </div>
        <div className="h-4 bg-gray-100 rounded w-24 mb-4"></div>
        <div className="h-9 bg-gray-200 rounded-lg w-full"></div>
    </div>
);

// Static Store Data for Step 3 & 4 (Enriched with UI fields)
const STATIC_MAP_STORES = [
    {
        id: "store-1",
        name: "Fresh Sutra – Connaught Place",
        lat: 28.6315,
        lng: 77.2167,
        distance: "2.5 km",
        isFSSAI: true
    },
    {
        id: "store-2",
        name: "Fresh Sutra – Karol Bagh",
        lat: 28.6519,
        lng: 77.1907,
        distance: "4.8 km",
        isFSSAI: true
    },
    {
        id: "store-3",
        name: "Fresh Sutra – Lajpat Nagar",
        lat: 28.5672,
        lng: 77.2433,
        distance: "6.2 km",
        isFSSAI: true
    }
];

const NearbyStores = () => {
    const [activeView, setActiveView] = useState('list'); // 'list' or 'map'
    const { isLoaded, loadError } = useGoogleMaps();

    // Data States
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStoreId, setSelectedStoreId] = useState(null);

    // Step 5: Location State
    const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Default Delhi
    const [isLocationResolved, setIsLocationResolved] = useState(false);

    // Refs
    const mapRef = useRef(null); // Ref for DIV
    const mapInstanceRef = useRef(null); // Ref for Map Instance
    const markersRef = useRef({});
    const itemRefs = useRef({});

    // Step 5 & 6: Fetch User Location (Check LocalStorage First)
    useEffect(() => {
        // Step 6: Check LocalStorage
        const savedLoc = localStorage.getItem('userLocation');
        if (savedLoc) {
            try {
                setUserLocation(JSON.parse(savedLoc));
                setIsLocationResolved(true);
                return; // precise return to avoid re-fetching
            } catch (e) {
                console.error("Error parsing saved location", e);
                localStorage.removeItem('userLocation');
            }
        }

        // Step 5: Fallback to Browser Logic if no saved location
        if (!navigator.geolocation) {
            setIsLocationResolved(true);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setIsLocationResolved(true);
            },
            (error) => {
                console.warn("Location permission denied or error:", error);
                setIsLocationResolved(true); // Fallback to default
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }, []);

    // Simulate API Fetch
    useEffect(() => {
        const fetchStores = async () => {
            setIsLoading(true);
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
                setStores(STATIC_MAP_STORES);
            } catch (err) {
                console.error("Failed to fetch stores", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStores();
    }, []);

    // Initialize Map (Updated for Step 5)
    useEffect(() => {
        // Wait for both SDK loaded AND Location resolved
        if (isLoaded && isLocationResolved && mapRef.current && !mapInstanceRef.current) {

            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                center: userLocation, // Dynamic Center
                zoom: 13,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                clickableIcons: false,
            });

            // Add User Location Marker (Dynamic Position)
            new window.google.maps.Marker({
                position: userLocation,
                map: mapInstanceRef.current,
                title: "You are here",
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeColor: "white",
                    strokeWeight: 2,
                },
            });

            // Add Static Store Markers (Step 3 & 4)
            STATIC_MAP_STORES.forEach(store => {
                const marker = new window.google.maps.Marker({
                    position: { lat: store.lat, lng: store.lng },
                    map: mapInstanceRef.current,
                    title: store.name,
                    clickable: true,
                });

                // Marker Click Listener (Step 4 - Map -> List)
                marker.addListener("click", () => {
                    setSelectedStoreId(store.id);
                });

                markersRef.current[store.id] = marker;
            });
        }
    }, [isLoaded, isLocationResolved]); // Added userLocation dependency implicitly via isLocationResolved logic (run once when resolved)

    // Handle Selection Sync (Step 4)
    useEffect(() => {
        // Guard clauses
        if (!selectedStoreId) return;

        // Find store data
        const store = stores.find(s => s.id === selectedStoreId);
        if (!store) return;

        // 1. Pan Map to Store (List -> Map)
        if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo({ lat: store.lat, lng: store.lng });
            mapInstanceRef.current.setZoom(14); // Optional zoom in
        }

        // 2. Highlight Marker (List -> Map)
        if (markersRef.current) {
            Object.keys(markersRef.current).forEach(id => {
                const marker = markersRef.current[id];
                if (marker) {
                    if (id === selectedStoreId) {
                        marker.setAnimation(window.google.maps.Animation.BOUNCE);
                        setTimeout(() => marker.setAnimation(null), 1500);
                    } else {
                        marker.setAnimation(null);
                    }
                }
            });
        }

        // 3. Scroll List to Item (Map -> List)
        const el = itemRefs.current[selectedStoreId];
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedStoreId, stores]);

    const handleStoreClick = (storeId) => {
        setSelectedStoreId(storeId);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] overflow-hidden bg-white">

            {/* MOBILE TOGGLE */}
            <div className="md:hidden flex items-center justify-between p-3 gap-3 border-b border-gray-200 bg-white z-20 sticky top-0 shadow-sm">
                <button
                    onClick={() => setActiveView('list')}
                    className={classNames(
                        "flex-1 py-2.5 px-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-200 rounded-full",
                        activeView === 'list'
                            ? "bg-secondary text-white shadow-md transform scale-105"
                            : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                    )}
                >
                    <FiList size={18} />
                    List View
                </button>
                <button
                    onClick={() => setActiveView('map')}
                    className={classNames(
                        "flex-1 py-2.5 px-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-200 rounded-full",
                        activeView === 'map'
                            ? "bg-secondary text-white shadow-md transform scale-105"
                            : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                    )}
                >
                    <FiMap size={18} />
                    Map View
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-grow flex relative overflow-hidden">

                {/* LEFT PANEL: LIST */}
                <div
                    className={classNames(
                        "w-full md:w-[40%] bg-white h-full overflow-y-auto custom-scrollbar transition-transform duration-300 absolute md:relative z-10",
                        activeView === 'list' ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    )}
                >
                    <div className="p-4 md:p-6 lg:p-8 min-h-full">
                        <div className="mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                Juice Stores Near You
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Find the closest Fresh Sutra outlet and order fresh.
                            </p>
                        </div>

                        {/* CONTENT STATES */}
                        <div className="space-y-4">
                            {isLoading ? (
                                // LOADING SKELETONS
                                <>
                                    <StoreCardSkeleton />
                                    <StoreCardSkeleton />
                                    <StoreCardSkeleton />
                                    <StoreCardSkeleton />
                                </>
                            ) : stores.length > 0 ? (
                                // STORE LIST
                                stores.map((store) => (
                                    <div
                                        key={store.id}
                                        ref={el => itemRefs.current[store.id] = el}
                                        onClick={() => handleStoreClick(store.id)}
                                        className={classNames(
                                            "bg-white border rounded-xl p-5 shadow-sm transition-all duration-200 cursor-pointer group",
                                            selectedStoreId === store.id
                                                ? "border-secondary ring-1 ring-secondary shadow-md bg-orange-50/10"
                                                : "border-gray-100 hover:shadow-md hover:border-gray-200"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={classNames(
                                                "text-lg font-bold transition-colors",
                                                selectedStoreId === store.id ? "text-secondary" : "text-gray-800 group-hover:text-secondary"
                                            )}>
                                                {store.name}
                                            </h3>
                                            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                                {store.distance}
                                            </span>
                                        </div>

                                        {store.isFSSAI && (
                                            <div className="flex items-center gap-1.5 text-green-600 mb-4">
                                                <FiCheckCircle size={14} />
                                                <span className="text-xs font-semibold uppercase tracking-wide">FSSAI Verified</span>
                                            </div>
                                        )}

                                        <button className={classNames(
                                            "w-full py-2 rounded-lg text-sm font-semibold transition-colors",
                                            selectedStoreId === store.id
                                                ? "bg-secondary text-white hover:bg-yellow-600 shadow-sm"
                                                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                        )}>
                                            View Store
                                        </button>
                                    </div>
                                ))
                            ) : (
                                // EMPTY STATE
                                <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/50">
                                    <FiSearch className="mx-auto text-gray-300 mb-3" size={48} />
                                    <h3 className="text-lg font-semibold text-gray-700 mb-1">No stores found</h3>
                                    <p className="text-gray-500 text-sm">We couldn't find any juice stores near your location.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: MAP */}
                <div
                    className={classNames(
                        "w-full md:w-[60%] bg-gray-100 h-full absolute md:relative transition-transform duration-300",
                        activeView === 'map' ? "translate-x-0 z-20" : "translate-x-full md:translate-x-0 z-0"
                    )}
                >
                    {!isLoaded || !isLocationResolved ? ( // Updated Loading Condition
                        <div className="w-full h-full flex items-center justify-center bg-gray-100/80 text-gray-400 font-medium border-l border-gray-200">
                            <div className="text-center">
                                <p>Loading map...</p>
                                {loadError && (
                                    <div className="mt-4 flex flex-col items-center text-red-500">
                                        <FiAlertCircle size={24} className="mb-2" />
                                        <span className="text-sm font-semibold">Map unavailable</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div ref={mapRef} className="w-full h-full" />
                    )}
                </div>

            </div>
        </div>
    );
};

export default NearbyStores;
