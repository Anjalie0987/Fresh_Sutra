import React from 'react';
import SEO from '../components/common/SEO';

const FssaiCompliance = () => {
    return (
        <>
            <SEO
                title="FSSAI Compliance"
                description="Learn about Fresh Sutra's commitment to food safety, hygiene, and FSSAI regulatory compliance."
            />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                {/* Content Container */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* A. Page Header Section */}
                    <div className="bg-white border-b border-gray-100 px-6 py-8 md:p-10 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
                            FSSAI Compliance
                        </h1>
                        <p className="text-lg text-gray-600 mb-4 font-medium">
                            Ensuring food safety, hygiene, and quality standards
                        </p>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                            Last updated: January 2026
                        </p>
                    </div>

                    {/* B. Content Sections */}
                    <div className="px-6 py-8 md:p-10 space-y-10">

                        {/* 1. What is FSSAI? */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. What is FSSAI?</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">
                                The Food Safety and Standards Authority of India (FSSAI) is a government body responsible for regulating and supervising food safety standards in India. It was established under the Food Safety and Standards Act, 2006.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                FSSAI ensures that food businesses follow strict guidelines to provide safe, wholesome, and hygienic food to consumers. Adherence to these standards is mandatory for all food business operators in India.
                            </p>
                        </section>

                        {/* 2. Fresh Sutra’s Commitment to Food Safety */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Fresh Sutra’s Commitment to Food Safety</h2>
                            <p className="text-gray-600 leading-relaxed">
                                As a platform connecting users with local juice vendors, Fresh Sutra is committed to promoting hygiene, freshness, and transparency. We prioritize the health of our customers by encouraging our partner vendors to strictly adhere to FSSAI norms and best practices in food safety.
                            </p>
                        </section>

                        {/* 3. Vendor FSSAI Requirements */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Vendor FSSAI Requirements</h2>
                            <p className="text-gray-600 mb-3">All vendors listed on Fresh Sutra are required to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li>Hold a valid FSSAI License or Registration applicable to their business scale.</li>
                                <li>Maintain hygienic preparation practices and a clean work environment.</li>
                                <li>Follow proper food storage and handling norms to prevent contamination.</li>
                                <li>Display their FSSAI license details on packaging or the storefront where applicable.</li>
                            </ul>
                        </section>

                        {/* 4. Vendor Verification Process */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Vendor Verification Process</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">
                                Fresh Sutra conducts a verification process before onboarding any new vendor:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2 mb-3">
                                <li>Vendors must submit their valid FSSAI license or registration certificate.</li>
                                <li>We perform basic checks to verify the authenticity of the provided documents.</li>
                                <li>We conduct periodic reviews to ensure continued compliance.</li>
                            </ul>
                            <div className="bg-orange-50 border-l-4 border-[#FF8C00] p-4 mt-4">
                                <p className="text-orange-800 text-sm font-medium">
                                    Fresh Sutra reserves the right to suspend or delist any vendor found to be non-compliant with food safety standards or lacking a valid FSSAI license.
                                </p>
                            </div>
                        </section>

                        {/* 5. Hygiene & Quality Standards */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Hygiene & Quality Standards</h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                                <li><strong>Fresh Preparation:</strong> Juices are prepared fresh only after an order is placed to ensure maximum nutrition and taste.</li>
                                <li><strong>Clean Utensils:</strong> Vendors are instructed to use clean, food-grade utensils and equipment.</li>
                                <li><strong>Safe Packaging:</strong> Orders are delivered in safe, spill-proof packaging to maintain hygiene during transit.</li>
                            </ul>
                        </section>

                        {/* 6. Consumer Responsibility */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Consumer Responsibility</h2>
                            <p className="text-gray-600 mb-4">
                                We encourage our customers to be vigilant. If you notice any hygiene issues or quality concerns with your order, please report them to us immediately. Your feedback helps us maintain high standards across our platform.
                            </p>
                            <div className="flex items-center space-x-2 text-gray-800 font-medium bg-gray-50 p-4 rounded-lg border border-gray-200 w-fit">
                                <span>Support Email:</span>
                                <a href="mailto:freshsutra7@gmail.com" className="text-[#FF8C00] hover:text-[#e67e00] transition-colors">
                                    freshsutra7@gmail.com
                                </a>
                            </div>
                        </section>

                        {/* 7. Official FSSAI Resources */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Official FSSAI Resources</h2>
                            <p className="text-gray-600 mb-4">
                                For more detailed information on food safety regulations and consumer rights, please visit the official FSSAI portal.
                            </p>
                            <a
                                href="https://foscos.fssai.gov.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#1F2933] text-white font-medium py-2 px-6 rounded hover:bg-gray-800 transition-colors"
                            >
                                Visit FSSAI Portal
                            </a>
                        </section>

                        {/* 8. Disclaimer */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Disclaimer</h2>
                            <p className="text-gray-600 leading-relaxed italic">
                                Fresh Sutra acts as a marketplace platform facilitating the sale of products. While we encourage strict compliance and take measures to ensure vendor adherence, the actual preparation and handling of food products are managed by independent third-party vendors.
                            </p>
                        </section>

                        {/* 9. Policy Updates */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Policy Updates</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our FSSAI Compliance policies may be updated from time to time based on new regulatory guidelines or operational changes. Continued use of the platform implies your acceptance of the updated standards.
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

export default FssaiCompliance;
