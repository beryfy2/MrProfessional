import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

const TESTIMONIALS = [
    {
        id: 1,
        name: "Prashant Agawekar",
        platform: "Google",
        rating: 5,
        initials: "P",
        text: `Great & helpful support by everyone. I got response & support whenever I called to your system. Heartly thanx for Great & Super Service. Have a Great & Bright future of team & your company.`,
    },
    {
        id: 2,
        name: "Abhishek Kumar",
        platform: "Google",
        rating: 5,
        initials: "A",
        text: `Thank you so much Professional Utilities team for their wonderful help. I really appreciate your efforts in getting start business. Pvt Ltd company registration was smooth yet quick.`,
    },
    {
        id: 3,
        name: "Vidushi Saini",
        platform: "Google",
        rating: 5,
        initials: "V",
        text: `I applied for Drug licence and company registration and their follow-up for work and regular updates helped me a lot. They are happily available for any kind of business consultancy.`,
    },
    {
        id: 4,
        name: "Rahul Sharma",
        platform: "Google",
        rating: 5,
        initials: "R",
        text: `Very professional and prompt service. All my queries were answered and company incorporation was done on time as promised.`,
    },
    {
        id: 5,
        name: "Sneha Gupta",
        platform: "Google",
        rating: 5,
        initials: "S",
        text: `Highly recommended for startups. Team guided us from registration to compliance in a very simple way.`,
    },
    {
        id: 6,
        name: "Atish Singh",
        initials: "A",
        rating: 5,
        text: "It was a great experience working with Company. They have provided the smoothly. It shows the amount of confidence they are having in their field of work.",
    },
    {
        id: 7,
        name: "Ravi Kumar",
        initials: "R",
        rating: 5,
        text: "It was professional and friendly experience quick response and remarkable assistance. I loved PU service for section 8 company registration for our Vidyadhare Foundation.",
    },
    {
        id: 8,
        name: "Ananya Sharma",
        initials: "A",
        rating: 5,
        text: "I needed a material safety data sheet for my product and they got it delivered in just 3 days. I am very happy with their professional and timely service. Trust me you can count on them.",
    },
    {
        id: 9,
        name: "Prashant Agawekar",
        initials: "P",
        rating: 5,
        text: "Great & helpful support by everyone. I got response & support whenever I called to your system. Heartly thanx for Great & Super Service. Have a Great & Bright future of team & your company.",
    },
    {
        id: 10,
        name: "Abhishek Kumar",
        initials: "A",
        rating: 5,
        text: "Thank you so much Company team for their wonderful help. I really appreciate your efforts in getting start business. Pvt Ltd company registration was smooth yet quick.",
    },
    {
        id: 11,
        name: "Vidushi Saini",
        initials: "V",
        rating: 5,
        text: "I applied for Drug licence and company registration and their follow-up for work and regular updates helped me a lot. They are happily available for any kind of business consultancy.",
    },
    {
        id: 12,
        name: "Taniya Garyali",
        initials: "T",
        rating: 5,
        text: "Great experience went to get my ITR done, process was quite convenient and fast. Had a few queries, am happy about the fact those people explained me all things I wanted to know.",
    },
];

const PER_PAGE = 3;

