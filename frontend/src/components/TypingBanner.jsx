import React, { useEffect, useState } from "react";

const TEXTS = [
  "A FinTech platform that understands your need",
  "All professional services you need to run your business",
  "There’s a smarter way to start and manage a business",
  "Your business powered by Professional Utilities",
];

export default function TypingBanner() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = TEXTS[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText((prev) => prev + currentText.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2400);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % TEXTS.length);
      }
    }, 20);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="py-6 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* CARD */}
        <div className="relative overflow-visible rounded-2xl bg-linear-to-r from-sky-700 to-sky-900 px-10 py-10">
          
          {/* LEFT TEXT */}
          <div className="max-w-xl text-white space-y-4 z-20 relative">
            <h2 className="text-2xl font-bold text-green-400 min-h-[72px]">
              {displayText}
              <span className="animate-pulse">|</span>
            </h2>

            <p className="text-white/90 text-sm md:text-base">
              Large suite of services to start and manage your entire business,
              brought to you by a company with the long term vision to transform
              the way you manage business.
            </p>

            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) {
                  const yOffset = -80; // navbar height
                  const y =
                    el.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;

                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="inline-flex mt-2 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-2 shadow-lg transition"
            >
              Get Expert Assistance
            </button>
          </div> {/* ✅ LEFT TEXT CLOSED */}

          {/* RIGHT IMAGE */}
          <img
            src="https://www.professionalutilities.com/images/Grow_with_PU.webp"
            alt="Business Growth"
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
}
