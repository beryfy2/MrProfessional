import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faShieldHalved,
    faTags,
    faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookF,
    faInstagram,
    faXTwitter,
    faLinkedinIn,
    faPinterestP,
} from "@fortawesome/free-brands-svg-icons";

import phonepeImg from "../assets/payments/phonepe.svg";
import upiImg from "../assets/payments/payment.svg";
import googleImg from "../assets/images/google.svg";

/* ---------------- DATA ---------------- */

const ORG_LINKS = [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "The Team", path: "/team" },
    { label: "Contact Us", path: "/contact" },
    { label: "Blogs", path: "/blogs" },
    { label: "Privacy Policy", path: "/privacy-policy" },
];

const POPULAR_SERVICES = [
    "GeM Registration",
    "Pvt. Ltd. Company",
    "LLP Registration",
    "Trademark Registration",
    "Section 8 Company",
];

const USEFUL_TOOLS = [
    { label: "Check FSSAI License Number Status", path: "/tools/fssai-status" },
    { label: "TDS Interest Calculator", path: "/tools/tds-interest-calculator" },
    { label: "Depreciation Calculator", path: "/tools/depreciation-calculator" },
    { label: "PPF Calculator", path: "/tools/ppf-calculator" },
    { label: "EMI Calculator", path: "/tools/emi-calculator" },
];

const TESTIMONIALS = [
    {
        id: 1,
        name: "Himanshu Karia",
        role: "Director, Autogrid Mobility Pvt Ltd",
        text:
            "The people in the organization are highly professional and helped me throughout the work in the best possible manner.",
    },
    {
        id: 2,
        name: "Lalla Singh",
        role: "Director, Arifin India Nidhi Limited",
        text:
            "The best consultants I’ve worked with. The approach toward work is highly professional and effective. An energetic team.",
    },
    {
        id: 3,
        name: "Amit Keshari",
        role: "Director, Trueon Lifesciences (OPC) Pvt Ltd",
        text:
            "The services from Mr Professional are best in class. The support they provide throughout the work is excellent.",
    },
    {
        id: 4,
        name: "Deepesh Kurupath",
        role: "Founder & CEO, CargoFL",
        text:
            "Best in class service provider. A very cooperative and understanding team that helps explain all technicalities effectively.",
    },
    {
        id: 5,
        name: "Arya Chaurasia",
        role: "CEO, Profilance Pvt Ltd",
        text:
            "The teamwork is excellent. My work was completed before time. Very supportive and helpful team.",
    },
];


/* ---------------- COMPONENT ---------------- */

