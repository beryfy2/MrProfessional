import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
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
import phonepeImg from '../assets/payments/phonepe.svg'
import upiImg from '../assets/payments/payment.svg'
import googleImg from '../assets/images/google.svg'
import footerBg from '../assets/footer-bg.jpg'


const ORG_LINKS = ["About Us", "Careers", "The Team", "Contact Us", "Blogs"];

const POPULAR_SERVICES = [
    "GeM Registration",
    "Pvt. Ltd. Company",
    "LLP Registration",
    "Trademark Registration",
    "Section 8 Company",
];

const USEFUL_TOOLS = [
    { label: "Check FSSAI License Number Status", path: "/tools/fssai-status" },
    { label: "TDS Interest Calculator", path: "/tools/tds-calculator" },
    { label: "Depreciation Calculator", path: "/tools/depreciation-calculator" },
    { label: "PPF Calculator", path: "/tools/ppf-calculator" },
    { label: "EMI Calculator", path: "/tools/emi-calculator" },
];

// TESTIMONIAL SLIDES
const TESTIMONIALS = [
    {
        id: 1,
        name: "Vivek Anand Ji",
        avatar: "/images/testimonials/vivek.png",
        text: `They've been very helpful in our registration with ICEGATE. It was a small thing with a small amount paid which somehow escalated to a very painful procedure. Never did they say "You've only paid so much. It's too much effort for us.".`,
    },
    {
        id: 2,
        name: "Vaibhav Agrawal",
        avatar: "/images/testimonials/vaibhav.png",
        text: `They are one of the most genuine and reasonable people. I applied for Impc certificate through them and they charged me a very nominal amount as compared to what other firms asked.`,
    },
    {
        id: 3,
        name: "Jay Prakash Maurya",
        avatar: "/images/testimonials/jay.png",
        text: `Professional Utilities is fully professional in their work. Rates are too low and genuine. Services and satisfaction are high so I highly recommended Professional Utilities.`,
    },
];

