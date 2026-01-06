import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            <NavBar />
            
            {/* Hero Section */}
            <div className="bg-[var(--color-brand)] text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">Refund & Cancellation Policy</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-[var(--bg-secondary)] rounded-lg shadow-lg p-8 border border-[var(--border-color)]">
                    <div className="prose max-w-none">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Refund & Cancellation Policy</h2>
                        
                        <div className="space-y-6 text-[var(--text-secondary)]">
                            <p>
                                At Mr Professional, we strive to provide the best services to our clients. Please read our refund and cancellation policy carefully.
                            </p>

                            <div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">1. Refund Policy</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Refunds are processed as per the terms agreed upon in the service agreement.</li>
                                    <li>Service fees are non-refundable once the service has been initiated.</li>
                                    <li>In case of duplicate payment, the excess amount will be refunded within 7-10 working days.</li>
                                    <li>Refunds will be processed through the original mode of payment.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">2. Cancellation Policy</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Service cancellation requests must be made in writing to support@professionalutilities.com</li>
                                    <li>Cancellation requests will be processed within 2-3 working days.</li>
                                    <li>No cancellation is possible once the service has been delivered.</li>
                                    <li>Any government fees or third-party charges already paid are non-refundable.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3. Processing Time</h3>
                                <p>
                                    Refunds are typically processed within 7-10 working days from the date of approval. The time taken to reflect in your account may vary depending on your bank.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4. Contact Us</h3>
                                <p>
                                    For any queries regarding refunds or cancellations, please contact us at:
                                </p>
                                <p className="mt-2">
                                    Email: support@professionalutilities.com<br />
                                    Phone: +91 XXXXXXXXXX
                                </p>
                            </div>

                            <div className="pt-4 border-t border-[var(--border-color)]">
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Last updated: December 26, 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RefundPolicy;