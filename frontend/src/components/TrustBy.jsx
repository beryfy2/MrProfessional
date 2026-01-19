import React from "react";
import "../style/trustby.css";

const BRANDS = Array.from({ length: 14 }, (_, i) =>
  new URL(`../assets/brands/${i + 1}.png`, import.meta.url).href
);

const TrustedBy = () => {
  return (
    <section className="bg-(--bg-main) py-14">
      <div className="max-w-8xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-(--text-primary)">
            Our Partners
          </h2>
          <div className="h-1 w-20 bg-(--color-brand) mx-auto mt-2 rounded-full" />
        </div>

        {/* Trusted brands marquee */}
        <div className="trusted-wrapper">
          <div className="trusted-row-single">

            {/* First strip */}
            <div className="trusted-strip">
              {BRANDS.map((logo, i) => (
                <BrandCard key={`brand-1-${i}`} logo={logo} />
              ))}
            </div>

            {/* Duplicate strip for seamless loop */}
            <div className="trusted-strip">
              {BRANDS.map((logo, i) => (
                <BrandCard key={`brand-2-${i}`} logo={logo} />
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