const Footer = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 8000); // 8 seconds
        return () => clearInterval(interval);
    }, []);

    const activeTestimonial = TESTIMONIALS[activeIndex];

    return (
        <footer
            className="text-white"
            style={{
                backgroundImage: `url(${footerBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-linear-to-t from-sky-950/70 via-sky-900/90 to-sky-800/85">

                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-10 pb-6 space-y-10">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1.2fr] gap-10">
                        {/* Organization */}
                        <FooterColumn title="Organization">
                            {ORG_LINKS.map((item) => (
                                <FooterItem key={item}>{item}</FooterItem>
                            ))}
                        </FooterColumn>

                        {/* Popular Services */}
                        <FooterColumn title="Popular Services">
                            {POPULAR_SERVICES.map((item) => (
                                <FooterItem key={item}>{item}</FooterItem>
                            ))}
                        </FooterColumn>

                        {/* Useful Tools */}
                        <FooterColumn title="Useful Tools">
                            {USEFUL_TOOLS.map((item) => (
                                <FooterItem key={item.label} to={item.path}>{item.label}</FooterItem>
                            ))}
                        </FooterColumn>

                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-green-400 font-semibold text-xs mb-1">
                                    Call us on
                                </p>
                                <p className="text-3xl md:text-4xl font-bold leading-tight">
                                    +91 XXXXXXXXXX
                                </p>
                                <p className="mt-1 text-[13px] text-white/85">
                                    [Mon - Sat, 10am - 7pm]
                                </p>
                            </div>

                            <div>
                                <p className="text-green-400 font-semibold text-xs mb-1">
                                    Write to us
                                </p>
                                <p className="text-[13px]">
                                    support@example.com
                                </p>
                            </div>

                            <div>
                                <p className="text-green-400 font-semibold text-xs mb-1">
                                    Follow us on
                                </p>
                                <div className="mt-2 flex items-center gap-3 text-lg">
                                    <IconBubble icon={faFacebookF} />
                                    <IconBubble icon={faInstagram} />
                                    <IconBubble icon={faXTwitter} />
                                    <IconBubble icon={faLinkedinIn} />
                                    <IconBubble icon={faPinterestP} />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="text-green-400 text-lg mt-1"
                                />
                                <div className="space-y-1">
                                    <p>804, 8th Floor, Bhandari House -</p>
                                    <p>91, Nehru Place, New Delhi 110019</p>
                                </div>
                            </div>

                            {/* <div className="mt-3 rounded-2xl overflow-hidden border border-white/40 w-full max-w-sm ml-auto">
                                <img
                                    src="/images/footer-map.png"
                                    alt="Office Map"
                                    className="w-full h-full object-cover"
                                />
                            </div> */}
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        {/* badges */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <TrustBadge icon={faShieldHalved} label="Reliable" />
                            <div className="hidden md:block h-10 w-px bg-green-500" />
                            <TrustBadge icon={faTags} label="Affordable" />
                            <div className="hidden md:block h-10 w-px bg-green-500" />
                            <TrustBadge icon={faHandshake} label="Assurity" />
                        </div>

                        {/* payments */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <button className="px-8 py-2 rounded-full bg-transparent border border-green-500 text-green-300 text-sm font-semibold hover:bg-green-500 hover:text-white transition shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
                                Partner With Us
                            </button>

                            <div className="flex items-center gap-4">
                                {/* PhonePe logo */}
                                <img
                                    src={phonepeImg}
                                    alt="PhonePe"
                                    className="h-9 object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <img
                                src={upiImg}
                                alt="UPI"
                                className="h-7 object-contain"
                            />
                            
                        </div>
                    </div>

                    {/* Slider */}
                    <div>
                        <div className="bg-white/13 backdrop-blur-md rounded-3xl px-6 md:px-10 py-6 flex flex-col md:flex-row gap-6 items-center transition-all duration-500">
                            
                            <div className="flex-1 text-sm md:text-[15px] leading-relaxed">
                                {activeTestimonial.text}
                            </div>

                            {/* rating */}
                            <div className="flex flex-col gap-4 min-w-[230px]">
                                <div className="flex items-center gap-3">
                                    {/* <img
                                        src={activeTestimonial.avatar}
                                        alt={activeTestimonial.name}
                                        className="h-12 w-12 rounded-full object-cover bg-white/80"
                                    /> */}
                                    <div className="text-sm">
                                        <p className="font-semibold">{activeTestimonial.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <img
                                        src={googleImg} // Google
                                        alt="Google Customer Rating"
                                        className="h-8 object-contain"
                                    />
                                    <div className="text-sm">
                                        <p className="font-semibold">
                                            4.9{" "}
                                            <span className="text-yellow-400">
                                                ★★★★★
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-1">
                                    {TESTIMONIALS.map((t, idx) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setActiveIndex(idx)}
                                            className={`h-2.5 w-2.5 rounded-full transition ${idx === activeIndex
                                                    ? "bg-white"
                                                    : "bg-white/40 hover:bg-white/70"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-white/25 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] md:text-xs text-white/80">
                        <div className="flex items-center gap-3">
                            <span>
                                © 2025 PU Professional Utilities Pvt Ltd - All Rights Reserved.
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <FooterLink>Privacy Policy</FooterLink>
                            <Divider />
                            <FooterLink>Terms &amp; Conditions</FooterLink>
                            <Divider />
                            <FooterLink>Refund Policy</FooterLink>
                            <Divider />
                            <FooterLink to="/tools/emi-calculator">EMI Calculator</FooterLink>
                            <Divider />
                            <FooterLink>Contact Us</FooterLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterColumn = ({ title, children }) => (
    <div>
        <h4 className="text-green-400 font-semibold mb-3">{title}</h4>
        <ul className="space-y-2 text-sm">{children}</ul>
    </div>
);

const FooterItem = ({ to, children }) => (
    <li>
        <Link to={to} className="block text-sm text-white/85 hover:text-green-300 transition">
            {children}
        </Link>
    </li>
);

const IconBubble = ({ icon }) => (
    <div className="h-8 w-8 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 cursor-pointer">
        <FontAwesomeIcon icon={icon} className="text-sm" />
    </div>
);

const TrustBadge = ({ icon, label }) => (
    <div className="flex items-center gap-3 text-base md:text-lg">
        <div className="h-11 w-11 rounded-full border border-green-500 bg-white/10 flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-green-400 text-xl" />
        </div>
        <span className="font-semibold">{label}</span>
    </div>
);

const FooterLink = ({ children, to }) => {
    if (to) {
        return (
            <Link to={to} className="hover:text-green-300">
                {children}
            </Link>
        );
    }

    return <button className="hover:text-green-300">{children}</button>;
};

const Divider = () => <span className="hidden md:inline text-white/40">|</span>;

export default Footer;
