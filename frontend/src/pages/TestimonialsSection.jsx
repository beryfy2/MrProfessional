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
        text: `Thank you so much Mr Professional team for their wonderful help. I really appreciate your efforts in getting start business. Pvt Ltd company registration was smooth yet quick.`,
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

const PER_PAGE_DESKTOP = 3;
const PER_PAGE_MOBILE = 1;

const TestimonialsSection = () => {
    const [page, setPage] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const resize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const PER_PAGE = isMobile ? PER_PAGE_MOBILE : PER_PAGE_DESKTOP;
    const totalPages = Math.ceil(TESTIMONIALS.length / PER_PAGE);
    const start = page * PER_PAGE;
    const visible = TESTIMONIALS.slice(start, start + PER_PAGE);

    const goPrev = () =>
        setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
    const goNext = () =>
        setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

    useEffect(() => {
        if (isHover) return;
        const id = setInterval(() => {
            setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
        }, 3000);
        return () => clearInterval(id);
    }, [isHover, totalPages]);

    return (
        <section
            className="
                py-24
                bg-(--bg-secondary)
                text-(--text-primary)
            "
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="max-w-6xl mx-auto px-4 text-(--text-primary)">

                {/* Heading */}
                <div className="text-center mb-10">
                    <p className="text-lg md:text-2xl font-semibold text-(--color-brand)">
                        "Explore how Company has helped businesses reach new heights as their trusted partner."
                    </p>
                    <div className="w-16 h-1 bg-green-400 mx-auto mt-4 rounded-full" />
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">

                    {/* LEFT */}
                    <div className="space-y-6 text-center lg:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-green-400">
                            Testimonials
                        </h3>

                        <RatingRow
                            iconClass="fa-brands fa-google"
                            iconBg="bg-[var(--bg-main)]"
                            iconColor="text-[#4285F4]"
                            label="Google Customer Rating"
                            score="4.7"
                        />

                        {/* Arrows */}
                        <div className="hidden lg:flex items-center gap-3 mt-6">
                            <button
                                onClick={goPrev}
                                className="h-9 w-9 rounded-full bg-(--bg-main) text-[#03538e] flex items-center justify-center shadow"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                            </button>
                            <button
                                onClick={goNext}
                                className="h-9 w-9 rounded-full bg-(--bg-main) text-[#03538e] flex items-center justify-center shadow"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                            </button>
                        </div>
                    </div>

                    {/* SLIDER */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {visible.map((t) => (
                                <div
                                    key={t.id}
                                    className="bg-(--bg-main) rounded-3xl shadow-lg px-6 py-6 border-b-4 border-b-(--color-brand)
                                        flex flex-col justify-between min-h-80"
                                >
                                    <div>
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-quote-left"
                                            className="text-(--color-brand) mb-3"
                                        />
                                        <p className="text-sm leading-relaxed text-(--text-secondary)">
                                            {t.text}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 mt-5 pt-4 border-t">
                                        <div className="h-10 w-10 rounded-full bg-(--color-brand)/10 flex items-center justify-center font-bold">
                                            {t.initials}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-sm">
                                                {t.name}
                                            </span>
                                            <div className="flex items-center gap-2 text-xs">
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

                        {/* DOTS */}
                        <div className="flex justify-center gap-2 mt-4">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i)}
                                    className={`h-2 w-2 rounded-full ${i === page
                                        ? "bg-(--color-brand)"
                                        : "bg-(--text-secondary)/40"
                                        }`}
                                />
                            ))}
                        </div>
                        {/* MOBILE arrows (below dots) */}
                        <div className="flex lg:hidden justify-center gap-4 mt-4">
                            <button
                                onClick={goPrev}
                                className="h-9 w-9 rounded-full bg-(--bg-main) text-[#03538e]
      flex items-center justify-center shadow hover:bg-(--bg-hover)"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                            </button>

                            <button
                                onClick={goNext}
                                className="h-9 w-9 rounded-full bg-(--bg-main) text-[#03538e]
      flex items-center justify-center shadow hover:bg-(--bg-hover)"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                            </button>
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
