import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import {
    FiNavigation, FiSearch, FiStar, FiMapPin,
    FiChevronDown, FiChevronUp, FiX, FiCheck, FiLoader
} from 'react-icons/fi';
import useGoogleMaps from '../hooks/useGoogleMaps';
import { searchNearbyPlaces, geocodeAddress, getApproxDistance } from '../services/googleMapsApi';
import { getShuffledMenuForVendor } from '../utils/menuUtils';
import { formatPrice } from '../data/commonMenu';

const DEFAULT_LOCATION = { lat: 28.6139, lng: 77.2090 }; // Delhi fallback

const NearbyStores = () => {
    // ─── Layout State ──────────────────────────────────────
    const [activeView, setActiveView] = useState('both');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // ─── Data State ────────────────────────────────────────
    const [userLocation, setUserLocation] = useState(null);
    const [isManualMode, setIsManualMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMapLoading, setIsMapLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    // ─── Interaction State ─────────────────────────────────
    const [selectedStore, setSelectedStore] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);

    // ─── Refs (Persistent — survive re-renders) ────────────
    const mapContainerRef = useRef(null);      // DOM node for map
    const mapInstanceRef = useRef(null);        // Mappls Map instance — persisted!
    const userMarkerRef = useRef(null);         // User location marker
    const storeMarkersRef = useRef([]);         // Array of store markers
    const storeListRef = useRef(null);
    const storeItemRefs = useRef({});
    const searchInputRef = useRef(null);
    const autocompleteInstanceRef = useRef(null);

    // ─── Hooks ─────────────────────────────────────────────
    const { isLoaded, loadError } = useGoogleMaps();
    const navigate = useNavigate();
    const location = useLocation();

    // ─── Responsive Handler ────────────────────────────────
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setActiveView('both');
            else if (activeView === 'both') setActiveView('list');
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [activeView]);

    // ─── Helper: Fetch nearby stores via Backend Proxy ───
    const fetchStores = useCallback(async (loc) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await searchNearbyPlaces(loc.lat, loc.lng);
            setStores(data);
            if (data.length === 0) {
                setError('No juice shops found nearby. Try a different location.');
            }
        } catch (err) {
            console.error('Failed to load stores:', err);
            setError('Failed to load nearby stores. Please try again.');
            setStores([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ─── 1. Initial Logic — check nav state or localStorage ─
    useEffect(() => {
        if (!isLoaded) return;

        const init = async () => {
            // Manual location mode from navigation state
            if (location.state?.manualLocationMode) {
                setIsManualMode(true);
                setIsLoading(false);
                return;
            }

            // Normal flow: check localStorage
            const savedLoc = localStorage.getItem('userLocation');
            if (!savedLoc) {
                navigate('/location');
                return;
            }

            try {
                const parsedLoc = JSON.parse(savedLoc);
                setUserLocation(parsedLoc);
            } catch (err) {
                console.error('Failed to parse location:', err);
                navigate('/location');
            }
        };

        init();
    }, [navigate, location.state, isLoaded]);

    // ─── 2. Initialize Map (ONCE — persisted via useRef) ────
    useEffect(() => {
        if (!isLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

        try {
            const map = new window.google.maps.Map(mapContainerRef.current, {
                center: DEFAULT_LOCATION,
                zoom: 14,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
            });

            mapInstanceRef.current = map;
            setIsMapLoading(false);
        } catch (err) {
            console.error('Map initialization error:', err);
            setIsMapLoading(false);
        }
    }, [isLoaded]);

    // ─── 3. Update map center & user marker when location changes ─
    useEffect(() => {
        if (!mapInstanceRef.current || !userLocation) return;

        mapInstanceRef.current.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
        addUserMarker(mapInstanceRef.current, userLocation);
        fetchStores(userLocation);
    }, [userLocation, isMapLoading, fetchStores]);

    // ─── 4. Initialize Autocomplete for Search Bar ─────────
    useEffect(() => {
        if (!isLoaded || !searchInputRef.current || autocompleteInstanceRef.current) return;

        try {
            const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
                fields: ["geometry", "name", "formatted_address"]
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    const newLoc = { 
                        lat: place.geometry.location.lat(), 
                        lng: place.geometry.location.lng() 
                    };
                    setSearchQuery(place.name || place.formatted_address || '');
                    setUserLocation(newLoc);
                    setIsManualMode(false);
                }
            });

            autocompleteInstanceRef.current = autocomplete;
        } catch (err) {
            console.error('Failed to initialize autocomplete:', err);
        }
    }, [isLoaded]);

    // ─── Helper: Add/update user location marker ───────────
    const addUserMarker = (map, loc) => {
        if (!map || !loc) return;
        
        // Remove existing user marker
        if (userMarkerRef.current) {
            try { userMarkerRef.current.remove(); } catch (e) { /* ok */ }
            userMarkerRef.current = null;
        }

        try {
            userMarkerRef.current = new window.google.maps.Marker({
                map: map,
                position: { lat: loc.lat, lng: loc.lng },
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#1A73E8",
                    fillOpacity: 1,
                    strokeColor: "white",
                    strokeWeight: 3
                },
                title: 'Your Location'
            });
        } catch (err) {
            console.error('Failed to add user marker:', err);
        }
    };

    // ─── 4. Update store markers when stores change ─────────
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        // ★ CLEAR existing store markers before re-rendering
        clearStoreMarkers();

        if (stores.length === 0) return;

        stores.forEach((store) => {
            try {
                const marker = new window.google.maps.Marker({
                    map: mapInstanceRef.current,
                    position: { lat: store.latitude, lng: store.longitude },
                    title: store.name
                });
                
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `<div style="padding:4px 8px;font-weight:600;font-size:13px;color:black;">${store.name}</div>`
                });

                marker.addListener('click', () => {
                    infoWindow.open({
                        anchor: marker,
                        map: mapInstanceRef.current,
                    });
                    handleStoreSelect(store);
                });
                storeMarkersRef.current.push(marker);
            } catch (err) {
                console.error('Failed to add marker for:', store.name, err);
            }
        });
    }, [stores]);

    // ─── Helper: Clear all store markers ────────────────────
    const clearStoreMarkers = () => {
        storeMarkersRef.current.forEach((marker) => {
            try { marker.setMap(null); } catch (e) { /* ok */ }
        });
        storeMarkersRef.current = [];
    };

    // ─── Handler: Select a store ────────────────────────────
    const handleStoreSelect = (store) => {
        setSelectedStore(store);

        // Calculate haversine distance
        if (userLocation) {
            const dist = getApproxDistance(
                userLocation.lat, userLocation.lng,
                store.latitude, store.longitude
            );
            setRouteInfo({
                distance: `${dist.distanceKm} km`,
                duration: `~${dist.durationMin} min`,
            });
        }

        // Shuffle menu categories
        const scrolledMenu = getShuffledMenuForVendor(store.id);
        setMenuData(scrolledMenu);
        if (scrolledMenu.length > 0) setExpandedCategory(scrolledMenu[0].categoryId);

        if (isMobile) setActiveView('map');
        if (!isMobile && storeItemRefs.current[store.id]) {
            storeItemRefs.current[store.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Pan map to store
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter({ lat: store.latitude, lng: store.longitude });
            mapInstanceRef.current.setZoom(16);
        }
    };

    // ─── Toggle Accordion ──────────────────────────────────
    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    // ─── Manual Geocode Search (Text input) ────────────────
    const handleSearch = async (e) => {
        e?.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setError(null);
        try {
            const result = await geocodeAddress(searchQuery);
            if (result) {
                const newLoc = { lat: result.lat, lng: result.lng };
                setUserLocation(newLoc);
                setIsManualMode(false);
            } else {
                setError('Location not found. Try a different place name.');
            }
        } catch (err) {
            setError('Search failed. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    // ─── UI: Toggle menu modal ─────────────────────────────
    const toggleMenu = (e) => {
        if (e) e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    // ─── Category Icon Helper ──────────────────────────────
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

    // ─── Navigate URL (opens Mappls directions) ────────────
    const getNavigateUrl = (store) => {
        if (!userLocation) return '#';
        return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${store.latitude},${store.longitude}&travelmode=driving`;
    };

    // ─── SDK Load Error ────────────────────────────────────
    if (loadError) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-white p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <FiX className="text-red-500" size={28} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Map Failed to Load</h2>
                <p className="text-gray-500 text-sm max-w-md">
                    Unable to load the map service. Please check your internet connection and reload the page.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                    Reload Page
                </button>
            </div>
        );
    }

    // ─── RENDER ────────────────────────────────────────────
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

                {/* ── 1. LIST PANEL (Left) ────────────────── */}
                <div className={classNames(
                    "w-full md:w-[35%] lg:w-[400px] h-full overflow-y-auto bg-white z-10 transition-transform duration-300 absolute md:relative border-r border-gray-200 custom-scrollbar flex flex-col",
                    (isMobile && activeView !== 'list') ? "-translate-x-full" : "translate-x-0"
                )}>
                    {/* Search Location Header (Matches Screenshot) */}
                    <div className="p-4 border-b bg-gray-50 sticky top-0 z-20">
                        <label id="search-label" className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">
                            Search Location
                        </label>
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-grow">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Enter city or area name..."
                                    className="w-full pl-3 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all shadow-sm"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiMapPin size={16} />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSearching || !searchQuery.trim()}
                                className="px-5 py-2.5 bg-secondary text-white font-bold rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                                {isSearching ? (
                                    <FiLoader className="animate-spin" size={18} />
                                ) : (
                                    "Go"
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="p-4 flex-grow">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h1 className="text-xl font-bold text-gray-800 mb-1">Nearby Juice Stores</h1>
                                <p className="text-sm text-gray-500">
                                    {isLoading ? "Looking for stores..." : `Found ${stores.length} fresh spots`}
                                </p>
                            </div>
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="space-y-4">
                                <div className="flex flex-col items-center py-8">
                                    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="text-sm text-gray-500 font-medium animate-pulse">
                                        Finding nearby juice shops…
                                    </p>
                                </div>
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {error && !isLoading && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mb-4 flex items-start gap-2 border border-red-100">
                                <FiX className="mt-0.5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && !error && stores.length === 0 && userLocation && (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl text-secondary">🔍</span>
                                </div>
                                <h3 className="font-bold text-gray-700 mb-2">No Juice Shops Found</h3>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                                    We couldn't find juice shops near "{searchQuery || 'this location'}". Try searching for a different area.
                                </p>
                            </div>
                        )}

                        {/* Store Cards */}
                        {!isLoading && stores.length > 0 && (
                            <div className="space-y-4" ref={storeListRef}>
                                {stores.map((store) => (
                                    <div
                                        key={store.id}
                                        ref={el => storeItemRefs.current[store.id] = el}
                                        className={classNames(
                                            "border rounded-xl p-4 transition-all cursor-pointer hover:shadow-md",
                                            selectedStore?.id === store.id ? "border-secondary ring-1 ring-secondary bg-orange-50/20 shadow-sm" : "border-gray-100"
                                        )}
                                        onClick={() => handleStoreSelect(store)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{store.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{store.address}</p>

                                                <div className="flex items-center gap-3 mt-3">
                                                    {store.rating > 0 && (
                                                        <div className="flex items-center gap-1">
                                                            <FiStar className="text-yellow-400 fill-current" size={14} />
                                                            <span className="text-sm font-semibold text-gray-700">{store.rating}</span>
                                                        </div>
                                                    )}
                                                    {store.distanceKm && (
                                                        <span className="text-xs text-gray-400 font-medium">
                                                            {store.distanceKm} km away
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {store.isOpen && (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                                                    OPEN
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <button
                                                className="py-2.5 px-3 bg-secondary text-white text-xs font-bold rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                            >
                                                <FiNavigation size={14} />
                                                View on Map
                                            </button>
                                            <button
                                                onClick={toggleMenu}
                                                className="py-2.5 px-3 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                                            >
                                                View Menu
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── 2. MAP PANEL (Right) ────────────────── */}
                <div className={classNames(
                    "w-full md:flex-1 h-full bg-gray-100 absolute md:relative transition-transform duration-300",
                    (isMobile && activeView !== 'map') ? "translate-x-full" : "translate-x-0"
                )}>
                    {/* Map Loading Overlay */}
                    {(isMapLoading || !isLoaded) && (
                        <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
                            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-3" />
                            <p className="text-sm font-bold text-gray-500">Initializing Google Maps...</p>
                        </div>
                    )}

                    {/* Route Info Overlay */}
                    {routeInfo && selectedStore && (
                        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 bg-white p-3 rounded-xl shadow-xl z-10 md:min-w-[220px] border-l-4 border-secondary animate-in slide-in-from-right-4 duration-300">
                            <h4 className="font-bold text-gray-800 text-sm truncate">{selectedStore.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-lg font-bold text-secondary">{routeInfo.duration}</span>
                                <span className="text-gray-400 text-xs font-medium">({routeInfo.distance})</span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(getNavigateUrl(selectedStore), '_blank');
                                }}
                                className="mt-2 w-full py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                                <FiNavigation size={12} />
                                Get Directions
                            </button>
                        </div>
                    )}

                    <div
                        ref={mapContainerRef}
                        id="mappls-map"
                        className="w-full h-full"
                        style={{ minHeight: '350px' }}
                    />
                </div>

            </div>

            {/* ── View Menu Modal ─────────────────────────── */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity" onClick={toggleMenu}>
                    <div
                        className="bg-white w-full md:w-[450px] max-h-[85vh] flex flex-col rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white sticky top-0 z-20 shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    Fresh Menu
                                </h2>
                                <p className="text-xs text-secondary font-bold mt-1 tracking-wide">
                                    STANDARD SIZE: ₹60/-
                                </p>
                            </div>
                            <button
                                onClick={toggleMenu}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto custom-scrollbar flex-grow p-5 space-y-4 bg-gray-50">
                            {menuData.map((category) => {
                                const isExpanded = expandedCategory === category.categoryId;
                                return (
                                    <div key={category.categoryId} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
                                        {/* Accordion Header */}
                                        <button
                                            onClick={() => toggleCategory(category.categoryId)}
                                            className={classNames(
                                                "w-full flex items-center justify-between p-4 text-left transition-colors",
                                                isExpanded ? "bg-orange-50/70" : "bg-white hover:bg-gray-50"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{getCategoryIcon(category.categoryId)}</span>
                                                <span className={classNames("text-sm font-bold tracking-tight", isExpanded ? "text-gray-900" : "text-gray-700")}>
                                                    {category.categoryName}
                                                </span>
                                            </div>
                                            {isExpanded ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                                        </button>

                                        {/* Accordion Body */}
                                        <div className={classNames(
                                            "overflow-hidden transition-all duration-300 ease-in-out",
                                            isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                                        )}>
                                            <div className="p-4 pt-0 space-y-5">
                                                <div className="h-px bg-gray-100 mx-2 mb-4" />

                                                {category.items.map((item) => (
                                                    <div key={item.itemId} className="flex justify-between items-start gap-4">
                                                        <div className="flex-grow">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-bold text-gray-800 text-[15px]">
                                                                    {item.name}
                                                                </h4>
                                                                {item.isHealthy && (
                                                                    <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 text-[9px] font-black rounded-full border border-green-100">
                                                                        HEALTHY
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[12px] text-gray-500 mt-1 leading-relaxed line-clamp-2">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-sm font-bold text-secondary bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                                                                {formatPrice(category.price)}
                                                            </span>
                                                        </div>
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
