import React from 'react';

const FloatingCartPreview = ({ totalItems, onClick }) => {
    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-4 left-0 right-0 px-4 z-50 flex justify-center animate-slide-up">
            <button
                onClick={onClick}
                className="w-full md:w-[420px] bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-[14px] shadow-xl shadow-orange-500/20 py-3 px-5 flex items-center justify-between active:scale-[0.98] transition-all group"
            >
                {/* Left: Info */}
                <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold text-orange-50 uppercase tracking-wider mb-0.5 opacity-90">{totalItems} ITEM{totalItems > 1 ? 'S' : ''} ADDED</span>
                    <span className="text-sm font-bold text-white leading-none">View Cart</span>
                </div>

                {/* Right: Action */}
                <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                    <span className="text-xs font-semibold mr-1.5">Review</span>
                    <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </div>
                </div>
            </button>

            <style>{`
                @keyframes slide-up {
                    0% { transform: translateY(100%); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default FloatingCartPreview;
