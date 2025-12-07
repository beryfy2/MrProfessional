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
        id: "start-business",
        label: "Start Business",
        icon: faRocket,
        question: "Starting A New Business?",
        subtitle: "Incorporate your business with Professional Utilities:",
        image: startBusinessImg,
        services: [
            "Private Limited Company",
            "Sole Proprietorship",
            "Limited Liability Partnership",
            "NGO Registration",
            "Nidhi Company",
            "Partnership Firm",
            "Hotel Registration",
        ],
    },
    {
        id: "manufacturing",
        label: "Manufacturing",
        icon: faIndustry,
        question: "Manufacturing",
        subtitle:
            "Empower your production with expert manufacturing solutions.",
        image: manufacturingImg,
        services: [
            "Factory License",
            "NOC From Pollution Board",
            "Fire NOC",
            "EPF & ESIC",
            "EPR from CPCB",
            "Packaging License",
        ],
    },
    {
        id: "import-export",
        label: "Import Export",
        icon: faRightLeft,
        question: "For Importers and Exporters",
        subtitle:
            "Streamline global trade with seamless import-export solutions.",
        image: importExportImg,
        services: [
            "Import Export Code",
            "MSDS Certificate",
            "Spices Board Registration",
            "APEDA Registration",
            "SAFTA License",
            "FSSAI Central License",
        ],
    },
    {
        id: "gem-services",
        label: "GeM Services",
        icon: faGears,
        question: "GeM Services",
        subtitle: "Get registered and sell on the Government e-Marketplace.",
        image: gemImg,
        services: [
            "GeM Seller Registration",
            "OEM Registration",
            "Brand Approval",
            "Vendor Assessment",
        ],
    },
    {
        id: "epr-bis",
        label: "EPR & BIS",
        icon: faCertificate,
        question: "EPR & BIS Compliance",
        subtitle: "Meet environmental and product quality compliance easily.",
        image: eprBisImg,
        services: [
            "EPR Registration",
            "Plastic Waste EPR",
            "Battery Waste EPR",
            "BIS License",
            "ISI Mark Certification",
        ],
    },
    {
        id: "trademark-ip",
        label: "Trademark & IP",
        icon: faTrademark,
        question: "Trademark & Intellectual Property",
        subtitle: "Protect your brand and innovations.",
        image: trademarkImg,
        services: [
            "Trademark Registration",
            "Copyright Registration",
            "Patent Filing",
            "Design Registration",
        ],
    },
    {
        id: "manage-business",
        label: "Manage Business",
        icon: faBriefcase,
        question: "Manage Business",
        subtitle: "Manage your business legally and financially.",
        image: startBusinessImg,
        services: [
            "ROC Compliance",
            "Annual Filing",
            "Director KYC",
            "Change in Company Details",
        ],
    },
    {
        id: "tax-accounting",
        label: "Tax & Accounting",
        icon: faCalculator,
        question: "Tax & Accounting",
        subtitle: "All taxation and accounting services in one place.",
        image: taxAccountingImg,
        services: [
            "GST Registration",
            "GST Return Filing",
            "ITR Filing",
            "TDS Return",
            "Accounting & Bookkeeping",
        ],
    },
];

const SolutionSection = () => {
    const [activeId, setActiveId] = useState(CATEGORIES[0].id);
    const activeCategory = CATEGORIES.find((c) => c.id === activeId);

    return (
        <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-sky-900">
                        One-Stop Corporate Solution
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
                        Startup or an established business, you'll find Professional
                        Utilities services{" "}
                        <span className="text-green-500 font-semibold">fast</span>,{" "}
                        <span className="text-green-500 font-semibold">affordable</span> and{" "}
                        <span className="text-green-500 font-semibold">hassle-free</span>.
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
                    ${isActive ? "bg-sky-900 border-sky-900 text-white" : "bg-white border-gray-200 text-sky-900 hover:border-sky-400"}`}><span className={`flex h-9 w-9 items-center justify-center rounded-full border-2
                    ${isActive ? "bg-green-500 border-green-500 text-white" : "bg-green-100 border-green-400 text-green-600" }`}>
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
                        <h3 className="text-2xl md:text-3xl font-bold text-sky-900 mb-2">
                            {activeCategory.question}
                        </h3>
                        <p className="text-gray-600 mb-5">{activeCategory.subtitle}</p>

                        <div className="space-y-3">
                            {activeCategory.services.map((service) => (
                                <div
                                    key={service}
                                    className="flex items-center justify-between bg-sky-50 rounded-full px-4 py-3 hover:bg-sky-100 transition cursor-pointer shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </span>
                                        <span className="text-sm md:text-[15px] text-sky-900 font-medium">
                                            {service}
                                        </span>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="text-sky-500 text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Illustration */}
                    <div className="flex justify-center md:justify-end">

                        <img
                            src={activeCategory.image}
                            alt={activeCategory.label}
                            className="
                                w-full h-full
                                max-h-120
                                object-contain
                            "
                        />

                    </div>
                </div>

                {/* stats bar */}
                <div className="mt-14">
                    <div className="rounded-3xl bg-linear-to-r from-sky-700 to-sky-900 text-white px-8 py-8 md:py-10 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                            <StatItem
                                icon={faSmile}
                                value="5K+"
                                label="Happy Clients"
                                accent="text-green-400"
                            />
                            <StatItem
                                icon={faSuitcase}
                                value="250+"
                                label="Professional Services"
                                accent="text-green-400"
                            />
                            <StatItem
                                icon={faStar}
                                value="500+"
                                label="5 Star Reviews"
                                accent="text-green-400"
                            />
                            <StatItem
                                icon={faHandshake}
                                value="20K+"
                                label="Questions Solved"
                                accent="text-green-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StatItem = ({ icon, value, label, accent = "text-green-400" }) => (
    <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-white text-lg" />
        </div>
        <div className={`text-3xl font-bold ${accent}`}>{value}</div>
        <div className="text-sm md:text-base font-semibold">{label}</div>
    </div>
);

export default SolutionSection;
