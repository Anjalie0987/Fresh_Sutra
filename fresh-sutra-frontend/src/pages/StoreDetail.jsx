import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FloatingCartPreview from '../components/FloatingCartPreview';
import { useCart } from '../context/CartContext';

const StoreDetail = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    // Global Cart State
    const { cartItems, addToCart, updateQuantity, toggleDrawer, totalItems } = useCart();

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleJuiceClick = (juice) => {
        if (cartItems[juice.id]) {
            // If already in cart, maybe just open drawer or remove? 
            // UX Pattern: Toggle selection usually implies toggle add/remove or just focus.
            // Let's make it intuitive: if clicked and in cart, remove? Or add more?
            // "Toggles selection" was the old logic. 
            // Better behavior for e-commerce: Clicking card adds 1 if not present. If present, does nothing (user uses qty controls).
            // But let's stick to the prompt's implied "Selection" feel.
            // If it's already there, let's just open the drawer or do nothing.
            // For now, let's keep it simple: Add if not present.
            // Actually, let's stick to the previous toggle logic if feasible, or strictly "Add".
            // The old logic was: click -> toggle.
            if (cartItems[juice.id]) {
                // Remove
                // We need a removeFromCart function or updateQuantity(id, -cartItems[id].qty)
                // But typically clicking a product card detail might just navigate. 
                // Let's assume click on Card = Add to Cart (qty 1) if key interaction.
            } else {
                addToCart({ ...juice, storeId });
            }
        } else {
            addToCart({ ...juice, storeId });
        }
    };

    const handleQuantityChange = (e, id, change) => {
        e.stopPropagation();
        updateQuantity(id, change);
    };

    // Mock Data
    const juices = [
        {
            id: 1,
            name: "Fresh Orange Juice",
            description: "Bright, refreshing and naturally energizing",
            price: 120,
            color: "from-orange-100 to-yellow-50",
            accent: "orange",
            imageColor: "bg-orange-400"
        },
        {
            id: 2,
            name: "Watermelon Splash",
            description: "Cool, hydrating and perfectly sweet",
            price: 100,
            color: "from-red-100 to-pink-50",
            accent: "red",
            imageColor: "bg-red-400"
        },
        {
            id: 3,
            name: "Pineapple Punch",
            description: "Tropical goodness in every sip",
            price: 130,
            color: "from-yellow-100 to-amber-50",
            accent: "yellow",
            imageColor: "bg-yellow-400"
        },
        {
            id: 4,
            name: "Mixed Fruit Delight",
            description: "A perfect blend of nature's best",
            price: 150,
            color: "from-purple-100 to-pink-50",
            accent: "purple",
            imageColor: "bg-purple-400"
        },
        {
            id: 5,
            name: "Green Detox",
            description: "Healthy greens for a fresh start",
            price: 140,
            color: "from-green-100 to-emerald-50",
            accent: "green",
            imageColor: "bg-green-400"
        }
    ];

    const store = {
        id: storeId,
        name: "Fresh Sutra - Indiranagar",
        distance: "0.8 km",
        isFssaiVerified: true,
        address: "123, 100 Feet Rd, Indiranagar, Bengaluru",
        hours: "8:00 AM - 10:00 PM",
        hygieneNote: "Juices are freshly prepared only after you place the order for maximum freshness."
    };

    // Computed Values moved to Context
    // const totalItems = ... 
    // const subtotal = ...

    return (
        <div className={`min-h-screen bg-gray-50 pb-32 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>

            {/* 🟢 A. Store Hero Section */}
            <div className="relative w-full bg-gradient-to-br from-green-50 via-white to-orange-50 pt-8 pb-32 rounded-b-[2.5rem] shadow-sm overflow-hidden">
                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-5 relative z-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                        {store.name}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        <span className="inline-flex items-center text-sm font-medium text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                            <svg className="w-4 h-4 mr-1.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            {store.distance} away
                        </span>

                        {store.isFssaiVerified && (
                            <span className="inline-flex items-center text-sm font-medium text-green-700 bg-green-50/80 backdrop-blur-sm px-3 py-1 rounded-full border border-green-100 shadow-sm">
                                <svg className="w-4 h-4 mr-1.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                FSSAI Verified
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-500 font-medium italic">
                        "Hygienic, freshly prepared juices you can trust"
                    </p>
                </div>
            </div>

            {/* 🟢 B. Store Banner Card (Floating) */}
            <div className="container mx-auto px-5 -mt-20 relative z-20">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-3 transform transition-transform duration-300 md:hover:-translate-y-1">
                    <div className="relative w-full h-56 md:h-72 bg-gray-100 rounded-[1.5rem] overflow-hidden group">
                        {/* Placeholder Image Logic */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                            <div className="text-center">
                                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span className="text-sm font-medium">Store Banner Image</span>
                            </div>
                        </div>

                        {/* Overlay for depth */}
                        <div className="absolute inset-0 bg-black/5 md:group-hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                </div>
            </div>

            {/* 🟢 C. Sticky Order CTA (Removed static version, replaced by dynamic Summary) */}

            {/* 🟢 D. Store Info Section */}
            <div className="container mx-auto px-5 mt-8 md:mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Address & Hours Card */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-start mb-4">
                            <div className="p-3 bg-orange-50 rounded-2xl mr-4 flex-shrink-0">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold mb-1">Address</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{store.address}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="p-3 bg-blue-50 rounded-2xl mr-4 flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold mb-1">Operating Hours</h3>
                                <p className="text-gray-600 text-sm">{store.hours}</p>
                            </div>
                        </div>
                    </div>

                    {/* Hygiene Promise Card */}
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-3xl shadow-sm border border-green-100/50 flex flex-col justify-center">
                        <div className="flex items-center mb-3">
                            <div className="p-2 bg-green-100 rounded-full mr-3">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-gray-900 font-bold">Hygiene Promise</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {store.hygieneNote}
                        </p>
                    </div>
                </div>
            </div>

            {/* 🟢 E. 'Available Juices' Section (Menu Cards) */}
            <div className="container mx-auto mt-10 md:mt-16 mb-20">
                <div className="px-5 md:px-0 mb-6 flex flex-col md:flex-row md:items-baseline md:justify-between text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900">Available Juices</h2>
                    <p className="text-sm text-gray-500 font-medium mt-1 md:mt-0">Freshly prepared after you order</p>
                </div>

                {/* Scroll Container (Mobile: Horizontal, Desktop: Grid) */}
                <div className="relative">
                    <div className="flex overflow-x-auto pb-8 px-5 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-5 md:mx-0 before:block before:w-5 before:flex-shrink-0 md:before:hidden after:block after:w-5 after:flex-shrink-0 md:after:hidden">
                        {juices.map((juice) => {
                            const cartItem = cartItems[juice.id];
                            const quantity = cartItem ? cartItem.qty : 0;
                            const isSelected = quantity > 0;

                            return (
                                <div
                                    key={juice.id}
                                    onClick={() => handleJuiceClick(juice)}
                                    className={`
                            relative flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-auto snap-center
                            bg-white rounded-[2rem] p-4 cursor-pointer transition-all duration-300
                            ${isSelected
                                            ? 'ring-2 ring-offset-2 shadow-lg scale-[0.98]'
                                            : 'hover:shadow-xl hover:-translate-y-1 shadow-sm border border-gray-50'
                                        }
                            ${isSelected && juice.accent === 'orange' ? 'ring-orange-400' : ''}
                            ${isSelected && juice.accent === 'red' ? 'ring-red-400' : ''}
                            ${isSelected && juice.accent === 'yellow' ? 'ring-yellow-400' : ''}
                            ${isSelected && juice.accent === 'purple' ? 'ring-purple-400' : ''}
                            ${isSelected && juice.accent === 'green' ? 'ring-green-400' : ''}
                        `}
                                >
                                    {/* Selection Checkmark Overlay */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 z-10 bg-black/80 text-white p-1 rounded-full shadow-md animate-scale-in">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                    )}

                                    {/* 1. Juice Image Container */}
                                    <div className={`
                             aspect-[4/3] rounded-[1.5rem] mb-4 relative overflow-hidden flex items-center justify-center
                             bg-gradient-to-br ${juice.color}
                         `}>
                                        {/* Decorative Background Blob */}
                                        <div className={`absolute w-32 h-32 rounded-full blur-2xl opacity-60 ${juice.imageColor} transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}></div>

                                        {/* Placeholder/Icon for Juice */}
                                        <div className="relative z-10 transform transition-transform duration-500 hover:scale-110">
                                            {/* Using a simple composition for the juice visual since we don't have assets yet */}
                                            <div className={`w-24 h-32 mx-auto rounded-xl shadow-lg ${juice.imageColor} relative opacity-90 flex items-center justify-center`}>
                                                <span className="text-white/80 font-bold text-xs tracking-widest rotate-90 opacity-50">FRESH</span>
                                                {/* Pseudo-cap */}
                                                <div className="absolute -top-1 w-20 h-2 bg-white/30 rounded-full"></div>
                                                {/* Pseudo-liquid level */}
                                                <div className="absolute bottom-2 w-20 h-24 bg-white/10 rounded-lg"></div>
                                            </div>
                                            <div className="w-20 h-3 bg-black/10 blur-sm rounded-[100%] mx-auto mt-2"></div>
                                        </div>

                                        {/* Quantity Overlay on Image (Optional visual feedback) */}
                                        {isSelected && quantity > 1 && (
                                            <div className="absolute bottom-2 right-2 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                                                x{quantity}
                                            </div>
                                        )}
                                    </div>

                                    {/* 2. Juice Name */}
                                    <h3 className="text-lg font-bold text-gray-900 text-center mb-1 leading-tight group-hover:text-gray-800">
                                        {juice.name}
                                    </h3>

                                    {/* 3. Description */}
                                    <p className="text-sm text-gray-500 text-center font-medium leading-relaxed px-2 mb-3">
                                        {juice.description}
                                    </p>

                                    {/* 4. Quantity Controls (Visual Only) */}
                                    {isSelected && (
                                        <div className="flex items-center justify-center space-x-4 animate-fade-in-up mt-2 p-1 bg-gray-50 rounded-xl mx-4">
                                            <button
                                                onClick={(e) => handleQuantityChange(e, juice.id, -1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 active:scale-95 transition-all text-lg font-medium"
                                            >
                                                −
                                            </button>
                                            <span className="text-gray-900 font-bold text-lg w-4 text-center">{quantity}</span>
                                            <button
                                                onClick={(e) => handleQuantityChange(e, juice.id, 1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-green-500 active:scale-95 transition-all text-lg font-medium"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* 🛒 Floating Cart Preview (Blinkit Style) */}
            <FloatingCartPreview
                totalItems={totalItems}
                onClick={() => navigate('/order-summary')}
            />

            {/* Add custom keyframes for pulse-slow if needed within tailwind config, 
          using utility 'animate-pulse' for now but could enhance with inline style or config */}
            <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-pulse-slow {
           animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes scale-in {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slide-in-right {
            0% { transform: translateX(20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
            animation: slide-in-right 0.3s ease-out forwards;
        }
        @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>

        </div>
    );
};

export default StoreDetail;
