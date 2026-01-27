import React from 'react';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => {
    return (
        <>
            <SEO
                title="Privacy Policy"
                description="Read Fresh Sutra's Privacy Policy to learn how we collect, use, and protect your personal information."
            />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                {/* Content Container */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* A. Page Header Section */}
                    <div className="bg-white border-b border-gray-100 px-6 py-8 md:p-10 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
                            Privacy Policy
                        </h1>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
                            Last updated: January 2026
                        </p>
                        <p className="text-gray-500 max-w-2xl mx-auto text-base">
                            Your privacy is important to us. This policy explains how Fresh Sutra handles your information with care and respect.
                        </p>
                    </div>

                    {/* B. Content Sections */}
                    <div className="px-6 py-8 md:p-10 space-y-10">

                        {/* 1. Introduction */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                At Fresh Sutra, we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website and use our services. By accessing or using Fresh Sutra, you agree to the terms of this policy.
                            </p>
                        </section>

                        {/* 2. Information We Collect */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                            <p className="text-gray-600 mb-3">We may collect the following types of information:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and account login details.</li>
                                <li><strong>Order & Delivery Information:</strong> Delivery address, order history, and preferences.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, device information, and pages visited (usage data).</li>
                                <li><strong>Communications:</strong> Information provided via contact forms or support queries.</li>
                            </ul>
                        </section>

                        {/* 3. How We Use Your Information */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-600 mb-3">We use the collected data for the following purposes:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li>To process and deliver your orders efficiently.</li>
                                <li>To manage your account and provide customer support.</li>
                                <li>To improve our website, services, and user experience.</li>
                                <li>To send important updates, order confirmations, and service-related notifications.</li>
                                <li>To ensure the security and integrity of our platform.</li>
                            </ul>
                        </section>

                        {/* 4. Data Sharing & Disclosure */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Data Sharing & Disclosure</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Fresh Sutra <strong>does not sell</strong> your personal data to third parties. We may share your information only with trusted third-party service providers necessary to operate our business, such as delivery partners and payment processors. We may also disclose information if required by law or to protect our legal rights.
                            </p>
                        </section>

                        {/* 5. Data Security */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. This includes the use of secure servers, encryption, and restricted internal access to personal information.
                            </p>
                        </section>

                        {/* 6. Cookies & Tracking */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Cookies & Tracking</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our website uses cookies to enhance your browsing experience, manage user sessions, and analyze site performance. You can choose to disable cookies through your browser settings, though this may affect some website functionality.
                            </p>
                        </section>

                        {/* 7. User Rights */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">7. User Rights</h2>
                            <p className="text-gray-600 mb-3">As a user, you have the right to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li>Access the personal data we hold about you.</li>
                                <li>Request correction of inaccurate or incomplete information.</li>
                                <li>Request deletion of your account and personal data.</li>
                                <li>Withdraw consent for data processing where applicable.</li>
                            </ul>
                        </section>

                        {/* 8. Third-Party Links */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our website may contain links to external third-party sites. Fresh Sutra is not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies separately.
                            </p>
                        </section>

                        {/* 9. Policy Updates */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Policy Updates</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this page periodically for the latest information on our privacy practices.
                            </p>
                        </section>

                        {/* 10. Contact Information */}
                        <section className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Information</h2>
                            <p className="text-gray-600 mb-4">
                                If you have any questions or concerns regarding this Privacy Policy, please contact us at:
                            </p>
                            <div className="flex items-center space-x-2 text-gray-800 font-medium">
                                <span>Email:</span>
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

export default PrivacyPolicy;
