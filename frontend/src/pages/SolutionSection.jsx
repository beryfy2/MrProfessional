import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRocket,
    faIndustry,
    faRightLeft,
    faGears,
    faCertificate,
    faTrademark,
    faBriefcase,
    faCalculator,
    faCircleCheck,
    faArrowRight,
    faSmile,
    faStar,
    faHandshake,
    faSuitcase,
    faFileInvoiceDollar,
    faScaleBalanced
} from "@fortawesome/free-solid-svg-icons";

import startBusinessImg from "../assets/solutions/start-business.svg";
import manufacturingImg from "../assets/solutions/manufacturing.svg";
import importExportImg from "../assets/solutions/import-export.svg";
import gemImg from "../assets/solutions/gem.svg";
import eprBisImg from "../assets/solutions/epr-bis.svg";
import trademarkImg from "../assets/solutions/trademark.svg";
import taxAccountingImg from "../assets/solutions/tax-accounting.svg";


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



const SolutionSection = () => {
    const [activeId, setActiveId] = useState(CATEGORIES[0].id);
    const activeCategory = CATEGORIES.find((c) => c.id === activeId);

    return (
        <section className="bg-[var(--bg-main)] py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                        One-Stop Corporate Solution
                    </h2>
                    <p className="mt-3 text-[var(--text-secondary)] max-w-3xl mx-auto">
                        Startup or an established business, you'll find Mr Professional services{" "}
                        <span className="text-[var(--color-brand)] font-semibold">fast</span>,{" "}
                        <span className="text-[var(--color-brand)] font-semibold">affordable</span> and{" "}
                        <span className="text-[var(--color-brand)] font-semibold">hassle-free</span>.
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
                    ${isActive ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-white" : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--color-brand)]"}`}><span className={`flex h-9 w-9 items-center justify-center rounded-full border-2
                    ${isActive ? "bg-[var(--bg-secondary)] border-[var(--color-brand)] text-[var(--text-primary)]" : "bg-[var(--color-brand)]/10 border-[var(--color-brand)] text-[var(--color-brand)]" }`}>
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
                        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                            {activeCategory.question}
                        </h3>
                        <p className="text-[var(--text-secondary)] mb-5">{activeCategory.subtitle}</p>

                        <div className="space-y-3">
                            {activeCategory.services.map((service) => (
                                <div
                                    key={service}
                                    className="flex items-center justify-between bg-[var(--bg-secondary)] rounded-full px-4 py-3 hover:opacity-90 transition cursor-pointer shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-brand)] text-white">
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </span>
                                        <span className="text-sm md:text-[15px] text-[var(--text-primary)] font-medium">
                                            {service}
                                        </span>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="text-[var(--color-brand)] text-sm"
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
                    <div className="rounded-3xl bg-[var(--bg-secondary)] text-white px-8 py-8 md:py-10 shadow-lg border border-[var(--border-color)]">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                            <StatItem
                                icon={faSmile}
                                value="5K+"
                                label="Happy Clients"
                                accent="text-[var(--color-brand)]"
                            />
                            <StatItem
                                icon={faSuitcase}
                                value="250+"
                                label="Professional Services"
                                accent="text-[var(--color-brand)]"
                            />
                            <StatItem
                                icon={faStar}
                                value="500+"
                                label="5 Star Reviews"
                                accent="text-[var(--color-brand)]"
                            />
                            <StatItem
                                icon={faHandshake}
                                value="20K+"
                                label="Questions Solved"
                                accent="text-[var(--color-brand)]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StatItem = ({ icon, value, label, accent = "text-[var(--color-brand)]" }) => (
    <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[var(--bg-hover)] flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-white text-lg" />
        </div>
        <div className={`text-3xl font-bold ${accent}`}>{value}</div>
        <div className="text-sm md:text-base font-semibold">{label}</div>
    </div>
);

export default SolutionSection;
