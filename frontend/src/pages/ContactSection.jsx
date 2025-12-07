import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const ContactSection = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: send data to backend or email service
        alert("Form submitted (hook this to your backend later)!");
    };

    return (
        <section className="bg-[#f9fbff] py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-sky-900">
                        Contact Us
                    </h2>
                    <div className="w-20 h-1 bg-green-500 mx-auto mt-3 rounded-full" />
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-8">
                    {/* LEFT: Info cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Address */}
                        <InfoCard
                            icon="fa-solid fa-location-dot"
                            title="Our Address"
                            lines={[
                                "XYZ, Xth Floor, ABC House,",
                                "Nehru Place, New Delhi XXXXXX",
                            ]}
                        />

                        {/* Working hours */}
                        <InfoCard
                            icon="fa-solid fa-clock"
                            title="Working Hours"
                            lines={["Monday - Saturday", "10:00AM - 07:00PM (IST)"]}
                        />

                        {/* Email */}
                        <InfoCard
                            icon="fa-solid fa-envelope"
                            title="Email Us"
                            lines={["support@example.com"]}
                        />

                        {/* Call */}
                        <InfoCard
                            icon="fa-solid fa-phone"
                            title="Call Us"
                            lines={["+91 XXXXXXXXXX"]}
                        />
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded shadow-[0_20px_60px_rgba(0,0,0,0.10)] p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-sky-900 mb-2">
                            Get Expert Assistance
                        </h3>
                        <div className="w-20 h-[3px] bg-green-500 mb-6" />

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name + Mobile */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Mobile No."
                                    className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                required
                            />

                            {/* Message */}
                            <textarea
                                rows={4}
                                placeholder="Message"
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                            />

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="mt-2 inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-2.5 rounded-full shadow-[0_12px_30px_rgba(0,200,0,0.35)] transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const InfoCard = ({ icon, title, lines }) => (
    <div className="bg-white rounded shadow-[0_20px_60px_rgba(0,0,0,0.10)] px-8 py-8 flex flex-col items-center text-center">
        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={icon} className="text-white text-lg" />
        </div>
        <h4 className="text-xl font-bold text-sky-900 mb-2">{title}</h4>
        {lines.map((line, idx) => (
            <p key={idx} className="text-sm text-gray-600">
                {line}
            </p>
        ))}
    </div>
);

export default ContactSection;
