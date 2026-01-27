import React from 'react';
import SEO from '../components/common/SEO';

const TermsConditions = () => {
    return (
        <>
            <SEO
                title="Terms & Conditions"
                description="Read Fresh Sutra's Terms & Conditions to understand the rules and guidelines for using our platform."
            />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                {/* Content Container */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* A. Page Header Section */}
                    <div className="bg-white border-b border-gray-100 px-6 py-8 md:p-10 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
                            Terms & Conditions
                        </h1>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
                            Last updated: January 2026
                        </p>
                        <p className="text-gray-500 max-w-2xl mx-auto text-base">
                            Please read these terms carefully before using Fresh Sutra. By accessing our platform, you agree to be bound by these conditions.
                        </p>
                    </div>

                    {/* B. Content Sections */}
                    <div className="px-6 py-8 md:p-10 space-y-10">

                        {/* 1. Acceptance of Terms */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing or using the Fresh Sutra website or mobile application, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our platform or services.
                            </p>
                        </section>

                        {/* 2. About Fresh Sutra */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. About Fresh Sutra</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Fresh Sutra operates as an online platform that connects users with nearby juice stores to facilitate the discovery and ordering of fresh juices. We act as an intermediary and do not manufacture, prepare, or directly sell the juice products listed on our platform, which are provided by independent third-party stores.
                            </p>
                        </section>

                        {/* 3. User Eligibility */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Eligibility</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">
                                To use our services, you must be at least 18 years of age or accessing the platform under the supervision of a parent or legal guardian.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                You agree to provide accurate, current, and complete information during the registration and ordering process. Unauthorized use of the platform or providing false information is strictly prohibited.
                            </p>
                        </section>

                        {/* 4. Account Responsibilities */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Account Responsibilities</h2>
                            <p className="text-gray-600 leading-relaxed">
                                You are responsible for maintaining the confidentiality of your account credentials, including your password. You agree to accept responsibility for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
                            </p>
                        </section>

                        {/* 5. Orders & Services */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Orders & Services</h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li>All orders placed through Fresh Sutra are subject to acceptance and availability by the respective juice stores.</li>
                                <li>Prices, menus, and product availability may vary by location and are subject to change without notice.</li>
                                <li>Fresh Sutra reserves the right to cancel or refuse any order at our discretion.</li>
                                <li>Once an order is confirmed, modifications or cancellations may not always be possible depending on the preparation status.</li>
                            </ul>
                        </section>

                        {/* 6. Payments */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Payments</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We accept various payment methods as indicated on the checkout page. You agree to pay all charges incurred in connection with your purchases, including applicable taxes and delivery fees. Fresh Sutra is not responsible for payment failures or issues caused by third-party payment gateways.
                            </p>
                        </section>

                        {/* 7. Cancellations & Refunds */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Cancellations & Refunds</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Cancellation and refund eligibility is determined based on the status of your order and the specific policies of the store. Refunds, if approved, will be processed according to our Refund Policy and the timelines of your payment provider. Please refer to our Refund Policy page for detailed information.
                            </p>
                        </section>

                        {/* 8. Prohibited Activities */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Prohibited Activities</h2>
                            <p className="text-gray-600 mb-3">You agree not to engage in any of the following activities:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li>Using the platform for any illegal purpose or in violation of any local, state, or national laws.</li>
                                <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the platform.</li>
                                <li>Uploading invalid data, viruses, worms, or other software agents through the service.</li>
                                <li>Collecting or harvesting any personally identifiable information from other users.</li>
                            </ul>
                        </section>

                        {/* 9. Intellectual Property */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed">
                                All content on Fresh Sutra, including text, graphics, logos, images, and software, is the property of Fresh Sutra or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, display, or create derivative works of any content without our express written permission.
                            </p>
                        </section>

                        {/* 10. Limitation of Liability */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Fresh Sutra shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                            </p>
                        </section>

                        {/* 11. Changes to Terms */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to modify or replace these Terms & Conditions at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. Your continued use of the service after any such changes constitutes your acceptance of the new Terms & Conditions.
                            </p>
                        </section>

                        {/* 12. Contact Information */}
                        <section className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Contact Information</h2>
                            <p className="text-gray-600 mb-4">
                                For any questions regarding these Terms & Conditions, please contact us at:
                            </p>
                            <div className="flex items-center space-x-2 text-gray-800 font-medium">
                                <span>Support Email:</span>
                                <a href="mailto:freshsutra88@gmail.com" className="text-[#FF8C00] hover:text-[#e67e00] transition-colors">
                                    freshsutra88@gmail.com
                                </a>
                            </div>
                        </section>

                    </div>
                    {/* End Content Sections */}
                </div>
                {/* End Content Container */}
            </div>
        </>
    );
};

export default TermsConditions;
