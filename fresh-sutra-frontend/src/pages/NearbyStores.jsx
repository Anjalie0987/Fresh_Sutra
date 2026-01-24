import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FiList, FiMap, FiCheckCircle, FiSearch, FiAlertCircle } from 'react-icons/fi';
import useGoogleMaps from '../hooks/useGoogleMaps';

import { fetchNearbyStores } from '../services/storeApi';



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



const NearbyStores = () => {
    const [activeView, setActiveView] = useState('list'); // 'list' or 'map'
    const { isLoaded, loadError } = useGoogleMaps();

    // Data States
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStoreId, setSelectedStoreId] = useState(null);

    // Step 7: Route State
    const [routeStoreId, setRouteStoreId] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);

    // Step 5: Location State
    const location = useLocation();
    const [isManualMode, setIsManualMode] = useState(false); // Initialized in useEffect to avoid hydration mismatches if needed, but here simple state is fine
    const [searchLocation, setSearchLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Default for manual map center

    const [userLocation, setUserLocation] = useState(null);
    const [isLocationResolved, setIsLocationResolved] = useState(false);

    // Refs
    const mapRef = useRef(null); // Ref for DIV
    const mapInstanceRef = useRef(null); // Ref for Map Instance
    const directionsRendererRef = useRef(null); // Ref for Renderer (Singleton)
    const searchInputRef = useRef(null); // Ref for Input
    const searchMarkerRef = useRef(null); // Ref for Draggable Marker
    const markersRef = useRef({});
    const itemRefs = useRef({});

    // Initialize Mode from Navigation State
    useEffect(() => {
        if (location.state?.manualLocationMode) {
            setIsManualMode(true);
            setIsLocationResolved(true); // Manually resolved as "selecting..."
        }
    }, [location.state]);

    // Step 5 & 6: Fetch User Location (Check LocalStorage First)
    useEffect(() => {
        // If in manual mode, DO NOT fetch/check location initially. Wait for user confirmation.
        if (location.state?.manualLocationMode || isManualMode) return;

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
            setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Default
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
                setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Fallback
                setIsLocationResolved(true);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }, []);

    // Simulate API Fetch - Trigger ONLY when userLocation is set
    useEffect(() => {
        if (!userLocation) return; // Wait for location

        const loadStores = async () => {
            setIsLoading(true);
            try {
                // Fetch stores from backend with 15km radius
                const data = await fetchNearbyStores(userLocation.lat, userLocation.lng, 15);
                setStores(data);
            } catch (err) {
                console.error("Failed to fetch stores", err);
                setStores([]); // Ensure empty state on error
            } finally {
                setIsLoading(false);
            }
        };

        loadStores();
    }, [userLocation]);

    // Initialize Map (Updated for Manual Mode)
    useEffect(() => {
        // Wait for both SDK loaded AND resolution state
        if (isLoaded && isLocationResolved && mapRef.current && !mapInstanceRef.current) {

            // Determine initial center
            const center = userLocation || searchLocation;

            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                center: center,
                zoom: 13,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                clickableIcons: false,
            });

            // Initialize DirectionsRenderer ONCE
            directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
                map: mapInstanceRef.current,
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: "#4285F4",
                    strokeWeight: 5,
                    strokeOpacity: 0.8,
                },
            });
        }

        // Update Map Center/Markers when mode or location changes
        if (mapInstanceRef.current) {

            // 1. Manual Mode: Show Draggable Marker (Search Pin)
            if (isManualMode) {
                // Clear store markers
                Object.values(markersRef.current).forEach(m => m.setMap(null));
                markersRef.current = {};

                // Clear Route
                if (directionsRendererRef.current) {
                    directionsRendererRef.current.setDirections({ routes: [] });
                }

                // Ensure center is updated
                mapInstanceRef.current.panTo(searchLocation);

                // Create or Update Search Marker
                if (!searchMarkerRef.current) {
                    searchMarkerRef.current = new window.google.maps.Marker({
                        position: searchLocation,
                        map: mapInstanceRef.current,
                        draggable: true,
                        title: "Drag to adjust location",
                        animation: window.google.maps.Animation.DROP,
                    });

                    // Drag Listener
                    searchMarkerRef.current.addListener("dragend", (event) => {
                        const newLat = event.latLng.lat();
                        const newLng = event.latLng.lng();
                        setSearchLocation({ lat: newLat, lng: newLng });
                    });
                } else {
                    searchMarkerRef.current.setPosition(searchLocation);
                    searchMarkerRef.current.setMap(mapInstanceRef.current);
                }

            } else {
                // 2. Normal Mode: Show User Location & Stores
                if (searchMarkerRef.current) {
                    searchMarkerRef.current.setMap(null); // Hide search marker
                    searchMarkerRef.current = null;
                }

                if (userLocation) {
                    // Update Map Center (Only if NO route active)
                    if (!routeStoreId) {
                        mapInstanceRef.current.panTo(userLocation);
                    }

                    // Add/Ensure User Marker
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

                    // Add Backend Store Markers
                    stores.forEach(store => {
                        if (!markersRef.current[store.id]) { // Avoid dupes
                            const marker = new window.google.maps.Marker({
                                position: { lat: store.latitude, lng: store.longitude },
                                map: mapInstanceRef.current,
                                title: store.name,
                                clickable: true,
                            });

                            // Marker Click Listener (Step 4 - Map -> List)
                            marker.addListener("click", () => {
                                setSelectedStoreId(store.id);
                            });

                            markersRef.current[store.id] = marker;
                        }
                    });
                }
            }
        }

    }, [isLoaded, isLocationResolved, isManualMode, userLocation, searchLocation]);


    // Initialize Autocomplete (Only in Manual Mode)
    useEffect(() => {
        if (isLoaded && isManualMode && searchInputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
                fields: ["geometry", "formatted_address"],
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    setSearchLocation({ lat, lng });
                    // Map update handled by main useEffect via searchLocation dependency
                }
            });
        }
    }, [isLoaded, isManualMode]);


    // Confirm Location Logic
    const confirmManualLocation = () => {
        const finalLocation = searchLocation;
        setUserLocation(finalLocation);
        localStorage.setItem('userLocation', JSON.stringify(finalLocation));
        setIsManualMode(false);
        // This will trigger fetchStores via useEffect([userLocation])
    };

    // Handle Selection Sync (Step 4)
    useEffect(() => {
        // Guard clauses
        if (!selectedStoreId || isManualMode) return;

        // Find store data
        const store = stores.find(s => s.id === selectedStoreId);
        if (!store) return;

        if (mapInstanceRef.current && !routeStoreId) {
            mapInstanceRef.current.panTo({ lat: store.latitude, lng: store.longitude });
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
    }, [selectedStoreId, stores, isManualMode]);

    // Function to Calculate Route
    const calculateRoute = (store) => {
        if (!userLocation || !directionsRendererRef.current) return;

        // Ensure renderer is attached to map
        if (directionsRendererRef.current.getMap() !== mapInstanceRef.current) {
            directionsRendererRef.current.setMap(mapInstanceRef.current);
        }

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
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
                    console.error("Directions request failed:", status);
                    setRouteInfo(null);
                }
            }
        );
    };

    const handleViewStore = (e, store) => {
        e.stopPropagation();
        setSelectedStoreId(store.id);
        setRouteStoreId(store.id);
        calculateRoute(store);
    };

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
                        {isManualMode ? (
                            // MANUAL MODE UI
                            <div className="mb-6">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    Enter Location
                                </h1>
                                <p className="text-gray-500 text-sm mb-6">
                                    Search or drag the pin to set your delivery location.
                                </p>

                                {/* Search Input */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiSearch className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Search for a location..."
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none shadow-sm transition-all"
                                    />
                                </div>

                                {/* Confirm Button */}
                                <button
                                    onClick={confirmManualLocation}
                                    className="w-full py-3.5 bg-secondary text-white font-bold rounded-xl shadow-lg hover:bg-yellow-600 transition-all transform active:scale-[0.98]"
                                >
                                    Confirm Location
                                </button>
                            </div>
                        ) : (
                            // NORMAL MODE UI
                            <div className="mb-6">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    Juice Stores Near You
                                </h1>
                                <p className="text-gray-500 text-sm">
                                    Find the closest Fresh Sutra outlet and order fresh.
                                </p>
                            </div>
                        )}

                        {/* CONTENT STATES - Only show list if NOT in manual mode */}
                        {!isManualMode && (
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
                                                    {store.distanceKm ? `${store.distanceKm.toFixed(1)} km away` : 'Calculating...'}
                                                </span>
                                            </div>

                                            {store.isFSSAI && (
                                                <div className="flex items-center gap-1.5 text-green-600 mb-4">
                                                    <FiCheckCircle size={14} />
                                                    <span className="text-xs font-semibold uppercase tracking-wide">FSSAI Verified</span>
                                                </div>
                                            )}

                                            <div className="space-y-3">
                                                {/* Route Info Overlay - Only if this card is the routed one */}
                                                {routeStoreId === store.id && routeInfo && (
                                                    <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-lg flex items-center justify-between text-sm">
                                                        <span className="text-secondary font-bold">{routeInfo.distance}</span>
                                                        <span className="text-gray-500">•</span>
                                                        <span className="text-gray-700 font-medium">{routeInfo.duration} to get there</span>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={(e) => handleViewStore(e, store)}
                                                    className={classNames(
                                                        "w-full py-2 rounded-lg text-sm font-semibold transition-colors",
                                                        selectedStoreId === store.id
                                                            ? "bg-secondary text-white hover:bg-yellow-600 shadow-sm"
                                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                                    )}
                                                >
                                                    {routeStoreId === store.id ? "View Store" : "View Store"}
                                                </button>
                                            </div>
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
                        )}
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
