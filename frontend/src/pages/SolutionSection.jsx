<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRocket,
    faCircleCheck,
    faArrowRight,
    faSmile,
    faStar,
    faHandshake,
    faSuitcase,
    faFileInvoiceDollar,
    faScaleBalanced
} from "@fortawesome/free-solid-svg-icons";


const CATEGORIES = [
    {
        id: "Accounting",
        label: "Accounting",
        icon: faRocket,
        question: "Get Your Accounting Done Right",
        services: [
            "Book Keeping",
            "Day to Day Accounting",
            "Maintenance of Documents",
            "Budgeting and Valuations",
            "Periodic Review and Finalisation of Accounts",
            "Monthly Compliance Management",
            "ERP and SOP Implementation",
            "Financial Due Diligence and Financial Modelling",
            "Business Risk Analysis",
            "Business Valuation Services",
            "Statutory Audits, Tax Audits, External Audits, Internal Audits",
            "Financialization of Final Accounts"
        ],
    },

    {
        id: "taxation",
        label: "Taxation",
        icon: faFileInvoiceDollar,
        question: "Taxation Services",
        subtitle:
            "Comprehensive tax solutions with round-the-clock expert attention.",
        services: [
            "Round the Clock Attention",
            "Individual Income Tax Return Filing",
            "Business / Corporate Income Tax Return Filing",
            "Income Tax Audit Support Service",
            "TDS and TCS Compliance Services",
            "Refund Process",
            "Advisory Services",
            "Assessment Support",
            "Annual Return Support Services",
            "Income Tax and GST Advisory",
            "Transaction Consulting"
        ],
    },

    {
        id: "legal-licenses",
        label: "Legal & Licenses",
        icon: faScaleBalanced,
        question: "Legal and License Services",
        subtitle:
            "Complete legal compliance and licensing support for your business.",
        services: [
            "Incorporation of Company and LLP (Including Advisory)",
            "Drafting of Agreements (Term Sheet, SS&SHA, ESOPs)",
            "IPR Support (Patent, Copyright, Trademark)",
            "Shareholder Structuring",
            "Import Export Code Registration",
            "Food License (FSSAI)",
            "MSME Registration",
            "DIPP Registration for Startup",
            "Section 8 Company Registration",
            "Partnership Registration",
            "Proprietorship / Firm Registration",
            "Society Registration",
            "Trust Registration"
        ],
    },
];


=======
import React from "react";
>>>>>>> 15d094f91c9ebb819ec3d47c77053f64251b92a9

