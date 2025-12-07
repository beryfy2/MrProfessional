import React from "react";

const VideoConsultBanner = () => {
    return (
        <section className="py-6 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="
                    relative overflow-visible rounded-2xl 
                    bg-linear-to-r from-sky-600 to-sky-900
                    px-10 py-10
                    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                ">
                    {/* LEFT TEXT */}
                    <div className="max-w-xl text-white space-y-4 z-20 relative">
                        <h2 className="text-3xl font-bold">
                            <span className="text-green-400">FREE</span>{" "}
                            <span className="text-green-400">Video Consultation</span>
                        </h2>

                        <p className="text-white text-xl font-semibold">
                            Schedule a virtual meeting with an expert
                        </p>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center
                            bg-green-500 hover:bg-green-600
                            text-white font-semibold
                            px-8 py-2.5 rounded-full
                            shadow-[0_12px_30px_rgba(0,200,0,0.45)]
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
