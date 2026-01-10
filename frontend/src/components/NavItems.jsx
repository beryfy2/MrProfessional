/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFire, faBars } from "@fortawesome/free-solid-svg-icons";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const STATIC_NAV = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Team", path: "/team" },
    { label: "Contact", path: "/contact" },
    { label: "Blogs", path: "/blogs" },
];

export default function NavItems({ sticky, mobileOpen, setMobileOpen }) {

    const navigate = useNavigate();
    const finalBg = "bg-[var(--bg-secondary)]";

    const [navItems, setNavItems] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [titlesByNav, setTitlesByNav] = useState({});
    const [hoverTitleId, setHoverTitleId] = useState(null);
    const [subtitlesByTitle, setSubtitlesByTitle] = useState({});

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

            <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center relative">

                {/* LOGO */}
                <span
                    className="text-xl font-semibold cursor-pointer text-(--text-primary)"
                    onClick={() => navigate("/")}
                >
                    Mr. Professional
                </span>

                {/* HAMBURGER RIGHT */}
                <button
                    className="lg:hidden ml-auto text-2xl"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

                {/* DESKTOP MENU */}
                <ul className="hidden lg:flex items-center gap-14 ml-auto text-(--text-primary)">

                    {STATIC_NAV.map(item => (
                        <li key={item.label}>
                            <button
                                onClick={() => navigate(item.path)}
                                className="hover:text-(--color-brand-hover)"
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
                                        className={`text-xs transition ${isOpen && "rotate-180"}`}
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
                                        anchorEl={itemRefs.current[nav._id]}
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

            {/* ================= MOBILE DRAWER ================= */}
            {mobileOpen && (
                <div className="lg:hidden bg-(--bg-secondary) shadow-xl">

                    <ul className="flex flex-col p-6 gap-4">

                        {STATIC_NAV.map(item => (
                            <li key={item.label}>
                                <button
                                    className="w-full text-left text-lg"
                                    onClick={() => {
                                        navigate(item.path);
                                        setMobileOpen(false);
                                    }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}

                        {/* DYNAMIC */}
                        {navItems.map(nav => (
                            <li key={nav._id}>

                                <button
                                    className="flex justify-between w-full text-lg"
                                    onClick={() =>
                                        setOpenMenu(openMenu === nav._id ? null : nav._id)
                                    }
                                >
                                    {nav.name}
                                    ▼
                                </button>

                                {openMenu === nav._id && (
                                    <div className="pl-4 mt-2 space-y-2">

                                        {(titlesByNav[nav._id] || []).map(t => (
                                            <button
                                                key={t._id}
                                                className="block text-sm"
                                                onClick={() => navigateToService(t.title, nav.name)}
                                            >
                                                {t.title}
                                            </button>
                                        ))}

                                    </div>
                                )}
                            </li>
                        ))}

                    </ul>
                </div>
            )}
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
        const compute = () => {
            const vw = window.innerWidth;
            const desired = Math.min(720, vw - 16);
            const rect = anchorEl?.getBoundingClientRect();

            let left = rect
                ? rect.left + rect.width / 2 - desired / 2
                : (vw - desired) / 2;

            left = Math.max(8, Math.min(left, vw - desired - 8));
            const top = rect ? rect.bottom + 14 : 100;

            setPos({ left, top, width: desired });
        };

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