const SolutionSection = () => {
    return (
<<<<<<< HEAD
        <section className="bg-(--bg-main) py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-(--text-primary)">
                        One-Stop Corporate Solution
                    </h2>
                    <p className="mt-3 text-(--text-secondary) max-w-3xl mx-auto">
                        Startup or an established business, you'll find Mr Professional services{" "}
                        <span className="text-(--color-brand) font-semibold">fast</span>,{" "}
                        <span className="text-(--color-brand) font-semibold">affordable</span> and{" "}
                        <span className="text-(--color-brand) font-semibold">hassle-free</span>.
                    </p>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1.4fr)_minmax(0,1fr)] gap-8 items-start">
                    {/* Lf Vertical Tabs */}
                    <div className="space-y-3">
                        {CATEGORIES.map((cat) => {
                            const isActive = cat.id === activeId;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setActiveId(cat.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition shadow-sm
                    ${isActive ? "bg-(--color-brand) border-(--color-brand) text-white" : "bg-(--bg-secondary) border-(--border-color) text-(--text-primary) hover:border-(--color-brand)"}`}><span className={`flex h-9 w-9 items-center justify-center rounded-full border-2
                    ${isActive ? "bg-(--bg-secondary) border-(--color-brand) text-(--text-primary)" : "bg-(--color-brand)/10 border-(--color-brand) text-(--color-brand)"}`}>
                                        <FontAwesomeIcon icon={cat.icon} className="text-sm" />
                                    </span>
                                    <span className="font-semibold text-sm md:text-[15px]">
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Services List */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-2">
                            {activeCategory.question}
                        </h3>
                        <p className="text-(--text-secondary) mb-5">{activeCategory.subtitle}</p>

                        <div className="space-y-3">
                            {activeCategory.services.map((service) => (
                                <div
                                    key={service}
                                    className="flex items-center justify-between bg-(--bg-secondary) rounded-full px-4 py-3 hover:opacity-90 transition cursor-pointer shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-(--color-brand) text-white">
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </span>
                                        <span className="text-sm md:text-[15px] text-(--text-primary) font-medium">
                                            {service}
                                        </span>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="text-(--color-brand) text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Illustration */}
                    <div className="flex justify-center md:justify-end">


                    </div>
                </div>

                {/* stats bar */}
                <div className="mt-14">
                    <div className="rounded-3xl bg-(--bg-secondary) text-white px-8 py-8 md:py-10 shadow-lg border border-(--border-color)">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

                            <StatItem icon={faSmile} value="5K+" label="Happy Clients" />
                            <StatItem icon={faSuitcase} value="250+" label="Professional Services" />
                            <StatItem icon={faStar} value="500+" label="5 Star Reviews" />
                            <StatItem icon={faHandshake} value="20K+" label="Questions Solved" />

                        </div>
                    </div>
=======
        <section className="bg-[var(--bg-main)] py-14">
            <div className="max-w-4xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                        Mr.Professional
                    </h2>
                    <p className="mt-3 text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Incubation-driven professional services for India’s startup ecosystem
                    </p>
                </div>

                {/* Content */}
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 md:p-8 shadow-md border border-[var(--border-color)] text-[var(--text-secondary)] text-[15px] md:text-base leading-relaxed space-y-4">
                    <p>
                        <span className="font-semibold text-[var(--text-primary)]">
                            Mr.Professional
                        </span>{" "}
                        is a fast-growing incubation-driven professional services brand established
                        by <span className="font-semibold text-[var(--text-primary)]">
                            M/s Aaramo Private Limited
                        </span>, headquartered in Ghaziabad, Uttar Pradesh. The organization provides
                        technology-enabled incubation and professional services to entrepreneurs
                        across India, both online and offline.
                    </p>

                    <p>
                        With <span className="font-semibold text-[var(--text-primary)]">8 offices nationwide</span>,
                        a young team of Chartered Accountants, Company Secretaries, legal experts,
                        and IIM-trained professionals, Mr.Professional supports startups from
                        ideation to growth by simplifying business setup, compliance, and legal
                        processes.
                    </p>

                    <p>
                        Recognized among the{" "}
                        <span className="font-semibold text-[var(--text-primary)]">
                            Top 400 Startups in India
                        </span>{" "}
                        with Angel Tax Exemption approval, Mr.Professional works closely with GoUP
                        Innovation Hub (AKTU), supports startups across leading institutions, and
                        currently empowers{" "}
                        <span className="font-semibold text-[var(--text-primary)]">
                            2,500+ B2B startups
                        </span>{" "}
                        nationwide as a partner of the Government of Uttar Pradesh, BSE, and Amazon.
                    </p>
>>>>>>> 15d094f91c9ebb819ec3d47c77053f64251b92a9
                </div>

            </div>
        </section>
    );
};

<<<<<<< HEAD

const StatItem = ({ icon, value, label }) => {
    const number = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = React.useRef(null);

    /* Detect when visible */
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                }
            },
            { threshold: 0.4 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    /* Run counter */
    useEffect(() => {
        if (!started) return;

        let start = 0;
        const duration = 1500;
        const step = 20;
        const increment = number / (duration / step);

        const timer = setInterval(() => {
            start += increment;

            if (start >= number) {
                setCount(number);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, step);

        return () => clearInterval(timer);
    }, [started, number]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-(--bg-hover) flex items-center justify-center">
                <FontAwesomeIcon icon={icon} className="text-white text-lg" />
            </div>

            <div className="text-3xl font-bold text-(--color-brand)">
                {count}{suffix}
            </div>

            <div className="text-sm md:text-base font-semibold">
                {label}
            </div>
        </div>
    );
};



=======
>>>>>>> 15d094f91c9ebb819ec3d47c77053f64251b92a9
export default SolutionSection;
