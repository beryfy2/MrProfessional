import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
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
import phonepeImg from '../assets/payments/phonepe.svg';
import upiImg from '../assets/payments/payment.svg';
import googleImg from '../assets/images/google.svg';

const ORG_LINKS = [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "The Team", path: "/team" },
    { label: "Contact Us", path: "/contact" },
    { label: "Blogs", path: "/blogs" },
    { label: "Privacy Policy", path: "/privacy-policy" }
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
        text: `Mr Professional is fully professional in their work. Rates are too low and genuine. Services and satisfaction are high so I highly recommended Mr Professional.`,
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
            className="text-[var(--text-secondary)] bg-[var(--bg-secondary)] border-t border-[var(--border-color)]"
        >
            <div className="">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-10 pb-6 space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1.2fr] gap-10">
                        <FooterColumn title="Organization">
                            {ORG_LINKS.map((item) => (
                                <FooterItem key={item.label} to={item.path}>
                                    {item.label}
                                </FooterItem>
                            ))}
                        </FooterColumn>

                        <FooterColumn title="Popular Services">
                            {POPULAR_SERVICES.map((item) => (
                                <FooterItem key={item}>{item}</FooterItem>
                            ))}
                        </FooterColumn>

                        <FooterColumn title="Useful Tools">
                            {USEFUL_TOOLS.map((item) => (
                                <FooterItem key={item.label} to={item.path}>
                                    {item.label}
                                </FooterItem>
                            ))}
                        </FooterColumn>

                        <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-[var(--color-brand)] font-semibold text-xs mb-1">
                                        Call us on
                                    </p>
                                    <div className="text-3xl md:text-4xl font-bold leading-tight">
                                        <div>+918800932090</div>
                                        <div className="text-xl md:text-2xl font-semibold mt-1">+919415718705</div>
                                    </div>
                                    <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                                        [Mon - Sat, 10am - 7pm]
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[var(--color-brand)] font-semibold text-xs mb-1">
                                        Write to us
                                    </p>
                                    <p className="text-[13px]">info@mrprofessional.co.in</p>
                                </div>

                                <div>
                                    <p className="text-[var(--color-brand)] font-semibold text-xs mb-1">
                                        Follow us on
                                    </p>
                                    <div className="mt-2 flex items-center gap-3 text-lg">
                                                <a
    href="https://www.facebook.com/Mr.ProfessionalOfficial#"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <IconBubble icon={faFacebookF} />
  </a>

  <a
    href="https://www.instagram.com/mrprofessional.official/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <IconBubble icon={faInstagram} />
  </a>

  <a
    href="https://x.com/MrProfe19311696"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter / X"
  >
    <IconBubble icon={faXTwitter} />
  </a>

  <a
    href="https://www.linkedin.com/company/mrprofessionalofficial/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <IconBubble icon={faLinkedinIn} />
  </a>

  <a
    href="https://www.pinterest.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Pinterest"
  >
    <IconBubble icon={faPinterestP} />
  </a>
