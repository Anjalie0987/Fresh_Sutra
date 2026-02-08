import React, { useEffect, useState } from 'react';

const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    // Mock Data for Preview
    const store = {
        name: "Fresh Sutra - Indiranagar",
        distance: "0.8 km",
        isFssaiVerified: true,
        address: "123, 100 Feet Rd, Indiranagar, Bengaluru",
    };

    const cartItems = [
        {
            id: 1,
            name: "Fresh Orange Juice",
            qty: 2,
            price: 120,
            imageColor: "bg-orange-400",
            color: "from-orange-100 to-yellow-50"
        },
        {
            id: 2,
            name: "Watermelon Splash",
            qty: 1,
            price: 100,
            imageColor: "bg-red-400",
            color: "from-red-100 to-pink-50"
        }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const total = subtotal; // Delivery calculated at checkout

    return (
        <div className={`min-h-screen bg-gray-50 pb-32 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>

            {/* 🟢 A. Page Header */}
            <div className="bg-white shadow-sm pt-6 pb-6 rounded-b-[2rem] mb-6">
                <div className="container mx-auto px-5 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Review Your Order</h1>
                    <p className="text-sm text-gray-500 font-medium">Please check your order details before confirming</p>
                </div>
            </div>

            <div className="container mx-auto px-5 max-w-3xl">

                {/* 🟢 B. Store Info Card */}
                <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 mb-4 flex items-center justify-between transform transition-transform md:hover:scale-[1.01] duration-300">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">{store.name}</h2>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold mr-2">{store.distance}</span>
                            <span className="truncate max-w-[200px]">{store.address}</span>
                        </div>
                        {store.isFssaiVerified && (
                            <div className="inline-flex items-center text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full mt-1">
                                <svg className="w-3 h-3 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                FSSAI Verified
                            </div>
                        )}
                    </div>
                    <div className="p-2 bg-orange-50 rounded-full">
                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                </div>

                {/* 🟢 C. Selected Items Section */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 mb-4 animate-fade-in-up">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Juices</h3>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between group">
                                <div className="flex items-center">
                                    {/* Thumbnail */}
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} mr-4 flex-shrink-0 relative overflow-hidden flex items-center justify-center shadow-sm`}>
                                        <div className={`w-8 h-10 ${item.imageColor} rounded opacity-80 shadow-inner`}></div>
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold group-hover:text-orange-600 transition-colors">{item.name}</p>
                                        <p className="text-sm text-gray-500 font-medium">Qty: {item.qty} <span className="mx-1 text-gray-300">|</span> ₹{item.price * item.qty}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-900 font-bold">₹{item.price * item.qty}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🟢 E. Delivery Info */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 mb-4 flex items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="p-3 bg-blue-50 rounded-full mr-4 text-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-gray-900 font-bold text-sm">Delivery to Home</h4>
                        <p className="text-gray-500 text-xs mt-0.5">#42, Palm Grove Apts, Indiranagar</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">ESTIMATED TIME</p>
                        <p className="text-gray-900 font-bold">30–40 mins</p>
                    </div>
                </div>

                {/* 🟢 D. Price Summary */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 mb-24 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900 font-bold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="text-orange-500 text-sm font-medium italic">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-extrabold text-gray-900">₹{total}</span>
                    </div>
                </div>

            </div>

            {/* 🟢 F. Primary CTA (Sticky Bottom) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-50">
                <div className="container mx-auto max-w-3xl">
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all flex items-center justify-center text-lg animate-pulse-slow">
                        Place Order
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    0% { transform: translateY(10px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.4s ease-out forwards;
                }
                 .animate-pulse-slow {
                    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default OrderSummary;
