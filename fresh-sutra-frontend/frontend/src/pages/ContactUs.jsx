import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const ContactUs = () => {
    // 1️⃣ Use a single source of truth for form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 3️⃣ Correct handleChange function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 🚨 REQUIRED

        // 🔧 STEP 4: Add Mobile Debug Log (TEMP)
        console.log("Submitting contact form:", formData);

        setLoading(true);
        setError("");

        // Basic validation
        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.message.trim()
        ) {
            setError("Name, email, and message are required.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Request failed");

            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            console.error(err);
            setError("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        We’re here to help and answer your questions.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Support Email</h3>
                            <p className="mt-2 text-base text-gray-500 hover:text-orange-500 transition-colors">
                                <a href="mailto:freshsutra7@gmail.com">freshsutra7@gmail.com</a>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Support Hours</h3>
                            <p className="mt-2 text-base text-gray-500">
                                9:00 AM – 9:00 PM (IST)<br />Monday to Sunday
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
                    {error && !submitted && (
                        <div className="p-4 rounded-lg mb-6 text-center bg-red-50 text-red-600 border border-red-100">
                            {error}
                        </div>
                    )}

                    {submitted ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center animate-fadeIn">
                            <p className="text-green-800 font-medium">
                                Thank you for contacting Fresh Sutra. We’ll get back to you soon.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                {/* 2️⃣ Ensure input name attributes EXACTLY match state keys */}
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    placeholder="Write your message here..."
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