</div>
                                </div>

                                <div className="flex items-start gap-3 pt-2">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="text-[var(--color-brand)] text-lg mt-1"
                                    />
                                    <div className="space-y-1">
                                        <p>SF-1, Reliable City Center, Sector-6, Vasundhara </p>
                                        <p>  Ghaziabad, Uttar Pradesh, India – 201014</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                <TrustBadge icon={faShieldHalved} label="Reliable" />
                                <div className="hidden md:block h-10 w-px bg-[var(--color-brand)]" />
                                <TrustBadge icon={faTags} label="Affordable" />
                                <div className="hidden md:block h-10 w-px bg-[var(--color-brand)]" />
                                <TrustBadge icon={faHandshake} label="Assurity" />
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <Link 
                                    to="/partners-signup" 
                                    className="px-8 py-2 rounded-full bg-transparent border border-[var(--color-brand)] text-[var(--color-brand)] text-sm font-semibold hover:bg-[var(--color-brand)] hover:text-white transition shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                                >
                                    Partner With Us
                                </Link>

                                <div className="flex items-center gap-4">
                                    <Link to="/payment">
                                        <img
                                            src={phonepeImg}
                                            alt="Pay via PhonePe"
                                            className="h-9 object-contain cursor-pointer hover:scale-105 transition"
                                        />
                                    </Link>
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

                        <div>
                            <div className="bg-[var(--bg-main)] rounded-3xl px-6 md:px-10 py-6 flex flex-col md:flex-row gap-6 items-center transition-all duration-500 border border-[var(--border-color)]">
                                <div className="flex-1 text-sm md:text-[15px] leading-relaxed">
                                    {activeTestimonial.text}
                                </div>
                                <div className="flex flex-col gap-4 min-w-[230px]">
                                    <div className="flex items-center gap-3">
                                        <div className="text-sm">
                                            <p className="font-semibold">{activeTestimonial.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={googleImg}
                                            alt="Google Customer Rating"
                                            className="h-8 object-contain"
                                        />
                                        <div className="text-sm">
                                            <p className="font-semibold">
                                                4.9{" "}
                                                <span className="text-yellow-400">★★★★★</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        {TESTIMONIALS.map((t, idx) => (
                                            <button
                                                key={t.id}
                                                onClick={() => setActiveIndex(idx)}
                                                className={`h-2.5 w-2.5 rounded-full transition ${
                                                    idx === activeIndex
                                                        ? "bg-[var(--color-brand)]"
                                                        : "bg-[var(--text-secondary)] hover:bg-[var(--text-primary)]"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[var(--border-color)] pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] md:text-xs text-[var(--text-secondary)]">
                            <div className="flex items-center gap-3">
                                <span>© 2025 Mr Professional Pvt Ltd - All Rights Reserved.</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
                                <Divider />
                                <FooterLink to="/terms-and-conditions">Terms &amp; Conditions</FooterLink>
                                <Divider />
                                <FooterLink to="/refund-policy">Refund Policy</FooterLink>
                                <Divider />
                                <FooterLink to="/tools/emi-calculator">EMI Calculator</FooterLink>
                                <Divider />
                                <FooterLink to="/contact">Contact Us</FooterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };

    const FooterColumn = ({ title, children }) => (
        <div>
            <h4 className="text-[var(--color-brand)] font-semibold mb-3">{title}</h4>
            <ul className="space-y-2 text-sm">{children}</ul>
        </div>
    );

    const FooterItem = ({ to, children }) => (
        <li>
            <Link to={to} className="block text-sm text-[var(--text-secondary)] hover:text-[var(--color-brand-hover)] transition">
                {children}
            </Link>
        </li>
    );

    const IconBubble = ({ icon }) => (
        <div className="h-8 w-8 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--bg-main)] cursor-pointer text-[var(--text-secondary)] hover:text-[var(--color-brand)]">
            <FontAwesomeIcon icon={icon} className="text-sm" />
        </div>
    );

    const TrustBadge = ({ icon, label }) => (
        <div className="flex items-center gap-3 text-base md:text-lg">
            <div className="h-11 w-11 rounded-full border border-[var(--color-brand)] bg-[var(--bg-main)] flex items-center justify-center">
                <FontAwesomeIcon icon={icon} className="text-[var(--color-brand)] text-xl" />
            </div>
            <span className="font-semibold">{label}</span>
        </div>
    );

    const FooterLink = ({ children, to }) => {
        if (to) {
            return (
                <Link to={to} className="hover:text-[var(--color-brand-hover)]">
                    {children}
                </Link>
            );
        }
        return <button className="hover:text-[var(--color-brand-hover)]">{children}</button>;
    };

    const Divider = () => <span className="hidden md:inline text-[var(--border-color)]">|</span>;

export default Footer;
