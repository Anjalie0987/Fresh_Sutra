import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiUser, FiCreditCard } from 'react-icons/fi';
import SEO from '../components/common/SEO';

const HelpSupport = () => {
    const categories = [
        {
            id: 1,
            title: 'Ordering Help',
            icon: FiShoppingBag,
            points: [
                'How to place an order',
                'How to add or remove juices',
                'Minimum order requirements'
            ],
            color: 'text-orange-500',
            bg: 'bg-orange-50'
        },
        {
            id: 2,
            title: 'Delivery & Timing',
            icon: FiTruck,
            points: [
                'How delivery time is calculated',
                'Possible delays during peak hours',
                'Delivery availability by location'
            ],
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            id: 3,
            title: 'Account & Login',
            icon: FiUser,
            points: [
                'Login and signup assistance',
                'Password recovery',
                'Updating account details'
            ],
            color: 'text-green-500',
            bg: 'bg-green-50'
        },
        {
            id: 4,
            title: 'Payments & Refunds',
            icon: FiCreditCard,
            points: [
                'Supported payment methods',
                'Refund eligibility',
                'Refund processing timelines'
            ],
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        }
    ];

    return (
        <>
            <SEO
                title="Help & Support"
                description="Get help with your orders, delivery queries, account issues, and payments at Fresh Sutra."
            />

            <div className="min-h-screen bg-white pb-20">
                {/* 1. Page Header Section */}
                <div className="bg-white pt-16 pb-12 text-center px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
                        Help & Support
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
                        We're here to help you with orders, delivery, payments, and account-related queries.
                    </p>
                </div>

                {/* 2. Support Categories Section */}
                <div className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6 md:p-8"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${category.bg} ${category.color}`}>
                                        <category.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            {category.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {category.points.map((point, index) => (
                                                <li key={index} className="flex items-center text-gray-600 text-sm md:text-base">
                                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 flex-shrink-0"></span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Still Need Help? (CTA Section) */}
                <div className="max-w-xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Still need help?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Our support team is happy to assist you with any unresolved queries.
                    </p>
                    <Link
                        to="/contact-us"
                        className="inline-block bg-[#FF8C00] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#e67e00] transition-colors duration-200"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HelpSupport;
