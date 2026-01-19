import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';
import Logo from '../../assets/icons/FreshSutra_Logo.jpg';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const NavItem = ({ link, mobile = false, onClick }) => (
        <NavLink
            to={link.path}
            onClick={onClick}
            className={({ isActive }) =>
                classNames(
                    "font-medium transition-colors hover:text-secondary",
                    mobile ? "text-xl" : "text-sm",
                    isActive
                        ? "text-secondary-red font-bold"
                        : "text-neutral-900"
                )
            }
        >
            {link.name}
        </NavLink>
    );

    NavItem.propTypes = {
        link: PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }).isRequired,
        mobile: PropTypes.bool,
        onClick: PropTypes.func,
    };

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
            <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
                {/* Left: Logo (JPG) */}
                <Link to="/" className="flex-shrink-0">
                    <img
                        src={Logo}
                        alt="Fresh Sutra - Drink Fresh At Its Best"
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                </Link>

                {/* Right Section Wrapper (Desktop) */}
                <div className="hidden desktop:flex items-center gap-8 justify-end flex-grow">
                    {/* Navigation Items - Right Aligned */}
                    <nav className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavItem key={link.name} link={link} />
                        ))}
                    </nav>

                    {/* Cart Icon */}
                    <button
                        className="relative text-neutral-900 hover:text-secondary transition-colors p-1"
                        aria-label="Cart"
                    >
                        <FiShoppingCart size={22} />
                        {/* Optional Badge Placeholder 
             <span className="absolute -top-1 -right-1 bg-secondary-red text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
             */}
                    </button>

                    {/* CTA Button */}
                    <Link
                        to="/login"
                        className="px-6 py-2.5 bg-secondary text-white rounded-full text-sm font-semibold hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        Login / Sign Up
                    </Link>
                </div>

                {/* Mobile: Actions & Hamburger */}
                <div className="flex desktop:hidden items-center gap-4">
                    {/* Cart Icon (Mobile) */}
                    <button
                        className="text-neutral-900 hover:text-secondary transition-colors p-1"
                        aria-label="Cart"
                    >
                        <FiShoppingCart size={22} />
                    </button>

                    <button
                        className="p-2 -mr-2 text-neutral-900 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={classNames("w-full h-0.5 bg-current transition-all duration-300", isMobileMenuOpen ? "rotate-45 translate-y-2" : "")} />
                            <span className={classNames("w-full h-0.5 bg-current transition-all duration-300", isMobileMenuOpen ? "opacity-0" : "")} />
                            <span className={classNames("w-full h-0.5 bg-current transition-all duration-300", isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : "")} />
                        </div>
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
                <nav className="flex flex-col gap-6 items-center text-center">
                    {navLinks.map((link) => (
                        <NavItem key={link.name} link={link} mobile={true} onClick={handleMobileLinkClick} />
                    ))}

                    <Link
                        to="/login"
                        onClick={handleMobileLinkClick}
                        className="mt-4 px-8 py-3 bg-secondary text-white rounded-full text-lg font-semibold hover:bg-yellow-600 shadow-md w-full max-w-xs"
                    >
                        Login / Sign Up
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