const TestimonialsSection = () => {
    const [page, setPage] = useState(0);
    const [isHover, setIsHover] = useState(false);

    const totalPages = Math.ceil(TESTIMONIALS.length / PER_PAGE);
    const start = page * PER_PAGE;
    const visible = TESTIMONIALS.slice(start, start + PER_PAGE);

    const goPrev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
    const goNext = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

        
    useEffect(() => {
        if (isHover) return;
        const id = setInterval(() => {
            setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
        }, 2400);
        return () => clearInterval(id);
    }, [isHover, totalPages]);

    return (
        <section
            className="
    py-24
    bg-gradient-to-b
    from-[#0b5fa5]
    via-[#0a4f8a]
    to-[#083b67]
  "
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="max-w-6xl mx-auto px-4 text-white">
                {/* Heading */}
                <div className="text-center mb-10">
                    <p className="text-xl md:text-2xl font-semibold text-green-400">
                        "Explore how Company has helped businesses reach new heights as their trusted partner."
                    </p>
                    <div className="w-16 h-1 bg-green-400 mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 items-start">
                    {/* LEFT SIDE: ratings & arrows */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-green-400">Testimonials</h3>

                        <div className="space-y-4 text-sm">
                            <RatingRow
                                iconClass="fa-brands fa-google"
                                iconBg="bg-white"
                                iconColor="text-[#4285F4]"
                                label="Google Customer Rating"
                                score="4.9"
                            />
                            <RatingRow
                                iconClass="fa-solid fa-star"
                                iconBg="bg-green-500"
                                iconColor="text-white"
                                label="Trustpilot Customer Rating"
                                score="4.5"
                            />
                            <RatingRow
                                iconClass="fa-solid fa-circle"
                                iconBg="bg-orange-500"
                                iconColor="text-white"
                                label="Justdial Customer Rating"
                                score="4.7"
                                customInner="Jd"
                            />
                        </div>

                        {/* 10+ years badge */}
                        <div className="mt-4">
                            <div className="inline-flex flex-col items-start gap-1">
                                <div className="text-4xl font-extrabold text-yellow-300 leading-none">
                                    10<span className="text-2xl">+</span>
                                </div>
                                <div className="text-xs tracking-[0.2em] uppercase text-white/80">
                                    Years of Professional
                                </div>
                                <div className="text-base font-semibold">Experience</div>
                            </div>
                        </div>

                        {/* Arrows */}
                        <div className="flex items-center gap-3 mt-6">
                            <button
                                onClick={goPrev}
                                className="h-9 w-9 rounded-full bg-white text-[#03538e] flex items-center justify-center shadow hover:bg-slate-100"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                            </button>
                            <button
                                onClick={goNext}
                                className="h-9 w-9 rounded-full bg-white text-[#03538e] flex items-center justify-center shadow hover:bg-slate-100"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                            </button>
                        </div>
                    </div>

                    {/* cards slider */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                            {visible.map((t) => (
                                <div
                                    key={t.id}
                                    className="bg-white text-slate-800 rounded-3xl shadow-lg px-6 py-6 border-b-4 border-green-400 
                                        flex flex-col justify-between min-h-[360px] h-full"
                                >
                                    <div>
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-quote-left"
                                            className="text-sky-300 text-lg mb-3"
                                        />
                                        <p className="text-sm leading-relaxed text-slate-700">
                                            {t.text}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                                        <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-sm overflow-hidden">
                                            {t.initials}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">{t.name}</span>
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <FontAwesomeIcon
                                                    icon="fa-brands fa-google"
                                                    className="text-[#4285F4]"
                                                />
                                                <Stars count={t.rating} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i)}
                                    className={`h-2 w-2 rounded-full transition ${i === page ? "bg-white" : "bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const RatingRow = ({
    iconClass,
    iconBg,
    iconColor,
    label,
    score,
    customInner,
}) => (
    <div className="flex items-center gap-3">
        <div
            className={`flex items-center justify-center h-8 w-8 rounded-full ${iconBg} ${iconColor} text-xl`}
        >
            {customInner ? (
                <span className="text-xs font-bold">{customInner}</span>
            ) : (
                <FontAwesomeIcon icon={iconClass} />
            )}
        </div>
        <div>
            <div className="font-semibold">{label}</div>
            <div className="flex items-center gap-2">
                <span className="font-bold">{score}</span>
                <Stars count={5} />
            </div>
        </div>
    </div>
);

const Stars = ({ count = 5 }) => (
    <span className="flex items-center gap-0.5 text-yellow-300">
        {Array.from({ length: 5 }).map((_, i) => (
            <FontAwesomeIcon
                key={i}
                icon="fa-solid fa-star"
                className={i < count ? "opacity-100" : "opacity-30"}
            />
        ))}
    </span>
);

export default TestimonialsSection;