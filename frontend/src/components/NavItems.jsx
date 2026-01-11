/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFire, faBars } from "@fortawesome/free-solid-svg-icons";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const STATIC_NAV = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Team", path: "/team" },
    { label: "Our Works", path: "/works" },
    { label: "Contact", path: "/contact" },
    { label: "Achievements", path: "/achievements" },
];

export default function NavItems({ sticky }) {

    const navigate = useNavigate();
    const finalBg = "bg-[var(--bg-secondary)]";

    const [navItems, setNavItems] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [titlesByNav, setTitlesByNav] = useState({});
    const [hoverTitleId, setHoverTitleId] = useState(null);
    const [subtitlesByTitle, setSubtitlesByTitle] = useState({});
    const navCenterRef = useRef(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeNav, setActiveNav] = useState(null);
    const [activeTitle, setActiveTitle] = useState(null);



    const closeTimer = useRef(null);
    const openTimer = useRef(null);
    const leaveTimer = useRef(null);

    const itemRefs = useRef({});
    const menuHoveringRef = useRef(false);
    const headHoveringRef = useRef(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    /* -------------------- RESPONSIVE -------------------- */
    useEffect(() => {
        const resize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    /* -------------------- FETCH NAV -------------------- */
    useEffect(() => {
        fetch(`${API_BASE}/nav-items`)
            .then(r => r.json())
            .then(items => setNavItems(items || []));
    }, []);

    /* -------------------- CLOSE ON SCROLL -------------------- */
    useEffect(() => {
        const handleScroll = () => {
            setOpenMenu(null);
            setHoverTitleId(null);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* -------------------- DESKTOP HOVER LOGIC -------------------- */
    const open = (navId) => {
        clearTimeout(closeTimer.current);
        setOpenMenu(navId);
        setHoverTitleId(null);

        if (!titlesByNav[navId]) {
            fetch(`${API_BASE}/nav-items/${navId}/titles`)
                .then(r => r.json())
                .then(titles => {
                    setTitlesByNav(prev => ({ ...prev, [navId]: titles || [] }));
                });
        }
    };

    const scheduleClose = () => {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            if (!menuHoveringRef.current && !headHoveringRef.current) {
                setOpenMenu(null);
                setHoverTitleId(null);
            }
        }, 200);
    };

    const handleItemEnter = (id) => {
        clearTimeout(leaveTimer.current);
        headHoveringRef.current = true;
        clearTimeout(openTimer.current);
        openTimer.current = setTimeout(() => open(id), 80);
    };

    const handleItemLeave = () => {
        leaveTimer.current = setTimeout(() => {
            headHoveringRef.current = false;
            scheduleClose();
        }, 80);
    };

    const handleMenuEnter = () => {
        menuHoveringRef.current = true;
        clearTimeout(closeTimer.current);
    };

    const handleMenuLeave = () => {
        menuHoveringRef.current = false;
        scheduleClose();
    };

    /* -------------------- UTILS -------------------- */
    const slugify = (text) =>
        text.toLowerCase().replace(/\.(php|html)$/, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim().replace(/\s+/g, '-');

    const navigateToService = (name, navName) => {
        const slug = slugify(name);
        navigate(`/services/${slug}`);
        setMobileOpen(false);
    };

    /* ======================================================= */

    return (
        <div className={`${finalBg} transition-all duration-300 shadow-lg`}>

            <div className="max-w-[1500px] mx-auto px-4 py-3 grid grid-cols-2 lg:grid-cols-3 items-center">


                {/* LOGO - LEFT */}
                <div className="flex justify-start">
                    <span
                        className="text-xl font-semibold cursor-pointer text-(--text-primary)"
                        onClick={() => navigate("/")}
                    >
                        Mr. Professional
                    </span>
                </div>

                {/* CENTER MENU */}
                <div
                    ref={navCenterRef}
                    className="hidden lg:flex justify-center ml-24"
                >

                    <ul className="flex items-center gap-16 text-(--text-primary)">

                        {STATIC_NAV.map(item => (
                            <li key={item.label}>
                                <button
                                    onClick={() => navigate(item.path)}
                                    className="hover:text-(--color-brand-hover) whitespace-nowrap"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}

                        {navItems.map(nav => {
                            const isOpen = openMenu === nav._id;

                            return (
                                <li
                                    key={nav._id}
                                    className="relative"
                                    onMouseEnter={() => handleItemEnter(nav._id)}
                                    onMouseLeave={handleItemLeave}
                                    ref={el => el && (itemRefs.current[nav._id] = el)}
                                >
                                    <button className="flex items-center gap-1">
                                        {nav.name}
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={`text-xs transition ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <DynamicMenu
                                            title={nav.name}
                                            titles={titlesByNav[nav._id] || []}
                                            hoverTitleId={hoverTitleId}
                                            onHoverTitle={(id) => {
                                                setHoverTitleId(id);
                                                if (!subtitlesByTitle[id]) {
                                                    fetch(`${API_BASE}/titles/${id}/subtitles`)
                                                        .then(r => r.json())
                                                        .then(subs => {
                                                            setSubtitlesByTitle(p => ({ ...p, [id]: subs || [] }));
                                                        });
                                                }
                                            }}
                                            subtitles={hoverTitleId ? subtitlesByTitle[hoverTitleId] || [] : []}
                                            anchorEl={navCenterRef.current}

                                            onMouseEnter={handleMenuEnter}
                                            onMouseLeave={handleMenuLeave}
                                            onSelectService={(s) => navigateToService(s, nav.name)}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* HAMBURGER - RIGHT */}
                <div className="flex justify-end">
                    <button
                        className="lg:hidden text-2xl"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>

            </div>

            {/* ================= MOBILE DRAWER ================= */}
            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed inset-0 z-1000 lg:hidden transition-all duration-300
                ${mobileOpen ? "visible" : "invisible"}`}
            >

                {/* OVERLAY */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity
                    ${mobileOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setMobileOpen(false)}
                />

                {/* SIDEBAR */}
                <div
                    className={`absolute left-0 top-0 h-full w-[85%] max-w-[360px]
                    bg-[#0b2b4b] text-white shadow-2xl
                    transition-transform duration-300
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
                >

                    {/* HEADER */}
                    <div className="p-5 flex items-center justify-between border-b border-white/10">
                        <span className="font-semibold text-lg">Mr. Professional</span>
                        <button
                            className="text-2xl"
                            onClick={() => setMobileOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    {/* SEARCH
                    <div className="p-4">
                        <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                            <span className="text-sm text-white/60">Search Service</span>
                            🎤
                        </div>
                    </div> */}

                    {/* MENU */}
                    <div className="overflow-y-auto h-[calc(100%-140px)] px-4">

                        {/* STATIC LINKS */}
                        {STATIC_NAV.map(item => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    navigate(item.path);
                                    setMobileOpen(false);
                                }}
                                className="w-full text-left py-3 border-b border-white/10"
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* DYNAMIC NAV */}
                        {navItems.map(nav => (
                            <div key={nav._id} className="border-b border-white/10">

                                {/* NAV HEAD */}
                                <button
                                    className="w-full flex justify-between py-3"
                                    onClick={() => {
                                        setActiveNav(activeNav === nav._id ? null : nav._id);

                                        // FETCH TITLES
                                        if (!titlesByNav[nav._id]) {
                                            fetch(`${API_BASE}/nav-items/${nav._id}/titles`)
                                                .then(r => r.json())
                                                .then(titles => {
                                                    setTitlesByNav(prev => ({
                                                        ...prev,
                                                        [nav._id]: titles || []
                                                    }));
                                                });
                                        }
                                    }}

                                >
                                    {nav.name}
                                    <span>{activeNav === nav._id ? "▲" : "▼"}</span>
                                </button>

                                {/* TITLES */}
                                {activeNav === nav._id && (
                                    <div className="pl-3">

                                        {(titlesByNav[nav._id] || []).map(t => (
                                            <div key={t._id}>

                                                {/* TITLE */}
                                                <button
                                                    className="w-full flex justify-between py-2 text-sm"
                                                    onClick={() => {
                                                        setActiveTitle(activeTitle === t._id ? null : t._id);

                                                        // FETCH SUBTITLES
                                                        if (!subtitlesByTitle[t._id]) {
                                                            fetch(`${API_BASE}/titles/${t._id}/subtitles`)
                                                                .then(r => r.json())
                                                                .then(subs => {
                                                                    setSubtitlesByTitle(prev => ({
                                                                        ...prev,
                                                                        [t._id]: subs || []
                                                                    }));
                                                                });
                                                        }
                                                    }}

                                                >
                                                    {t.title}
                                                    <span>
                                                        {activeTitle === t._id ? "▲" : "▼"}
                                                    </span>
                                                </button>

                                                {/* SUB TITLES */}
                                                {activeTitle === t._id && (
                                                    <div className="pl-3">

                                                        {(subtitlesByTitle[t._id] || []).map(s => (
                                                            <button
                                                                key={s._id}
                                                                className="block w-full text-left py-2 text-xs text-white/80"
                                                                onClick={() => {
                                                                    navigateToService(s.title, nav.name);
                                                                    setMobileOpen(false);
                                                                }}
                                                            >
                                                                {s.title}
                                                            </button>
                                                        ))}

                                                    </div>
                                                )}

                                            </div>
                                        ))}

                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </div>
    );
}

/* ================== MEGA MENU ================== */

function DynamicMenu({
    title, titles, hoverTitleId, onHoverTitle,
    subtitles, anchorEl, onMouseEnter, onMouseLeave, onSelectService
}) {

    const [pos, setPos] = useState({ left: 8, top: 0, width: 720 });

    useEffect(() => {
        function compute() {
            const vw = window.innerWidth;
            const desired = Math.min(720, vw - 16);
            const margin = 8;

            if (!anchorEl) {
                const left = (vw - desired) / 2;
                setPos({ left, top: 120, width: desired });
                return;
            }

            const rect = anchorEl.getBoundingClientRect();

            // 👉 CENTER of whole nav menu
            const center = rect.left + rect.width / 2;

            let left = center - desired / 2;
            left = Math.max(margin, Math.min(left, vw - desired - margin));

            const top = rect.bottom + 14;

            setPos({ left, top, width: desired });
        }


        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, [anchorEl]);

    const active = titles.find(t => t._id === hoverTitleId);

    return (
        <div
            className="fixed z-50"
            style={{ ...pos }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="bg-(--bg-secondary) rounded-2xl shadow-2xl border-t-4 border-(--color-brand)">

                <div className="px-6 py-5 grid grid-cols-2 gap-6">

                    {/* TITLES */}
                    <div>
                        <h4 className="text-(--color-brand) font-semibold mb-2">Titles</h4>
                        <div className="font-semibold mb-3">{title}</div>

                        <ul className="space-y-2 text-sm">
                            {titles.map(t => (
                                <li key={t._id}>
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded-lg
                    ${hoverTitleId === t._id
                                                ? "bg-(--bg-main)"
                                                : "hover:bg-(--bg-main)"}`}
                                        onMouseEnter={() => onHoverTitle(t._id)}
                                    >
                                        {t.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SUBTITLES */}
                    <div>
                        <h4 className="text-(--color-brand) font-semibold mb-3">
                            Subtitles {active && `— ${active.title}`}
                        </h4>

                        <ul className="space-y-1 text-sm">
                            {subtitles.map((s, i) => (
                                <li key={s._id}>
                                    <button
                                        className="flex gap-2 hover:text-(--color-brand-hover)"
                                        onClick={() => onSelectService(s.title)}
                                    >
                                        {s.title}
                                        {i < 2 && (
                                            <FontAwesomeIcon
                                                icon={faFire}
                                                className="text-(--color-warning) text-xs"
                                            />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
