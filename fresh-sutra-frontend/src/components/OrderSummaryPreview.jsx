import React, { useState } from 'react';

const OrderSummaryPreview = ({
    items,
    juices,
    onQuantityChange,
    totalItems,
    subtotal
}) => {
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);

    if (totalItems === 0) return null;

    return (
        <>
            {/* 🕵️ Desktop Order Summary Sidebar */}
            <div className="hidden lg:block w-[35%] relative animate-slide-in-right">
                <div className="sticky top-24 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Your Order</h3>
                    <p className="text-sm text-gray-500 mb-6">Selected from this store</p>

                    <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                        {Object.entries(items).map(([id, qty]) => {
                            const juice = juices.find(j => j.id === parseInt(id));
                            if (!juice) return null;
                            return (
                                <div key={id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${juice.color} mr-3 flex-shrink-0`}></div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 line-clamp-1">{juice.name}</p>
                                            <p className="text-xs text-gray-500">₹{juice.price} x {qty}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                                        <button onClick={(e) => onQuantityChange(e, parseInt(id), -1)} className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-red-500 text-xs">−</button>
                                        <span className="text-xs font-bold w-3 text-center">{qty}</span>
                                        <button onClick={(e) => onQuantityChange(e, parseInt(id), 1)} className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-green-500 text-xs">+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="border-t border-gray-100 pt-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900 font-bold">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Delivery</span>
                            <span className="text-gray-400 italic">Calculated at checkout</span>
                        </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center">
                        Proceed to Order
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* 📱 Mobile Sticky Bottom Summary */}
            <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.15)] z-50 rounded-t-[1.5rem] transition-all duration-300 transform ${isMobileExpanded ? 'h-[80vh]' : 'h-auto'}`}>
                {/* Drag Handle / Toggle */}
                <div
                    className="w-full flex justify-center pt-3 pb-1 cursor-pointer"
                    onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                >
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
                </div>

                <div className="p-5 pt-2">
                    {/* Collapsed View */}
                    {!isMobileExpanded ? (
                        <div className="flex items-center justify-between">
                            <div onClick={() => setIsMobileExpanded(true)}>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">{totalItems} ITEMS</p>
                                <div className="flex items-baseline space-x-2">
                                    <h4 className="text-xl font-extrabold text-gray-900">₹{subtotal}</h4>
                                    <span className="text-xs text-green-600 font-medium">View detailed bill</span>
                                </div>
                            </div>
                            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all text-sm flex items-center">
                                Proceed
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </button>
                        </div>
                    ) : (
                        /* Expanded View */
                        <div className="flex flex-col h-full pb-20">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Your Order</h3>
                                <button onClick={() => setIsMobileExpanded(false)} className="p-2 bg-gray-100 rounded-full text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2">
                                {Object.entries(items).map(([id, qty]) => {
                                    const juice = juices.find(j => j.id === parseInt(id));
                                    if (!juice) return null;
                                    return (
                                        <div key={id} className="flex items-center justify-between py-4 border-b border-gray-50">
                                            <div className="flex items-center">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${juice.color} mr-4 flex-shrink-0`}></div>
                                                <div>
                                                    <p className="text-base font-bold text-gray-900">{juice.name}</p>
                                                    <p className="text-sm text-gray-500">₹{juice.price} x {qty}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-1.5">
                                                <button onClick={(e) => onQuantityChange(e, parseInt(id), -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 font-bold">−</button>
                                                <span className="text-gray-900 font-bold text-sm w-3 text-center">{qty}</span>
                                                <button onClick={(e) => onQuantityChange(e, parseInt(id), 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-green-600 font-bold">+</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg text-gray-600 font-medium">Subtotal</span>
                                    <span className="text-2xl text-gray-900 font-extrabold">₹{subtotal}</span>
                                </div>
                                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all flex items-center justify-center text-lg">
                                    Proceed to Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Backdrop for expanded state */}
            {isMobileExpanded && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                    onClick={() => setIsMobileExpanded(false)}
                ></div>
            )}
        </>
    );
};

export default OrderSummaryPreview;
