import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import heroVideo from "../assets/HeroPage.mp4";

export default function HeroPage() {
    const videoRef = useRef(null);


    return (
        <div className="relative w-full h-screen overflow-hidden">

            <video
                ref={videoRef}
                src={heroVideo}
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="absolute inset-0 bg-black/30 z-0"></div>

            <div className="fixed right-6 bottom-6 z-999 flex flex-col gap-4">
                <a
                    href="tel:88009 32090"
                    className="h-14 w-14 rounded-full bg-(--color-brand) flex items-center justify-center text-white shadow-lg hover:scale-110 transition"
                >
                    <FontAwesomeIcon icon={faPhone} />
                </a>

                <a
                    href="https://wa.me/8800932090"
                    className="h-14 w-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:scale-110 transition"
                >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
            </div>
        </div>
    );
}
