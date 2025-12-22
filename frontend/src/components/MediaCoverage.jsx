// src/components/MediaCoverage.jsx
import React, { useEffect, useMemo, useState } from "react";

const MEDIA_ITEMS = [
    {
        id: "entrepreneur-hunt",
        outlet: "Entrepreneur Hunt",
        logo: "/media/entrepreneur-hunt.png",
        heading:
            "Filing GST-R and ITR Made Easy With Company",
        body: [
            "GST and ITR filing seems like a nightmare to a person who has never filed GST and ITR returns ever before and those who have already filed GST and ITR returns find it an annoying, cumbersome task and just feel it would be better to rather outsource it, relax than to stress over deadlines and there comes Company to help you file your tax returns at a very affordable cost so that you can relax and not stress over it."
        ],
        link: "#",
    },
    {
        id: "press-trust-india",
        outlet: "Press Trust Of India",
        logo: "/media/pti.png",
        heading:
            "Why Company Is Your Best Choice for EPR Registration & Compliance",
        body: [
            "Company is a reliable partner for EPR registration. If you import products in India, registering under the Extended Producer Responsibility (EPR) rules is now a mandatory requirement.",
            "It is also a step toward reducing environmental impact and promoting sustainable business practices. EPR registration for importers can be confusing, especially with changing guidelines and documentation involved.",
            "That is where we come in. At Company, we take care of the entire process from preparing documents and filing applications to regular follow-ups with the authorities."
        ],
        link: "#",
    },
    {
        id: "hindustan-times",
        outlet: "Hindustan Times",
        logo: "/media/hindustan-times.png",
        heading:
            "Company is making professional services affordable and simple",
        body: [
            "Company is a Delhi-based FinTech startup offering a wide range of professional services to thousands of businesses and individuals across Pan-India.",
            "It was founded by two friends – Abhishek Yadav and Sahil Singh – to bring all professional services onto a single platform. The duo focused on developing a service experience that allowed entrepreneurs to start and manage a business easily."
        ],
        link: "#",
    },
    {
        id: "influencive-india",
        outlet: "Influencive India",
        logo: "/media/influencive-india.png",
        heading:
            "Company – Simplifying the complex Business Problems",
        body: [
            "Did you know that 92% of startups fail within the first three years due to challenges with tax, accounting, and regulatory compliance?",
            "At Company, we're determined to reverse this trend and empower businesses with simplified solutions. Dedicated to revolutionizing the professional services landscape, Company is a Delhi-based FinTech startup."
        ],
        link: "#",
    },
];

const MediaCoverage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // Build overlapping pairs:
    // [0,1], [1,2], [2,3], [3,0]
    const slides = useMemo(() => {
        const arr = [];
        const n = MEDIA_ITEMS.length;
        for (let i = 0; i < n; i += 1) {
            arr.push([MEDIA_ITEMS[i], MEDIA_ITEMS[(i + 1) % n]]);
        }
        return arr;
    }, []);

    // Auto-advance slider
    useEffect(() => {
        if (isHovering) return;

        const id = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000); // 6s per step; tweak if you like

        return () => clearInterval(id);
    }, [slides.length, isHovering]);

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-sky-900">
                        Media Coverage
                    </h2>
                    <div className="h-1 w-24 bg-green-500 mx-auto mt-3 rounded-full" />
                </div>

                {/* Slider wrapper */}
                <div
                    className="relative overflow-hidden rounded-[30px] border border-green-400/60 shadow-xl bg-white "
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Slides row */}
                    <div
                        className="flex transition-transform duration-700 ease-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((pair, idx) => (
                            <div
                                key={idx}
                                className="min-w-full grid gap-8 md:grid-cols-2 px-8 py-10 md:px-12 md:py-12"
                            >
                                {pair.map((item) => (
                                    <MediaCard key={item.id} item={item} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const MediaCard = ({ item }) => {
    return (
        <article className="flex flex-col">
            {/* Outlet + logo */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-sky-900">
                        {item.outlet}
                    </h3>
                    <div className="mt-1 h-1.5 w-16 rounded-full bg-green-500" />
                </div>
                {item.logo && (
                    <img
                        src={item.logo}
                        alt={item.outlet}
                        className="h-10 md:h-12 object-contain"
                    />
                )}
            </div>

            {/* Content */}
            <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                {item.heading}
            </h4>
            <div className="text-[15px] md:text-[16px] leading-relaxed text-gray-700 space-y-2 flex-1">
                {item.body.map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </div>

            {/* Button */}
            <div className="mt-6">
                <a
                    href={item.link}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#21c420] text-white text-sm font-semibold shadow-[0_10px_20px_rgba(0,160,0,0.25)] hover:bg-[#1aa81a] transition"
                >
                    Read More
                </a>
            </div>
        </article>
    );
};

export default MediaCoverage;
