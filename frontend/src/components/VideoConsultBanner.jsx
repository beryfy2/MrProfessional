import React from "react";

const VideoConsultBanner = () => {
    return (
        <section className="py-6 px-4 bg-(--bg-main)">
            <div className="max-w-6xl mx-auto">
                <div className="
                    relative overflow-visible rounded-2xl 
                    bg-(--bg-secondary) border border-(--border-color)
                    px-10 py-10
                    shadow-lg
                ">
                    {/* LEFT TEXT */}
                    <div className="max-w-xl text-(--text-primary) space-y-4 z-20 relative">
                        <h2 className="text-3xl font-bold">
                            <span className="text-(--color-brand)">FREE</span>{" "}
                            <span className="text-(--color-brand)">Video Consultation</span>
                        </h2>

                        <p className="text-(--text-primary) text-xl font-semibold">
                            Schedule a virtual meeting with an expert
                        </p>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center
                            bg-(--color-brand) hover:opacity-90
                            text-white font-semibold
                            px-8 py-2.5 rounded-full
                            shadow-lg
                            transition"
                        >
                            Book Now
                        </button>
                    </div>

                    <img
                        src="https://www.professionalutilities.com/images/Strip%20image%20(1).png"
                        alt="Video Consultation"
                        className="
                            hidden md:block
                            absolute 
                            right-2      
                            bottom-0       
                            h-[400px]           
                            z-10 
                            object-contain
                        "
                    />
                </div>
            </div>
        </section>
    );
};

export default VideoConsultBanner;
