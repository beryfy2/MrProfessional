import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const FEATURES = [
    { icon: "fa-solid fa-users", title: "One Stop Corporate", subtitle: "Solution" },
    { icon: "fa-solid fa-indian-rupee-sign", title: "PAN India", subtitle: "Services" },
    { icon: "fa-solid fa-user-tie", title: "Free Expert", subtitle: "Assistance" },
    { icon: "fa-solid fa-check-circle", title: "Google Verified", subtitle: "Business" },
    { icon: "fa-solid fa-headset", title: "Dedicated Support", subtitle: "Staff" },
    { icon: "fa-solid fa-rotate-left", title: "Money-Back", subtitle: "Guarantee" },
];

const WhyCompanySection = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">

                {/* Top text*/}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
                        Why Us?
                    </h2>

                    <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                        At Professional Utilities, we leverage our industry knowledge and
                        expertise to help businesses navigate complex regulations, minimize
                        risks, and optimize operations for maximum efficiency and
                        profitability.<br />{" "}
                        <a
                            href="#reviews"
                            className="text-sky-600 font-semibold hover:underline"
                        >
                            Read our reviews.
                        </a>
                    </p>
                </div>

                {/* FEATURES GRID BELOW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                    {FEATURES.map((item) => (
                        <div
                            key={item.title}
                            className="flex items-center gap-4 bg-white rounded-xl
                                shadow-[0_12px_35px_rgba(0,0,0,0.1)]
                                px-6 py-6 hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* GREEN ICON */}
                            <div className="relative shrink-0">
                                <div className="h-14 w-14 rounded-full bg-linear-to-b from-[#63d62c] to-[#0ba341] 
                                    flex items-center justify-center 
                                    shadow-[0_10px_25px_rgba(0,150,0,0.4)]">
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="text-white text-lg"
                                    />
                                </div>
                                <div className="absolute inset-0 rounded-full border border-white/60"></div>
                            </div>

                            {/* Text */}
                            <div className="text-sky-900 text-sm md:text-base font-semibold leading-snug">
                                <div>{item.title}</div>
                                {item.subtitle && <div>{item.subtitle}</div>}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyCompanySection;
