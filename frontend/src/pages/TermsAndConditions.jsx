import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            <NavBar />
            
            {/* Hero Section */}
            <div className="bg-[var(--color-brand)] text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">Terms and Conditions</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-[var(--bg-secondary)] rounded-lg shadow-lg p-8 border border-[var(--border-color)]">
                    <div className="prose max-w-none">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Terms of Service</h2>
                        <p className="text-[var(--text-secondary)] mb-4">
                            Welcome to Professional Utilities. By accessing or using our website, you agree to be bound by these Terms of Service.
                        </p>
                        
                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">1. Acceptance of Terms</h3>
                        <p className="text-[var(--text-secondary)] mb-4">
                            By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">2. Services</h3>
                        <p className="text-[var(--text-secondary)] mb-4">
                            We provide various business registration and compliance services. The specific services you receive will be outlined in your service agreement.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">3. User Responsibilities</h3>
                        <p className="text-[var(--text-secondary)] mb-4">
                            You agree to provide accurate and complete information when using our services and to update this information as necessary.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">4. Payment Terms</h3>
                        <p className="text-[var(--text-secondary)] mb-4">
                            Payment is due as specified in your service agreement. Late payments may be subject to additional fees.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">5. Refund Policy</h3>
                        <p className="text-[var(--text-secondary)] mb-4">
                            Refunds are processed according to our Refund Policy. Please contact our support team for more information.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">6. Limitation of Liability</h3>
                        <p className="text-[var(--text-secondary)] mb-4">
                            Professional Utilities shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">7. Governing Law</h3>
                        <p className="text-[var(--text-secondary)] mb-4">
                            These terms shall be governed by and construed in accordance with the laws of India.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">8. Changes to Terms</h3>
                        <p className="text-[var(--text-secondary)] mb-4">
                            We reserve the right to modify these terms at any time. Your continued use of our services constitutes acceptance of any changes.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">9. Contact Us</h3>
                        <p className="text-[var(--text-secondary)]">
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <p className="text-[var(--text-secondary)] mt-2">
                            Email: support@professionalutilities.com<br />
                            Phone: +91 XXXXXXXXXX
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;
