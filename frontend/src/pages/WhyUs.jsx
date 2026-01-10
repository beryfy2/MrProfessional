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
        <section className="bg-(--bg-main) py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">

                {/* Top text */}
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-(--text-primary) mb-3">
                        Why Us?
                    </h2>

                    <p className="text-(--text-secondary) text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                        At Mr Professional, we leverage our industry knowledge and
                        expertise to help businesses navigate complex regulations, minimize
                        risks, and optimize operations for maximum efficiency and
                        profitability.
                        <br />
                        <a
                            href="#reviews"
                            className="text-(--color-brand) font-semibold hover:underline inline-block mt-2"
                        >
                            Read our reviews.
                        </a>
                    </p>
                </div>

                {/* FEATURES GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-x-10 md:gap-y-10">
                    {FEATURES.map((item) => (
                        <div
                            key={item.title}
                            className="flex items-center gap-4 bg-(--bg-main) border border-(--border-color) rounded-xl
                                shadow-md
                                px-5 py-5 md:px-6 md:py-6 
                                hover:-translate-y-1 hover:shadow-lg
                                transition-all duration-300"
                        >
                            {/* ICON */}
                            <div className="relative shrink-0">
                                <div className="h-12 w-12 md:h-14 md:w-14 rounded-full 
                                    bg-linear-to-b from-[#63d62c] to-[#0ba341]
                                    flex items-center justify-center
                                    shadow-[0_10px_25px_rgba(0,150,0,0.4)]">

                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="text-white text-base md:text-lg"
                                    />
                                </div>

                                <div className="absolute inset-0 rounded-full border border-(--border-color)"></div>
                            </div>

                            {/* Text */}
                            <div className="text-(--text-primary) text-sm md:text-base font-semibold leading-snug">
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
