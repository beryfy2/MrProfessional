import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            <NavBar />
            
            {/* Hero Section */}
            <div className="bg-[var(--color-brand)] text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-14xl">
                <div className="bg-[var(--bg-secondary)] rounded-lg shadow-lg p-8 border border-[var(--border-color)]">
                    <div className="prose max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Commitment to Privacy</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                We provide this Privacy Policy to make you aware of our privacy practices and of the choices you can make about the way your information is collected and used. This Privacy Policy describes what information we may collect about you; how we use your information; how we protect it; and what choices you have about how that information is used.
                            </p>
                            <p className="text-[var(--text-secondary)]">
                                We may revise any portion of the Site, including this Privacy Policy, from time to time to keep up with technical innovation, post new Site content, and for other reasons. All revisions to this Privacy Policy will be effective upon notice given by means of posting the revised Privacy Policy on the Site, with a new effective date posted at the top.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Information We Collect from Website Users</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                "Personal Information" includes information that can be used to identify a unique individual, such as a name, physical address, e-mail address, or telephone number. We collect Personal Information when you register for our news and events, or request a download of our case studies or white papers. We also collect Personal Information when you email or otherwise contact us through or regarding the Site.
                            </p>
                            <p className="text-[var(--text-secondary)]">
                                We may also automatically collect information that includes Personal Information from all Site visitors, even if he or she does not register for the services discussed above. For example, we may use "cookies" or other technology to collect information about your use of the Site or emails we send to you.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Use of the Information We Collect from Website Users</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                We may use your Personal Information internally for our own purposes, including to manage and maintain the Site, to provide or improve our services to you, to analyze your use of the Site, to study trends regarding use of the Site, to comply with our contractual obligations, or to fulfill other legitimate interests.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Third Parties</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                Your Personal Information will not be sold, disclosed, or made available to any third party without your permission except as set forth in this Privacy Policy. We do not share your Personal Information with third parties for direct marketing purposes.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Cookies and Do Not Track</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                Cookies are unique identifiers sent to your device by a web server and stored on your device's storage. A cookie allows many sites to identify you upon each visit with a personalized message before you actively login or to track a returning user.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Security</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                We use commercially reasonable administrative, physical, and technical measures that are reasonably designed to safeguard your personal information and help protect it from unauthorized access. However, we cannot guarantee the security of your information since no security can be 100% effective.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Commitment to Children's Privacy</h2>
                            <p className="text-[var(--text-secondary)]">
                                We do not knowingly collect or maintain personally identifiable information from persons under 13 years of age, and no part of our website is directed to persons under 13. If you are under 13 years of age, then please do not use or access this website at any time or in any manner.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Contact Us</h2>
                            <p className="text-[var(--text-secondary)]">
                                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <p className="text-[var(--text-secondary)] mt-2">
                                Email: info@professionalutilities.com<br />
                                Phone: +1 (800) 123-4567
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[var(--bg-main)] text-white">
                <Footer />
            </div>
        </div>
    );
};

export default PrivacyPolicy;
