import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const {
        isDrawerOpen,
        toggleDrawer,
        cartItems,
        updateQuantity,
        cartTotal,
        totalItems
    } = useCart();

    const items = Object.values(cartItems);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => toggleDrawer(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                    <button
                        onClick={() => toggleDrawer(false)}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                            </div>
                            <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                            <p className="text-sm">Looks like you haven't added anything yet.</p>
                            <button
                                onClick={() => toggleDrawer(false)}
                                className="mt-4 text-orange-600 font-bold hover:underline"
                            >
                                Start Browsing
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                {/* Thumbnail */}
                                <div className={`w-20 h-20 flex-shrink-0 rounded-xl bg-gradient-to-br ${item.color || 'from-gray-100 to-gray-200'} relative overflow-hidden`}>
                                    {item.imageColor && (
                                        <div className={`absolute inset-0 opacity-20 ${item.imageColor}`}></div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-500">₹{item.price}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-red-500 font-bold text-sm"
                                            >
                                                −
                                            </button>
                                            <span className="w-4 text-center text-sm font-bold text-gray-900">{item.qty}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-green-500 font-bold text-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="font-bold text-gray-900">₹{item.price * item.qty}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-5 border-t border-gray-100 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 font-medium">Subtotal ({totalItems} items)</span>
                            <span className="text-xl font-extrabold text-gray-900">₹{cartTotal}</span>
                        </div>
                        <Link
                            to="/order-summary"
                            onClick={() => toggleDrawer(false)}
                            className="block w-full text-center bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl active:scale-[0.98] transition-all"
                        >
                            Proceed to Order
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
