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



const SolutionSection = () => {
    return (
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
                </div>

            </div>
        </section>
    );
};

export default SolutionSection;
