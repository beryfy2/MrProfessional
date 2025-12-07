import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faFire,
} from "@fortawesome/free-solid-svg-icons";

const links = [
    "Business Setup",
    "Registrations",
    "Import Export",
    "Compliance",
    "BIS",
    "IPR",
    "Tax",
    "Legal",
    "Tender",
    "Blogs",
    "More",
];

export default function NavItems({
    transparent = false,
}) {
    const solidBg = "bg-[#0f4260]";
    const glassBg = "bg-[#0f4260]/40";
    const finalBg = transparent ? glassBg : solidBg;

    const [openMenu, setOpenMenu] = useState(null);

    const handleOpen = (label) => {
        // toggle on click
        setOpenMenu((prev) => (prev === label ? null : label));
    };

    return (
        <div
            className={`${finalBg} transition-all duration-300 ${transparent ? "backdrop--md" : "shadow-lg"
                }`}
        >
            <div className="max-w-[1400px] h-15 mx-auto px-6 py-4 flex items-center justify-between relative">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <span className="text-white font-semibold hidden sm:inline">
                        Company
                    </span>
                </div>

                {/* Nav links */}
                <ul className="hidden lg:flex items-center gap-6 text-white text-[15px] font-medium">
                    {links.map((label) => (
                        <li
                            key={label}
                            className="relative flex items-center gap-1 cursor-pointer hover:text-green-400 transition"
                            onMouseEnter={() => setOpenMenu(label)}
                            onClick={() => handleOpen(label)}
                        >
                            <span>{label}</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className="text-green-400 text-xs"
                            />
                        </li>
                    ))}
                </ul>

                {/* Right icons */}
                <div className="flex items-center gap-4 text-white">
                    <i className="fa-brands fa-whatsapp cursor-pointer" />
                    <i className="fa-brands fa-facebook-f cursor-pointer" />
                    <i className="fa-brands fa-instagram cursor-pointer" />
                </div>

                {openMenu === "Business Setup" && <BusinessSetupMenu />}
                {openMenu &&
                    openMenu !== "Business Setup" && <SimpleMenu title={openMenu} />}
            </div>
        </div>
    );
}

// Business Setup Mega Menu 

function BusinessSetupMenu() {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-7xl max-w-[95vw] z-50">
            <div className="bg-white rounded-3xl shadow-2xl border-t-4 border-green-400 overflow-hidden">
                <div className="flex">

                    {/* Left column */}
                    <div className="w-1/4 border-r">
                        <div className="bg-sky-900 text-white font-semibold px-4 py-2">
                            Entity Registration
                        </div>
                        <ul className="text-sm text-gray-800">
                            {[
                                "Hospitality Business Setup",
                                "FSSAI Licence I",
                                "FSSAI Licence II",
                                "NGO",
                                "Healthcare Business",
                                "Fire NOC",
                                "Subsidy",
                                "Startup India Registration",
                            ].map((item) => (
                                <li key={item} className="border-b last:border-b-0">
                                    <button
                                        type="button"
                                        className="w-full text-left px-4 py-2 hover:bg-sky-50 cursor-pointer"
                                        onClick={() => console.log("Clicked:", item)}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Domestic */}
                    <div className="w-2/5 px-6 py-4">
                        <h4 className="text-green-600 font-semibold mb-3">
                            DOMESTIC REGISTRATION
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-900">
                            {[
                                "Company Registration",
                                "Private Limited Company",
                                "Partnership Firm Registration",
                                "Limited Liability Partnership",
                                "One Person Company",
                                "Sole Proprietorship Registration",
                                "Section 8 Company",
                                "Society Registration",
                                "Nidhi Company",
                                "Section 8 Microfinance Company",
                                "NGO Registration",
                                "Public Limited Company",
                                "Producer Company",
                            ].map((item) => (
                                <li key={item}>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 hover:text-sky-700 cursor-pointer"
                                        onClick={() => console.log("Clicked:", item)}
                                    >
                                        {["Limited Liability Partnership", "Producer Company"].includes(
                                            item
                                        ) && (
                                                <FontAwesomeIcon
                                                    icon={faFire}
                                                    className="text-orange-500 text-xs"
                                                />
                                            )}
                                        <span>{item}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* International */}
                    <div className="flex-1 px-6 py-4 border-l">
                        <h4 className="text-green-600 font-semibold mb-3">
                            INTERNATIONAL REGISTRATION
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-900">
                            {[
                                "Foreign Company Registration",
                                "Foreign Subsidiary Company",
                                "Incorporation in USA",
                                "Incorporation in UK",
                                "Incorporation in Singapore",
                                "Incorporation in Australia",
                                "Incorporation in Switzerland",
                                "Incorporation in China",
                                "Incorporation in Dubai",
                                "Incorporation in Hong Kong",
                                "Incorporation in Malaysia",
                                "Incorporation in Netherlands",
                            ].map((item, idx) => (
                                <li key={item}>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 hover:text-sky-700 cursor-pointer"
                                        onClick={() => console.log("Clicked:", item)}
                                    >
                                        <span>{item}</span>
                                        {idx < 2 && (
                                            <FontAwesomeIcon
                                                icon={faFire}
                                                className="text-orange-500 text-xs"
                                            />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}


function SimpleMenu({ title }) {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-160 max-w-[90vw] z-40">
            <div className="bg-white rounded-2xl shadow-xl border-t-4 border-green-400">
                <div className="px-6 py-4">
                    <h4 className="text-sky-900 font-semibold mb-3">{title}</h4>
                    <ul className="space-y-1 text-sm text-gray-800">
                        {["Option 1", "Option 2", "Option 3"].map((item) => (
                            <li key={item}>
                                <button
                                    type="button"
                                    className="w-full text-left px-2 py-1 hover:bg-sky-50 cursor-pointer"
                                    onClick={() => console.log(`${title} -> ${item}`)}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
