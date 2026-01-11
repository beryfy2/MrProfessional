import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import heroVideo from "../assets/HeroPage.mp4";
import "../style/hero.css";

export default function HeroPage() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.setAttribute("playsinline", true);
        video.play().catch(() => { });
    }, []);

    return (
        <div className="
            relative 
            w-screen 
            -mx-[calc((100vw-100%)/2)] 
            h-[60svh] sm:h-[calc(100svh-72px)] 
            sm:h-screen 
            overflow-hidden
            sm:bg-black
        ">



            {/* VIDEO */}
            <video
                ref={videoRef}
                src={heroVideo}
                className="
                    hero-video
                    absolute inset-0
                    w-full h-full
                    object-cover
                    transition-all duration-500
                "

                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            />


            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40 hidden sm:block" />

            {/* FLOATING BUTTONS */}
            <div className="
                fixed 
                right-3 sm:right-6 
                bottom-3 sm:bottom-6 
                z-[900] 
                flex flex-col gap-3 sm:gap-4
            ">

                {/* CALL */}
                <a
                    href="tel:8800932090"
                    className="
                        h-12 w-12 sm:h-14 sm:w-14 
                        rounded-full 
                        bg-(--color-brand) 
                        flex items-center justify-center 
                        text-white 
                        shadow-lg 
                        hover:scale-110 
                        transition
                    "
                    aria-label="Call us"
                >
                    <FontAwesomeIcon icon={faPhone} />
                </a>

                {/* WHATSAPP */}
                <a
                    href="https://wa.me/918800932090"
                    className="
                        h-12 w-12 sm:h-14 sm:w-14 
                        rounded-full 
                        bg-[#25D366] 
                        flex items-center justify-center 
                        text-white 
                        shadow-lg 
                        hover:scale-110 
                        transition
                    "
                    aria-label="Chat on WhatsApp"
                >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
            </div>

        </div>
    );
}
