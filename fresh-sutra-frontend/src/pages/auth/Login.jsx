import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/icons/FreshSutra_Logo.jpg';
import classNames from 'classnames';
import { FiUser, FiShoppingBag, FiChevronLeft } from 'react-icons/fi';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [signupRole, setSignupRole] = useState(null); // 'user' | 'vendor' | null
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSignupRole(null); // Reset role on tab switch
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            // Optional: toast.success("Logged in successfully!")
            navigate('/');
        }, 500);
    };

    const handleUserSignup = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            alert("Account created successfully. Please login.");
            navigate('/'); // Redirect to Home
        }, 500);
    };

    const handleVendorSignup = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            alert("Registration submitted. You will be notified after verification.");
            navigate('/'); // Redirect to Home
        }, 500);
    };

    return (
        <div className="min-h-screen w-full bg-neutral-50 flex items-center justify-center p-4">

            {/* Card Container */}
            <div className="bg-white w-full max-w-[440px] rounded-2xl shadow-xl flex flex-col items-center p-8 md:p-10 transition-all duration-300">

                {/* Logo Section */}
                <Link to="/" className="mb-2 hover:opacity-90 transition-opacity">
                    <img
                        src={Logo}
                        alt="Fresh Sutra"
                        className="h-16 md:h-20 w-auto object-contain"
                    />
                </Link>

                <h2 className="text-neutral-500 font-medium text-sm mb-8 tracking-wide">
                    Welcome to Fresh Sutra
                </h2>

                {/* Toggle / Tab UI */}
                <div className="w-full bg-gray-100 p-1 rounded-full flex items-center relative mb-8">
                    {/* Login Tab */}
                    <button
                        onClick={() => handleTabChange('login')}
                        className={classNames(
                            "flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-in-out",
                            activeTab === 'login'
                                ? "bg-secondary text-white shadow-md"
                                : "text-neutral-500 hover:text-neutral-900"
                        )}
                    >
                        Login
                    </button>

                    {/* Sign Up Tab */}
                    <button
                        onClick={() => handleTabChange('signup')}
                        className={classNames(
                            "flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-in-out",
                            activeTab === 'signup'
                                ? "bg-secondary text-white shadow-md"
                                : "text-neutral-500 hover:text-neutral-900"
                        )}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Dynamic Content Area */}
                <div className="w-full">
                    {activeTab === 'login' ? (
                        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 animate-fadeIn">
                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-neutral-600 ml-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-neutral-600 ml-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                    required
                                />
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98]"
                            >
                                Login
                            </button>

                            {/* Secondary Links */}
                            <div className="flex flex-col items-center gap-3 mt-2">
                                <button type="button" className="text-sm text-neutral-500 hover:text-secondary font-medium transition-colors">
                                    Forgot password?
                                </button>
                                <p className="text-sm text-neutral-500">
                                    Don’t have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => handleTabChange('signup')}
                                        className="text-secondary font-bold hover:underline"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        </form>
                    ) : (
                        // Sign Up Content
                        <div className="w-full animate-fadeIn">
                            {!signupRole ? (
                                // ROLE SELECTION VIEW
                                <div className="flex flex-col gap-4">

                                    {/* User Role Card */}
                                    <button
                                        onClick={() => setSignupRole('user')}
                                        className="group relative w-full p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-secondary transition-all text-left flex items-start gap-5"
                                    >
                                        <div className="p-3 rounded-lg bg-orange-50 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                                            <FiUser size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-neutral-900 group-hover:text-secondary transition-colors">Sign up as User</h3>
                                            <p className="text-sm text-neutral-500 mt-1">Order fresh juice from nearby stores.</p>
                                        </div>
                                    </button>

                                    {/* Vendor Role Card */}
                                    <button
                                        onClick={() => setSignupRole('vendor')}
                                        className="group relative w-full p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-secondary transition-all text-left flex items-start gap-5"
                                    >
                                        <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <FiShoppingBag size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-neutral-900 group-hover:text-blue-600 transition-colors">Register as Vendor</h3>
                                            <p className="text-sm text-neutral-500 mt-1">List your store and sell juices online.</p>
                                        </div>
                                    </button>

                                </div>
                            ) : (
                                // SIGNUP FORMS CONTAINER
                                <div className="w-full relative">

                                    {/* Back Button */}
                                    <button
                                        onClick={() => setSignupRole(null)}
                                        className="mb-6 text-neutral-500 hover:text-neutral-800 flex items-center gap-1 text-sm font-medium transition-colors"
                                    >
                                        <FiChevronLeft size={16} /> Back to role selection
                                    </button>

                                    {signupRole === 'user' ? (
                                        // USER SIGNUP FORM
                                        <form onSubmit={handleUserSignup} className="flex flex-col gap-5 animate-fadeIn">
                                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Create Account</h3>

                                            {/* Name Field */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                                    required
                                                />
                                            </div>

                                            {/* Email Field */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                                    required
                                                />
                                            </div>

                                            {/* Password Field */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    placeholder="Create a password"
                                                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                                    required
                                                />
                                            </div>

                                            {/* Sign Up Button */}
                                            <button
                                                type="submit"
                                                className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98]"
                                            >
                                                Sign Up
                                            </button>
                                        </form>
                                    ) : (
                                        // VENDOR SIGNUP FORM
                                        <form onSubmit={handleVendorSignup} className="flex flex-col gap-5 animate-fadeIn">
                                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Register Store</h3>

                                            {/* Store Name */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">Store Name</label>
                                                <input type="text" placeholder="Enter store name" className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50" required />
                                            </div>

                                            {/* Owner Name */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">Owner Name</label>
                                                <input type="text" placeholder="Enter owner name" className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50" required />
                                            </div>

                                            {/* Email */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">Email</label>
                                                <input type="email" placeholder="Enter business email" className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50" required />
                                            </div>

                                            {/* Phone */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">Phone</label>
                                                <input type="tel" placeholder="Enter phone number" className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50" required />
                                            </div>

                                            {/* Store Address */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">Store Address</label>
                                                <textarea placeholder="Enter store address" rows="3" className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50 resize-y" required />
                                            </div>

                                            {/* FSSAI Number */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-neutral-600 ml-1">FSSAI Number</label>
                                                <input type="text" placeholder="Enter FSSAI registration number" className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50" required />
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98]"
                                            >
                                                Submit for Verification
                                            </button>

                                            {/* Notice */}
                                            <p className="text-xs text-neutral-500 text-center bg-orange-50 p-3 rounded-lg border border-orange-100/50">
                                                ⚠️ Your account will be activated after verification.
                                            </p>
                                        </form>
                                    )}
                                </div>
                            )}

                            {/* Login Redirect Link */}
                            {!signupRole && (
                                <p className="text-sm text-neutral-500 text-center mt-8">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => handleTabChange('login')}
                                        className="text-secondary font-bold hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Login;
