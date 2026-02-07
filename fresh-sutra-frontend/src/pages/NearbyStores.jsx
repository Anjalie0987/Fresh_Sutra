import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FiList, FiMap, FiNavigation, FiSearch, FiArrowLeft, FiStar, FiMapPin, FiChevronDown, FiChevronUp, FiX, FiCheck } from 'react-icons/fi';
import useGoogleMaps from '../hooks/useGoogleMaps';
import { fetchNearbyJuiceStores } from '../services/storeApi';
import AdSlot from '../components/AdSlot';
import { getShuffledMenuForVendor } from '../utils/menuUtils';
import { formatPrice } from '../data/commonMenu';

const NearbyStores = () => {
    // Layout State
    const [activeView, setActiveView] = useState('both'); // 'list', 'map', 'both' (desktop)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Data State
    const [userLocation, setUserLocation] = useState(null);
    const [isManualMode, setIsManualMode] = useState(false);
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Interaction State
    const [selectedStore, setSelectedStore] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);

    // Helper: Category Icons
    const getCategoryIcon = (id) => {
        const icons = {
            classic_fruit: '🍊',
            summer_coolers: '🏖️',
            seasonal_specials: '🥭',
            healthy_detox: '🥕',
            green_fitness: '🌿',
        };
        return icons[id] || '🥤';
    };

    // Refs
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});
    const directionsServiceRef = useRef(null);
    const directionsRendererRef = useRef(null);
    const storeListRef = useRef(null);
    const storeItemRefs = useRef({});
    const autocompleteInputRef = useRef(null);
    const autocompleteInstanceRef = useRef(null);

    // Hooks
    const { isLoaded } = useGoogleMaps();
    const navigate = useNavigate();
    const location = useLocation();

    // Responsive Handler
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setActiveView('both');
            else if (activeView === 'both') setActiveView('list');
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Init
        return () => window.removeEventListener('resize', handleResize);
    }, [activeView]);

    // 1. Initial Logic: Check Navigation State or Local Storage
    useEffect(() => {
        const init = async () => {
            // Did user click "Enter Location Manually"?
            if (location.state?.manualLocationMode) {
                setIsManualMode(true);
                setIsLoading(false); // Waiting for user input
                return;
            }

            // Normal Flow: Check Local Storage
            const savedLoc = localStorage.getItem('userLocation');
            if (!savedLoc) {
                navigate('/location'); // Redirect if no location
                return;
            }

            try {
                const parsedLoc = JSON.parse(savedLoc);
                await handleLocationUpdate(parsedLoc);
            } catch (err) {
                console.error("Failed to parse location:", err);
                navigate('/location');
            }
        };

        if (isLoaded) init(); // Only start when Google Maps is ready (helpful for types)
    }, [navigate, location.state, isLoaded]);

    // Helper: Update Location & Fetch Stores
    const handleLocationUpdate = async (loc) => {
        setUserLocation(loc);
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchNearbyJuiceStores(loc.lat, loc.lng);
            setStores(data);

            // If in manual mode, once we have data, we can optionally switch view
            // keeping isManualMode true allows us to show the "Search again" bar easily if we want
        } catch (err) {
            console.error("Failed to load stores:", err);
            setError("Failed to load nearby stores. Please try again.");
            setStores([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Initialize Map & Autocomplete
    useEffect(() => {
        if (!isLoaded) return;

        // -- Map Setup --
        // Initialize if we have a userLocation OR if we are in manual mode (fallback to default)
        if (mapRef.current && !mapInstanceRef.current && (userLocation || isManualMode)) {
            // Default to Indiranagar, Bangalore if no location found
            const DEFAULT_LOCATION = { lat: 12.9716, lng: 77.5946 };
            const initialCenter = userLocation || DEFAULT_LOCATION;

            const map = new window.google.maps.Map(mapRef.current, {
                center: initialCenter,
                zoom: 14,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                clickableIcons: false,
                styles: [
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]
                    }
                ]
            });

            mapInstanceRef.current = map;
            directionsServiceRef.current = new window.google.maps.DirectionsService();
            directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
                map: map,
                suppressMarkers: true,
                polylineOptions: { strokeColor: "#1A73E8", strokeWeight: 5 },
            });

            // User Marker (Only if we have a real user location)
            if (userLocation) {
                markersRef.current.userMarker = new window.google.maps.Marker({
                    position: userLocation,
                    map: map,
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeColor: "white",
                        strokeWeight: 2,
                    },
                    title: "Your Location"
                });
            }
        }
        // Update Map Center & Marker if location changes
        else if (mapInstanceRef.current && userLocation) {
            mapInstanceRef.current.panTo(userLocation);

            // Create or Update User Marker
            if (!markersRef.current.userMarker) {
                markersRef.current.userMarker = new window.google.maps.Marker({
                    position: userLocation,
                    map: mapInstanceRef.current,
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeColor: "white",
                        strokeWeight: 2,
                    },
                    title: "Your Location"
                });
            } else {
                markersRef.current.userMarker.setPosition(userLocation);
            }
        }

        // -- Autocomplete Setup (Only when input is visible) --
        if (isManualMode && autocompleteInputRef.current && !autocompleteInstanceRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
                fields: ["geometry", "name"],
                types: ["geocode", "establishment"]
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    setError("Please select a valid location from the list.");
                    return;
                }

                const newLoc = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };

                handleLocationUpdate(newLoc);
                // Optionally exit manual mode UI if we want to hide search bar, 
                // but usually better to keep search bar accessible or switch to 'results' view
                // For now, checks requirement: "Display store cards... (same UI as live location)"
                // We'll keep manual mode TRUE but if we have stores, show the list.
            });

            autocompleteInstanceRef.current = autocomplete;
        }

    }, [isLoaded, userLocation, isManualMode]);


    // 3. Update Markers when Stores Change
    useEffect(() => {
        if (!mapInstanceRef.current || stores.length === 0) return;

        // Clear existing markers
        Object.values(markersRef.current).forEach(marker => marker.setMap(null));
        markersRef.current = {};

        // Create new markers
        stores.forEach(store => {
            const marker = new window.google.maps.Marker({
                position: { lat: store.latitude, lng: store.longitude },
                map: mapInstanceRef.current,
                title: store.name,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
            });

            marker.addListener("click", () => handleStoreSelect(store));
            markersRef.current[store.id] = marker;
        });

    }, [stores]);

    // Handler: Select Store
    const handleStoreSelect = (store) => {
        setSelectedStore(store);

        // Shuffle Categories
        const shuffled = getShuffledMenuForVendor(store.id);
        setMenuData(shuffled);
        if (shuffled.length > 0) setExpandedCategory(shuffled[0].categoryId);

        if (isMobile) setActiveView('map');
        if (!isMobile && storeItemRefs.current[store.id]) {
            storeItemRefs.current[store.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        calculateRoute(store);
    };

    // Toggle Accordion
    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    // Logic: Calculate Route
    const calculateRoute = (store) => {
        if (!directionsServiceRef.current || !directionsRendererRef.current || !userLocation) return;

        directionsServiceRef.current.route(
            {
                origin: userLocation,
                destination: { lat: store.latitude, lng: store.longitude },
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    directionsRendererRef.current.setDirections(result);
                    const leg = result.routes[0].legs[0];
                    setRouteInfo({
                        distance: leg.distance.text,
                        duration: leg.duration.text
                    });
                } else {
                    console.error("Directions request failed due to " + status);
                }
            }
        );
    };

    // UI: View Menu Modal
    const toggleMenu = (e) => {
        if (e) e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] bg-white overflow-hidden relative">

            {/* Header (Mobile Only) */}
            <div className="md:hidden flex items-center justify-between p-3 border-b bg-white z-20 shadow-sm">
                <button
                    onClick={() => setActiveView('list')}
                    className={classNames("flex-1 py-2 text-sm font-bold rounded-l-lg border", activeView === 'list' ? "bg-secondary text-white" : "bg-gray-50")}
                >
                    List
                </button>
                <button
                    onClick={() => setActiveView('map')}
                    className={classNames("flex-1 py-2 text-sm font-bold rounded-r-lg border", activeView === 'map' ? "bg-secondary text-white" : "bg-gray-50")}
                >
                    Map
                </button>
            </div>

            <div className="flex flex-grow overflow-hidden relative">

                {/* 1. LIST PANEL (Left) */}
                <div className={classNames(
                    "w-full md:w-[35%] lg:w-[400px] h-full overflow-y-auto bg-white z-10 transition-transform duration-300 absolute md:relative border-r border-gray-200 custom-scrollbar flex flex-col",
                    (isMobile && activeView !== 'list') ? "-translate-x-full" : "translate-x-0"
                )}>
                    {/* Search Bar (Only visible in Manual Mode OR if user wants to change loc) */}
                    {(isManualMode) && (
                        <div className="p-4 border-b bg-gray-50 sticky top-0 z-20">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                Search Location
                            </label>
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    ref={autocompleteInputRef}
                                    type="text"
                                    placeholder="Enter area, landmark..."
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}

                    <div className="p-4 flex-grow">
                        {/* Header: Stores or "Enter Location" prompt */}
                        {!userLocation && isManualMode ? (
                            <div className="text-center py-10 opacity-60">
                                <FiMapPin className="mx-auto text-4xl text-gray-300 mb-3" />
                                <p>Enter a location above to find stores</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-800 mb-1">Nearby Juice Stores</h1>
                                        <p className="text-sm text-gray-500">Found {stores.length} fresh spots</p>
                                    </div>
                                    {!isManualMode && (
                                        <button
                                            onClick={() => { setIsManualMode(true); setTimeout(() => autocompleteInputRef.current?.focus(), 100); }}
                                            className="text-xs font-bold text-secondary underline"
                                        >
                                            Change
                                        </button>
                                    )}
                                </div>

                                {isLoading && (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
                                        ))}
                                    </div>
                                )}

                                {error && (
                                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-4" ref={storeListRef}>
                                    {stores.map((store) => (
                                        <div
                                            key={store.id}
                                            ref={el => storeItemRefs.current[store.id] = el}
                                            className={classNames(
                                                "border rounded-xl p-4 transition-all cursor-pointer hover:shadow-md",
                                                selectedStore?.id === store.id ? "border-secondary ring-1 ring-secondary bg-orange-50/20" : "border-gray-100"
                                            )}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{store.name}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">{store.address}</p>

                                                    {store.rating > 0 && (
                                                        <div className="flex items-center gap-1 mt-2">
                                                            <FiStar className="text-yellow-400 fill-current" size={14} />
                                                            <span className="text-sm font-semibold text-gray-700">{store.rating}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {store.isOpen && (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                        OPEN
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="grid grid-cols-2 gap-3 mt-4">
                                                <button
                                                    onClick={() => handleStoreSelect(store)}
                                                    className="py-2 px-3 bg-secondary text-white text-sm font-bold rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <FiNavigation size={14} />
                                                    View Loction
                                                </button>
                                                <button
                                                    onClick={toggleMenu}
                                                    className="py-2 px-3 border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    View Menu
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* 2. MAP PANEL (Right) */}
                <div className={classNames(
                    "w-full md:flex-1 h-full bg-gray-100 absolute md:relative transition-transform duration-300",
                    (isMobile && activeView !== 'map') ? "translate-x-full" : "translate-x-0"
                )}>
                    {/* Route Info Overlay */}
                    {routeInfo && selectedStore && (
                        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 bg-white p-3 rounded-xl shadow-lg z-10 md:min-w-[200px] border-l-4 border-secondary">
                            <h4 className="font-bold text-gray-800 text-sm">{selectedStore.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-lg font-bold text-secondary">{routeInfo.duration}</span>
                                <span className="text-gray-400 text-sm">({routeInfo.distance})</span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedStore.latitude},${selectedStore.longitude}&travelmode=driving`;
                                    window.open(url, '_blank');
                                }}
                                className="mt-2 py-1.5 px-3 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-full text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 max-w-[120px]"
                            >
                                <FiNavigation size={12} />
                                Let's Go...
                            </button>
                        </div>
                    )}

                    <div ref={mapRef} className="w-full h-full" />
                </div>

            </div>

            {/* View Menu Modal (Redesigned) */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity" onClick={toggleMenu}>
                    <div
                        className="bg-white rounded-[20px] w-full max-w-[460px] max-h-[85vh] md:max-h-[80vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white rounded-t-[20px] sticky top-0 z-20">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    fresh menu
                                </h2>
                                <p className="text-xs text-secondary font-medium mt-1">
                                    ₹60 per glass (standard size)
                                </p>
                            </div>
                            <button
                                onClick={toggleMenu}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto custom-scrollbar flex-grow p-4 space-y-3">
                            {menuData.map((category) => {
                                const isExpanded = expandedCategory === category.categoryId;
                                return (
                                    <div key={category.categoryId} className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300">
                                        {/* Accordion Header */}
                                        <button
                                            onClick={() => toggleCategory(category.categoryId)}
                                            className={classNames(
                                                "w-full flex items-center justify-between p-4 text-left transition-colors",
                                                isExpanded ? "bg-orange-50/50" : "bg-white hover:bg-gray-50"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{getCategoryIcon(category.categoryId)}</span>
                                                <span className={classNames("text-sm font-bold", isExpanded ? "text-gray-900" : "text-gray-700")}>
                                                    {category.categoryName}
                                                </span>
                                            </div>
                                            {isExpanded ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                                        </button>

                                        {/* Accordion Body */}
                                        <div className={classNames(
                                            "overflow-hidden transition-[max-height] duration-300 ease-in-out",
                                            isExpanded ? "max-h-[500px]" : "max-h-0"
                                        )}>
                                            <div className="p-4 pt-0 bg-white space-y-4">
                                                <div className="h-px bg-gray-50 mx-4 mb-4" /> {/* Divider */}

                                                {category.items.map((item) => (
                                                    <div key={item.itemId} className="flex justify-between items-start group">
                                                        <div className="pr-4">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-semibold text-gray-800 text-[15px]">
                                                                    {item.name}
                                                                </h4>
                                                                {item.isHealthy && (
                                                                    <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100">
                                                                        <FiCheck size={8} /> HEALTHY
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[13px] text-gray-500 mt-1 leading-snug">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <span className="text-sm font-bold text-secondary whitespace-nowrap bg-orange-50 px-2 py-1 rounded-md">
                                                            {formatPrice(category.price)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NearbyStores;
