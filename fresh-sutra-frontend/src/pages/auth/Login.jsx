import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/icons/FreshSutra_Logo.jpg';
import classNames from 'classnames';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();
    const { login, signup } = useAuth();

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(loginData.email, loginData.password);

        setLoading(false);

        if (result.success) {
            const role = result.user.role;
            if (role === 'ADMIN') navigate('/admin/dashboard');
            else if (role === 'VENDOR') navigate('/vendor/dashboard');
            else navigate('/stores-near-you');
        } else {
            setError(result.message);
        }
    };

    const handleUserSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signup(signupData.name, signupData.email, signupData.password);

        setLoading(false);

        if (result.success) {
            alert("Account created successfully. Please login.");
            setActiveTab('login');
        } else {
            setError(result.message);
        }
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen w-full bg-neutral-50 flex items-center justify-center p-4 relative">
            {/* Mobile Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 text-neutral-600 hover:text-neutral-900 md:hidden z-20 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </button>

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
                            {error && <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg">{error}</div>}

                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-neutral-600 ml-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                    required
                                />
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'Login'}
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
                            <form onSubmit={handleUserSignup} className="flex flex-col gap-5">
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">Create Account</h3>
                                {error && <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg">{error}</div>}

                                {/* Name Field */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-neutral-600 ml-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={signupData.name}
                                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
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
                                        value={signupData.email}
                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
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
                                        value={signupData.password}
                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                        placeholder="Create a password"
                                        className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                        required
                                    />
                                </div>

                                {/* Sign Up Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? 'Signing up...' : 'Sign Up'}
                                </button>
                            </form>

                            {/* Login Redirect Link */}
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
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Login;
