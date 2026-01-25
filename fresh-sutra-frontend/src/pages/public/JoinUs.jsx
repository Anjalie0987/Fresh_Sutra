import React from 'react';
import { FiCheckCircle, FiFileText, FiSmartphone, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';

const JoinUs = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* 1️⃣ HERO SECTION */}
            <section className="relative w-full bg-gray-900 border-b border-gray-100">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/60 z-0"></div>

                {/* Background Image Placeholder */}
                <div
                    className="absolute inset-0 z-[-1] opacity-50 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
                ></div>

                <div className="container mx-auto px-5 py-16 md:py-24 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* 🟦 LEFT SIDE (Inspiration) */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold tracking-wider mb-4 border border-orange-500/30">
                                PARTNER WITH FRESH SUTRA
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                                Grow your juice <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                                    business online
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                                Reach nearby customers and receive fresh juice orders directly. Manage your store effortlessly and boost revenue.
                            </p>

                            <div className="hidden md:flex items-center gap-6 text-gray-400 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="text-green-400" /> No joining fees
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="text-green-400" /> Weekly payouts
                                </div>
                            </div>
                        </div>

                        {/* 🟨 RIGHT SIDE (Get Started Card) */}
                        <div className="w-full md:w-1/2 lg:w-5/12 ml-auto">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden transform transition-all hover:scale-[1.01]">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-yellow-500"></div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
                                <p className="text-gray-500 text-sm mb-6">Enter your mobile number to begin store onboarding.</p>

                                <div className="flex flex-col gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-medium">+91</span>
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="Enter mobile number"
                                            className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                        />
                                    </div>

                                    <button className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-[0.98]">
                                        Continue
                                    </button>
                                </div>

                                <p className="text-[10px] text-gray-400 text-center mt-6">
                                    By continuing, you agree to Fresh Sutra’s Terms & Conditions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2️⃣ HOW IT WORKS SECTION */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-5">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get your store live in 3 easy steps</h2>
                        <p className="text-gray-600">Simple onboarding process designed to get you started quickly.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[2.5rem] left-[20%] right-[20%] h-0.5 bg-gray-200 -z-10"></div>

                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-20 h-20 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                                <FiSmartphone size={32} className="text-orange-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Register with mobile</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Enter your number to create an account and verify your identity.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <FiShoppingBag size={32} className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Submit details</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Provide basic store information and upload FSSAI license for verification.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                                <FiTrendingUp size={32} className="text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Start earning</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Go live and start receiving orders from customers nearby.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3️⃣ DOCUMENTS REQUIRED */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-5">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-indigo-100/50">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                            <div className="w-full md:w-1/2">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Keep these documents handy</h2>
                                <p className="text-gray-600 mb-8 max-w-md">To ensure safety and quality standards, we require a few documents to verify your juice store.</p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-sm md:w-fit">
                                        <div className="bg-green-100 p-2 rounded-full text-green-600"><FiCheckCircle /></div>
                                        <span className="font-semibold text-gray-700">FSSAI License Copy</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-sm md:w-fit">
                                        <div className="bg-green-100 p-2 rounded-full text-green-600"><FiCheckCircle /></div>
                                        <span className="font-semibold text-gray-700">Store Menu / Juice List</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-sm md:w-fit">
                                        <div className="bg-green-100 p-2 rounded-full text-green-600"><FiCheckCircle /></div>
                                        <span className="font-semibold text-gray-700">Bank Account Details</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-sm md:w-fit">
                                        <div className="bg-green-100 p-2 rounded-full text-green-600"><FiCheckCircle /></div>
                                        <span className="font-semibold text-gray-700">GSTIN</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-sm md:w-fit">
                                        <div className="bg-green-100 p-2 rounded-full text-green-600"><FiCheckCircle /></div>
                                        <span className="font-semibold text-gray-700">PAN Card Copy</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-sm w-full">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 bg-gray-100 rounded-lg text-gray-500">
                                            <FiFileText size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Need help applying?</h4>
                                            <p className="text-xs text-gray-500 mt-1">Visit the official FSSAI portal</p>
                                        </div>
                                    </div>
                                    <a
                                        href="https://foscos.fssai.gov.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                                    >
                                        Visit FoSCoS Website
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JoinUs;
