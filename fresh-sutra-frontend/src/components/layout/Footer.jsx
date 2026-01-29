import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Logo from '../../assets/icons/FreshSutra_Logo.jpg';
import AdSlot from '../AdSlot';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const FooterLink = ({ to, text }) => (
        <Link
            to={to}
            className="text-gray-300 hover:text-[#FF8C00] transition-colors duration-200 text-sm mb-2 block w-fit"
        >
            {text}
        </Link>
    );

    const SocialIcon = ({ Icon, href }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-[#FF8C00] transition-all duration-300"
        >
            <Icon size={14} />
        </a>
    );

    return (
        <footer className="bg-[#1F2933] text-white pt-16 pb-8 border-t border-gray-800">
            {/* Optional Footer Ad Slot */}
            <AdSlot variant="banner" className="mb-8" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <Link to="/" className="block mb-2">
                            <img
                                src={Logo}
                                alt="Fresh Sutra"
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </Link>
                        <div className="space-y-3">
                            <h3 className="text-xl font-serif text-[#FF8C00] italic">
                                Drink Fresh at Its Best
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                                Fresh Sutra helps you discover hygienic, FSSAI-verified juice stores near you and get fresh juice delivered.
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Quick Links</h4>
                        <div className="flex flex-col">
                            <FooterLink to="/" text="Home" />
                            <FooterLink to="/location" text="Find a Store" />
                            <FooterLink to="/offers" text="Offers & Rewards" />
                            <FooterLink to="/contact-us" text="Contact Us" />
                        </div>
                    </div>

                    {/* Column 3: Support & Legal */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Support & Legal</h4>
                        <div className="flex flex-col">
                            <FooterLink to="/help" text="Help / Support" />
                            <FooterLink to="/privacy-policy" text="Privacy Policy" />
                            <FooterLink to="/terms-and-conditions" text="Terms & Conditions" />
                            <FooterLink to="/refund-policy" text="Refund Policy" />
                            <FooterLink to="/fssai-compliance" text="FSSAI Compliance" />
                        </div>
                    </div>

                    {/* Column 4: Connect With Us */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Connect With Us</h4>
                        <div className="flex gap-4 mb-6">
                            <SocialIcon Icon={FaInstagram} href="https://instagram.com" />
                            <SocialIcon Icon={FaTwitter} href="https://twitter.com" />
                            <SocialIcon Icon={FaLinkedinIn} href="https://linkedin.com" />
                        </div>
                        <a
                            href="mailto:freshsutra88@gmail.com"
                            className="text-gray-400 text-sm hover:text-[#FF8C00] transition-colors"
                        >
                            freshsutra88@gmail.com
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-center md:justify-start items-center">
                    <p className="text-gray-500 text-xs text-center md:text-left w-full">
                        © {currentYear} Fresh Sutra. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
