import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import Logo from '../../assets/icons/FreshSutra_Logo.jpg';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { totalItems, toggleDrawer } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const HeaderNavItem = ({ text, to, onClick }) => (
        <Link
            to={to}
            className="group flex items-center justify-center gap-1 cursor-pointer"
            onClick={onClick}
        >
            <span className="text-sm font-bold text-neutral-800 group-hover:text-secondary-red transition-colors whitespace-nowrap uppercase tracking-wide">
                {text}
            </span>
        </Link>
    );

    return (
        <header
            className={classNames(
                "sticky top-0 z-50 w-full transition-all duration-300 border-b",
                {
                    "bg-white/95 backdrop-blur-md shadow-sm border-gray-100": isScrolled,
                    "bg-white border-transparent": !isScrolled
                }
            )}
        >
            <div className="container mx-auto px-4 md:px-6 h-auto md:h-20 py-3 md:py-0 flex items-center justify-between relative z-50">

                {/* LEFT SIDE: Logo + Nav Items */}
                <div className="flex items-center gap-8 md:gap-12">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0" onClick={handleMobileLinkClick}>
                        <img
                            src={Logo}
                            alt="Fresh Sutra"
                            className="h-10 md:h-12 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Left Nav */}
                    <nav className="hidden desktop:flex items-center gap-8">
                        <HeaderNavItem
                            text="Offers & Rewards"
                            to="/offers"
                        />
                        <HeaderNavItem
                            text="Find a Store"
                            to="/location"
                        />
                    </nav>
                </div>

                {/* RIGHT SIDE (Desktop) */}
                <div className="hidden desktop:flex items-center gap-6 md:gap-8 bg-transparent">
                    {/* Join Us Link */}
                    <Link
                        to="/join-us"
                        className="text-sm font-bold text-neutral-800 hover:text-secondary-red transition-colors uppercase tracking-wide"
                    >
                        Join Us
                    </Link>

                    {/* Auth Section */}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            {user?.role === 'ADMIN' && (
                                <Link to="/admin/dashboard" className="text-sm font-bold text-neutral-800 hover:text-secondary-red uppercase tracking-wide">
                                    Dashboard
                                </Link>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-neutral-800 hidden lg:block">Hi, {user?.name.split(' ')[0]}</span>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate('/');
                                    }}
                                    className="p-2 text-neutral-600 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <FiLogOut size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-2.5 bg-secondary text-white rounded-full text-sm font-bold hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg active:scale-95 uppercase tracking-wide"
                        >
                            Login / Sign Up
                        </Link>
                    )}

                    {/* Cart Icon */}
                    <button
                        className="relative text-neutral-900 hover:text-secondary transition-colors p-1"
                        aria-label="Cart"
                        onClick={() => toggleDrawer(true)}
                    >
                        <FiShoppingCart size={22} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary-red text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>

                {/* MOBILE ACTIONS */}
                <div className="flex desktop:hidden items-center gap-4">
                    {/* Cart on Mobile */}
                    <button
                        className="relative text-neutral-900 hover:text-secondary transition-colors p-1"
                        aria-label="Cart"
                        onClick={() => toggleDrawer(true)}
                    >
                        <FiShoppingCart size={22} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary-red text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Hamburger */}
                    <button
                        className="p-2 -mr-2 text-neutral-900 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                        ) : (
                            <div className="w-6 h-5 relative flex flex-col justify-between">
                                <span className={classNames("w-full h-0.5 bg-current transition-all duration-300", isMobileMenuOpen ? "rotate-45 translate-y-2" : "")} />
                                <span className={classNames("w-full h-0.5 bg-current transition-all duration-300", isMobileMenuOpen ? "opacity-0" : "")} />
                                <span className={classNames("w-full h-0.5 bg-current transition-all duration-300", isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : "")} />
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={classNames(
                    "desktop:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6 gap-8",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
                style={{ top: '0', height: '100vh' }}
            >
                <nav className="flex flex-col gap-8 items-center text-center">

                    {/* Mobile Nav Items */}
                    <div className="flex flex-col gap-6 w-full justify-center">
                        <HeaderNavItem
                            text="Offers & Rewards"
                            to="/offers"
                            onClick={handleMobileLinkClick}
                        />
                        <HeaderNavItem
                            text="Find a Store"
                            to="/location"
                            onClick={handleMobileLinkClick}
                        />
                    </div>

                    <div className="w-full h-px bg-neutral-100 my-2"></div>

                    <Link
                        to="/join-us"
                        onClick={handleMobileLinkClick}
                        className="text-lg font-bold text-neutral-800 hover:text-secondary-red transition-colors uppercase tracking-wide"
                    >
                        Join Us
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex flex-col gap-4 w-full items-center">
                            {user?.role === 'ADMIN' && (
                                <Link
                                    to="/admin/dashboard"
                                    onClick={handleMobileLinkClick}
                                    className="text-lg font-bold text-neutral-800 hover:text-secondary-red transition-colors uppercase tracking-wide"
                                >
                                    Dashboard
                                </Link>
                            )}
                            <span className="text-lg font-bold text-neutral-800">Hi, {user?.name}</span>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate('/');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="px-8 py-3 bg-gray-100 text-neutral-800 rounded-full text-lg font-bold hover:bg-gray-200 uppercase tracking-wide w-full max-w-xs"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={handleMobileLinkClick}
                            className="px-8 py-3 bg-secondary text-white rounded-full text-lg font-bold hover:bg-yellow-600 shadow-md w-full max-w-xs uppercase tracking-wide"
                        >
                            Login / Sign Up
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
