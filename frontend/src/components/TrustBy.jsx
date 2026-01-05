import React from "react";
import "../style/trustby.css";

const BRANDS = Array.from({ length: 28 }, (_, i) =>
    new URL(`../assets/brands/b${i + 1}.png`, import.meta.url).href
);

const TrustedBy = () => {
    const topRow = BRANDS.slice(0, 14);
    const bottomRow = BRANDS.slice(14, 28);

    return (
        <section className="bg-[var(--bg-main)] py-14">
            <div className="max-w-8xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)]">Trusted By</h2>
                    <div className="h-1 w-20 bg-[var(--color-brand)] mx-auto mt-2 rounded-full" />
                </div>

                {/* Wrapper with fade on edges */}
                <div className="trusted-wrapper">
                    {/* TOP ROW: Right → Left */}
                    <div className="trusted-row trusted-row-top mb-8">
                        <div className="trusted-strip">
                            {topRow.map((logo, i) => (
                                <BrandCard key={`top-1-${i}`} logo={logo} />
                            ))}
                        </div>
                        <div className="trusted-strip">
                            {topRow.map((logo, i) => (
                                <BrandCard key={`top-2-${i}`} logo={logo} />
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM ROW: Left → Right */}
                    <div className="trusted-row trusted-row-bottom">
                        <div className="trusted-strip">
                            {bottomRow.map((logo, i) => (
                                <BrandCard key={`bot-1-${i}`} logo={logo} />
                            ))}
                        </div>
                        <div className="trusted-strip">
                            {bottomRow.map((logo, i) => (
                                <BrandCard key={`bot-2-${i}`} logo={logo} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BrandCard = ({ logo }) => (
    <div className="brand-card">
        <img src={logo} alt="brand" className="brand-logo" />
    </div>
);

export default TrustedBy;