const Footer = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setActiveIndex((i) => (i + 1) % TESTIMONIALS.length),
            8000
        );
        return () => clearInterval(interval);
    }, []);

    const activeTestimonial = TESTIMONIALS[activeIndex];

    return (
        <footer className="bg-(--bg-secondary) text-(--text-secondary) border-t border-(--border-color)">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-10 pb-6 space-y-12">

                {/* ---------------- TOP LINKS ---------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1.2fr] gap-10">
                    <FooterColumn title="Organization">
                        {ORG_LINKS.map((i) => (
                            <FooterItem key={i.label} to={i.path}>{i.label}</FooterItem>
                        ))}
                    </FooterColumn>

                    <FooterColumn title="Popular Services">
                        {POPULAR_SERVICES.map((i) => (
                            <FooterItem key={i}>{i}</FooterItem>
                        ))}
                    </FooterColumn>

                    <FooterColumn title="Useful Tools">
                        {USEFUL_TOOLS.map((i) => (
                            <FooterItem key={i.label} to={i.path}>{i.label}</FooterItem>
                        ))}
                    </FooterColumn>

                    {/* CONTACT */}
                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="text-(--color-brand) font-semibold text-xs mb-1">
                                Call us on
                            </p>
                            <div className="text-3xl font-bold">
                                +91 88009 32090
                                <div className="text-xl font-semibold mt-1">
                                    +91 94157 18705
                                </div>
                            </div>
                            <p className="text-xs mt-1">[Mon - Sat, 10am - 7pm]</p>
                        </div>

                        <div>
                            <p className="text-(--color-brand) font-semibold text-xs mb-1">
                                Write to us
                            </p>
                            <p>info@mrprofessional.co.in</p>
                        </div>

                        <div>
                            <p className="text-(--color-brand) font-semibold text-xs mb-1">
                                Follow us on
                            </p>
                            <div className="flex gap-3 mt-2">
                                <IconBubble icon={faFacebookF} />
                                <IconBubble icon={faInstagram} />
                                <IconBubble icon={faXTwitter} />
                                <IconBubble icon={faLinkedinIn} />
                                <IconBubble icon={faPinterestP} />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="text-(--color-brand) mt-1"
                            />
                            <div>
                                <p>SF-1, Reliable City Center, Sector-6</p>
                                <p>Vasundhara, Ghaziabad – 201014</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TRUST + TESTIMONIAL*/}
                <div className=" rounded-3xl px-6 md:px-10 py-8 border-(--border-color)">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">

                        {/* LEFT */}
                        <div className="grid grid-cols-[auto_40px_auto_40px_auto] gap-y-6">

                            {/* BADGES ROW */}
                            <TrustBadge icon={faShieldHalved} label="Reliable" />
                            <Divider />
                            <TrustBadge icon={faTags} label="Affordable" />
                            <Divider />
                            <TrustBadge icon={faHandshake} label="Assurity" />

                            {/* CTA ROW – CENTERED UNDER MIDDLE BADGE */}
                            <div className="col-span-5 flex justify-center">
                                <div className="flex items-center gap-5">
                                    <Link
                                        to="/partners-signup"
                                        className="px-8 py-2 rounded-full bg-(--color-brand) text-white text-sm font-semibold hover:opacity-90 transition"
                                    >
                                        Partner With Us
                                    </Link>

                                    <Link to="/payment">
                                        <img
                                            src={phonepeImg}
                                            alt="PhonePe"
                                            className="h-9 hover:scale-105 transition"
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* PAYMENT ICONS – SAME CENTER */}
                            <div className="col-span-5 flex justify-center">
                                <img src={upiImg} alt="UPI" className="h-7" />
                            </div>

                        </div>



                        {/* RIGHT – TESTIMONIAL */}
                        <div className="bg-(--bg-main) rounded-2xl px-6 py-6 border border-(--border-color) flex flex-col gap-4">
                            <p className="text-sm md:text-[15px] leading-relaxed">
                                {activeTestimonial.text}
                            </p>

                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <p className="font-semibold">{activeTestimonial.name}</p>

                                <div className="flex items-center gap-2">
                                    <img src={googleImg} alt="Google" className="h-8" />
                                    <span className="font-semibold text-sm">
                                        4.9 <span className="text-yellow-400">★★★★★</span>
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {TESTIMONIALS.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`h-2.5 w-2.5 rounded-full ${i === activeIndex
                                            ? "bg-(--color-brand)"
                                            : "bg-(--text-secondary)"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------------- BOTTOM BAR ---------------- */}
                <div className="border-t border-(--border-color) pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
                    <span>© 2025 Mr Professional Pvt Ltd. All Rights Reserved.</span>
                    <div className="flex gap-4">
                        <FooterLink to="/privacy-policy">Privacy</FooterLink>
                        <FooterLink to="/terms-and-conditions">Terms</FooterLink>
                        <FooterLink to="/refund-policy">Refund</FooterLink>
                        <FooterLink to="/tools/emi-calculator">EMI</FooterLink>
                        <FooterLink to="/contact">Contact</FooterLink>
                    </div>
                </div>

            </div>
        </footer>
    );
};

/* ---------------- HELPERS ---------------- */

const FooterColumn = ({ title, children }) => (
    <div>
        <h4 className="text-(--color-brand) font-semibold mb-3">{title}</h4>
        <ul className="space-y-2">{children}</ul>
    </div>
);

const FooterItem = ({ to = "#", children }) => (
    <li>
        <Link to={to} className="hover:text-(--color-brand-hover)">
            {children}
        </Link>
    </li>
);

const IconBubble = ({ icon }) => (
    <div className="h-8 w-8 rounded-full border border-(--border-color) flex items-center justify-center hover:bg-(--bg-main)">
        <FontAwesomeIcon icon={icon} />
    </div>
);

const TrustBadge = ({ icon, label }) => (
    <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full border border-(--color-brand) flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-(--color-brand) text-xl" />
        </div>
        <span className="font-semibold">{label}</span>
    </div>
);

const Divider = () => (
    <div className="hidden md:block h-8 w-px bg-(--color-brand)" />
);

const FooterLink = ({ to, children }) => (
    <Link to={to} className="hover:text-(--color-brand-hover)">
        {children}
    </Link>
);

export default Footer;
