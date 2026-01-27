import React from 'react';
import SEO from '../components/common/SEO';

const RefundPolicy = () => {
    return (
        <>
            <SEO
                title="Refund Policy"
                description="Read Fresh Sutra's Refund Policy to understand eligibility, timelines, and conditions for refunds."
            />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                {/* Content Container */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* A. Page Header Section */}
                    <div className="bg-white border-b border-gray-100 px-6 py-8 md:p-10 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
                            Refund Policy
                        </h1>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
                            Last updated: January 2026
                        </p>
                        <p className="text-gray-500 max-w-2xl mx-auto text-base">
                            This Refund Policy explains when and how refunds are processed on Fresh Sutra. We aim for fair and transparent resolution for all our customers.
                        </p>
                    </div>

                    {/* B. Content Sections */}
                    <div className="px-6 py-8 md:p-10 space-y-10">

                        {/* 1. Overview */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Overview</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Fresh Sutra facilitates orders from nearby juice stores. While we strive for perfection, we understand that issues may arise. Refunds depend on the status of your order and the specific policies of the store fulfilling it. We are committed to resolving issues fairly and transparently.
                            </p>
                        </section>

                        {/* 2. When Are Refunds Applicable? */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. When Are Refunds Applicable?</h2>
                            <p className="text-gray-600 mb-3">Refunds may be initiated in the following cases:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li>The order is cancelled by the store due to unavailability or other reasons.</li>
                                <li>An item is unavailable after you have placed the order.</li>
                                <li>You receive an incorrect or incomplete order.</li>
                                <li>There are quality-related issues with the product, reported promptly upon delivery.</li>
                            </ul>
                        </section>

                        {/* 3. Non-Refundable Situations */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Non-Refundable Situations</h2>
                            <p className="text-gray-600 mb-3">Refunds may not be applicable if:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li>The order has already been prepared or dispatched by the store.</li>
                                <li>Incorrect delivery details (address or phone number) were provided by the user.</li>
                                <li>Delays caused by unavoidable circumstances such as heavy traffic, bad weather, or peak hours.</li>
                                <li>User dissatisfaction based on personal taste preferences without a valid quality issue.</li>
                            </ul>
                        </section>

                        {/* 4. Cancellation Policy */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Cancellation Policy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Orders can only be cancelled before the store starts preparing them. Once preparation begins, cancellation may not be possible as fresh juices are perishable items. Cancellation eligibility may vary by store.
                            </p>
                        </section>

                        {/* 5. Refund Process */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Refund Process</h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li>To request a refund, please contact Fresh Sutra support.</li>
                                <li>Your request will be reviewed by our team in coordination with the store.</li>
                                <li>If approved, refunds will be processed to your original payment method.</li>
                            </ul>
                        </section>

                        {/* 6. Refund Timeline */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Refund Timeline</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Once a refund is approved, it typically takes <strong>5–7 business days</strong> to reflect in your account. The exact processing time may vary depending on your bank or payment provider. In rare cases, delays beyond our control may occur.
                            </p>
                        </section>

                        {/* 7. Partial Refunds */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Partial Refunds</h2>
                            <p className="text-gray-600 leading-relaxed">
                                In some cases, a partial refund may be issued if only a part of your order is affected (e.g., one missing item from a larger order). The refund amount will be calculated based on the value of the affected items.
                            </p>
                        </section>

                        {/* 8. How to Raise a Refund Request */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">8. How to Raise a Refund Request</h2>
                            <p className="text-gray-600 mb-4">
                                If you need to raise a refund request, please contact us immediately with your order details, a description of the issue, and photographic proof if applicable.
                            </p>
                            <div className="flex items-center space-x-2 text-gray-800 font-medium bg-gray-50 p-4 rounded-lg border border-gray-200 w-fit">
                                <span>Support Email:</span>
                                <a href="mailto:freshsutra88@gmail.com" className="text-[#FF8C00] hover:text-[#e67e00] transition-colors">
                                    freshsutra88@gmail.com
                                </a>
                            </div>
                        </section>

                        {/* 9. Policy Updates */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Policy Updates</h2>
                            <p className="text-gray-600 leading-relaxed">
                                This Refund Policy may be updated periodically to reflect changes in our operations. Your continued use of the platform following any changes implies your acceptance of the updated policy.
                            </p>
                        </section>

                    </div>
                    {/* End Content Sections */}
                </div>
                {/* End Content Container */}
            </div>
        </>
    );
};

export default RefundPolicy;
