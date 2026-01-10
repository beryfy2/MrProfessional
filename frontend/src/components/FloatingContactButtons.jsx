import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const FloatingContactButtons = () => {
    return (
        <div className="fixed right-6 bottom-6 z-999 flex flex-col gap-4">
            <a
                href="tel:+918800932090"
                className="h-14 w-14 rounded-full bg-[#0b5e92] flex items-center justify-center text-white shadow-lg hover:scale-110 transition"
            >
                <FontAwesomeIcon icon={faPhone} size="lg" />
            </a>

            <a
                href="https://wa.me/+918800932090"
                target="_blank"
                rel="noreferrer"
                className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition"
            >
                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </a>
        </div>
    );
};

export default FloatingContactButtons;
