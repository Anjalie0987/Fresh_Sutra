import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, totalItems, clearCart } = useCart();
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        setLoaded(true);
    }, []);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePlaceOrder = () => {
        navigate('/order-placed');

        // Clear cart AFTER navigation to avoid premature unmount
        setTimeout(() => {
            clearCart();
        }, 0);
    };

    const items = Object.values(cartItems);

    // Mock Store Data (In a real app, this would come from context or cart metadata)
    const store = {
        name: "Fresh Sutra - Indiranagar",
        distance: "0.8 km",
        address: "123, 100 Feet Rd, Indiranagar, Bengaluru",
        isFssaiVerified: true
    };

    if (totalItems === 0) {
        return (
            <div className={`min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-6">Add some delicious juices to place an order.</p>
                <Link to="/" className="text-orange-600 font-bold hover:underline">Browse Menu</Link>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gray-50 pb-32 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>

            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="container mx-auto px-4 md:px-6 py-4 flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Review Your Order</h1>
                        <p className="text-xs text-gray-500">Please review details before placing order</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-6 max-w-3xl space-y-6">

                {/* 1. Store Section */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h2 className="font-bold text-gray-900">{store.name}</h2>
                            <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                {store.distance}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{store.address}</p>
                        {store.isFssaiVerified && (
                            <div className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                                <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                FSSAI License Verified
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Delivery Address */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-gray-900 font-bold">
                            <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Delivery Address
                        </div>
                        <button className="text-sm font-bold text-orange-600 hover:text-orange-700">Change</button>
                    </div>
                    <div className="pl-7">
                        <h3 className="font-bold text-gray-800 text-sm mb-1">Home</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            House No. 42, Sector 21, Gurugram, Haryana - 122001
                        </p>
                    </div>
                </div>

                {/* 3. Items Summary */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Items Summary</h3>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-start">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs font-bold text-gray-600 mr-3 mt-0.5">
                                        x{item.qty}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500">₹{item.price} per item</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-gray-900">₹{item.price * item.qty}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Bill Summary */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Bill Details</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Item Total</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Charges</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Taxes & Charges</span>
                            <span>₹24</span>
                        </div>
                        <div className="border-t border-gray-100 my-3 pt-3 flex justify-between items-center">
                            <span className="font-bold text-gray-900 text-lg">Grand Total</span>
                            <span className="font-bold text-gray-900 text-lg">₹{cartTotal + 24}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Sticky Footer CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 md:static md:bg-transparent md:border-t-0 md:shadow-none md:p-0 md:max-w-3xl md:mx-auto md:px-6 md:mb-10">
                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-between px-6"
                >
                    <span>₹{cartTotal + 24}</span>
                    <span className="flex items-center">
                        Place Order
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                </button>
            </div>

            <style>{`
                @keyframes scale-in {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>

        </div>
    );
};

export default PlaceOrder;
