import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import heroVideo from "../assets/HeroPage.mp4";

export default function HeroPage() {
    const videoRef = useRef(null);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">

            <video
                ref={videoRef}
                src={heroVideo}
                className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05]"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="absolute inset-0 bg-black/40"></div>


            {/* FLOATING BUTTONS */}
            <div className="
                fixed 
                right-4 sm:right-6 
                bottom-4 sm:bottom-6 
                z-999 
                flex flex-col gap-3 sm:gap-4
            ">

                {/* CALL */}
                <a href="tel:88009 32090"
                    className="h-14 w-14 rounded-full bg-(--color-brand) flex items-center justify-center text-white shadow-lg hover:scale-110 transition" >
                    <FontAwesomeIcon icon={faPhone} />
                </a>

                {/* WHATSAPP */}
                <a href="https://wa.me/+918800932090"
                    className="h-14 w-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:scale-110 transition" >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
            </div>

        </div >
    );
}
