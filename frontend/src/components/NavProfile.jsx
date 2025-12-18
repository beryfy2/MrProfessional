import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import SearchBar from "./SearchBar";

library.add(fas, far, fab);

const NavProfile = ({ hidden = false, transparent = false }) => {
    return (
        <div
            className="w-full text-white text-sm px-6 flex items-center justify-between"
            style={{
                background: transparent ? "rgba(15, 66, 96, 0.4)" : "#0f4260",
                height: "56px",
                transform: hidden ? "translateY(-100%)" : "translateY(0)",
                transition: "transform 300ms ease, background-color 300ms ease",
                zIndex: 70,
                backdropFilter: transparent ? "blur(10px)" : "none",
            }}
        >
            {/* Contact Details */}
            <div className="flex items-center gap-8">
                <span className="font-semibold flex items-center gap-2 leading-none">
                    <FontAwesomeIcon icon={["fas", "envelope"]} style={{ color: "#34ed31" }} />
                    <span className="cursor-pointer hover:text-green-400">support@example.com</span>
                </span>

                <span className="font-semibold flex items-center gap-2 leading-none">
                    <FontAwesomeIcon icon={["fas", "phone"]} style={{ color: "#34ed31" }} />
                    <span className="cursor-pointer hover:text-green-400">XXXXXXXXXX</span>
                </span>
            </div>

            {/* Search + PDF button */}
            <div className="flex items-center gap-6">
                <div className="hidden sm:block">
                    <SearchBar />
                </div>
                <a href="../../public/sample.pdf" target="_blank" rel="noopener noreferrer">
                    <button className="flex items-center gap-2 bg-[#1b9bf0] hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-xl shadow-md transition cursor-pointer">
                        <FontAwesomeIcon icon={["fas", "arrow-down"]} style={{ color: "#ffffff" }} />
                        <span className="hidden sm:inline-block">Company Profile</span>
                    </button>
                </a>
            </div>

            {/* Socials media */}
            <div className="hidden md:flex items-center gap-4 text-lg">
                <FontAwesomeIcon className="cursor-pointer hover:text-green-400" icon={["fab", "whatsapp"]} />
                <FontAwesomeIcon className="cursor-pointer hover:text-blue-500" icon={["fab", "facebook-f"]} />
                <FontAwesomeIcon className="cursor-pointer hover:text-pink-400" icon={["fab", "instagram"]} />
                <FontAwesomeIcon className="cursor-pointer hover:text-gray-800" icon={["fab", "x-twitter"]} />
                <FontAwesomeIcon className="cursor-pointer hover:text-blue-300" icon={["fab", "linkedin-in"]} />
            </div>
        </div>
    );
};

export default NavProfile;
