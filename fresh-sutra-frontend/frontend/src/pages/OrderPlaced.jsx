import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderPlaced = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scale-in">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-3 animate-fade-in-up">Order Placed Successfully! 🎉</h1>
            <p className="text-gray-600 text-lg mb-2 max-w-md animate-fade-in-up delay-100">
                Your fresh juices are being prepared.
            </p>
            <p className="text-gray-400 text-sm mb-10 animate-fade-in-up delay-200">
                You'll receive updates once your order is accepted by the store.
            </p>

            <Link
                to="/"
                className="px-8 py-3 bg-neutral-900 text-white font-bold rounded-full hover:bg-neutral-800 transition-colors shadow-lg active:scale-95 animate-fade-in-up delay-300"
            >
                Back to Home
            </Link>

            <style>{`
                @keyframes scale-in {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                 @keyframes fade-in-up {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `}</style>
        </div>
    );
};

export default OrderPlaced;
