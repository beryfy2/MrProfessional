/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFire, faNewspaper, faPenNib, faBlog } from "@fortawesome/free-solid-svg-icons";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function NavItems({ transparent = false }) {
    const navigate = useNavigate();
    const solidBg = "bg-[#0f4260]";
    const finalBg = solidBg;

    const [navItems, setNavItems] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const closeTimer = useRef(null);
    const openTimer = useRef(null);
    const [titlesByNav, setTitlesByNav] = useState({});
    const [hoverTitleId, setHoverTitleId] = useState(null);
    const [subtitlesByTitle, setSubtitlesByTitle] = useState({});
    const itemRefs = useRef({});
    const [menuHovering, setMenuHovering] = useState(false);
    const [headHovering, setHeadHovering] = useState(false);
    const leaveTimer = useRef(null);
    const menuHoveringRef = useRef(false);
    const headHoveringRef = useRef(false);

    useEffect(() => {
        function handleWindowMouseOut(e) {
            if (!e.relatedTarget) {
                setOpenMenu(null);
                setHoverTitleId(null);
                menuHoveringRef.current = false;
                headHoveringRef.current = false;
                setMenuHovering(false);
                setHeadHovering(false);
            }
        }
        window.addEventListener('mouseout', handleWindowMouseOut);
        return () => window.removeEventListener('mouseout', handleWindowMouseOut);
    }, []);

    // Close dropdown menus on scroll
    useEffect(() => {
        function handleScroll() {
            if (openMenu !== null) {
                setOpenMenu(null);
                setHoverTitleId(null);
                menuHoveringRef.current = false;
                headHoveringRef.current = false;
                setMenuHovering(false);
                setHeadHovering(false);
                // Clear all timers
                if (closeTimer.current) {
                    clearTimeout(closeTimer.current);
                    closeTimer.current = null;
                }
                if (openTimer.current) {
                    clearTimeout(openTimer.current);
                    openTimer.current = null;
                }
                if (leaveTimer.current) {
                    clearTimeout(leaveTimer.current);
                    leaveTimer.current = null;
                }
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [openMenu]);

    useEffect(() => {
        fetch(`${API_BASE}/nav-items`).then((r) => r.json()).then((items) => setNavItems(items || []));
    }, []);

    const open = (navId) => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setOpenMenu(navId);
        setHoverTitleId(null); // reset hovered title when switching head item
        if (!titlesByNav[navId]) {
            fetch(`${API_BASE}/nav-items/${navId}/titles`).then((r) => r.json()).then((titles) => {
                setTitlesByNav((prev) => ({ ...prev, [navId]: titles || [] }));
            });
        }
    };

    const scheduleClose = (delay = 200) => {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            // Check current hover state using refs to avoid stale closures
            if (!menuHoveringRef.current && !headHoveringRef.current) {
                setOpenMenu(null);
                setHoverTitleId(null);
            }
        }, delay);
    };


    const handleItemEnter = (navId) => {
        // Clear any pending leave timer
        if (leaveTimer.current) {
            clearTimeout(leaveTimer.current);
            leaveTimer.current = null;
        }
        headHoveringRef.current = true;
        setHeadHovering(true);
        if (openTimer.current) clearTimeout(openTimer.current);
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        openTimer.current = setTimeout(() => open(navId), 80);
    };
    const handleItemLeave = () => {
        // Don't immediately set headHovering to false - wait a bit
        // This prevents flickering when moving to dropdown
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
        leaveTimer.current = setTimeout(() => {
            // Only close if not hovering over the menu (check ref for current value)
            if (!menuHoveringRef.current) {
                headHoveringRef.current = false;
                setHeadHovering(false);
                scheduleClose(200);
            }
            leaveTimer.current = null;
        }, 50);
    };
    const handleMenuEnter = () => {
        // Clear any pending leave timer
        if (leaveTimer.current) {
            clearTimeout(leaveTimer.current);
            leaveTimer.current = null;
        }
        menuHoveringRef.current = true;
        headHoveringRef.current = true;
        setMenuHovering(true);
        setHeadHovering(true);
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        if (openTimer.current) {
            clearTimeout(openTimer.current);
            openTimer.current = null;
        }
    };
    const handleMenuLeave = () => {
        menuHoveringRef.current = false;
        headHoveringRef.current = false;
        setMenuHovering(false);
        setHeadHovering(false);
        scheduleClose(200);
    };

    const toggleClick = (navId) => {
        // optional click toggle
        setOpenMenu((prev) => (prev === navId ? null : navId));
    };

    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/\.(php|html)$/, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/, '-');
    };

    const navigateToService = (name, navName) => {
        // Handle Tools section differently
        if (navName === 'Tools') {
            const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/calculator$/, '-calculator');
            navigate(`/tools/${slug}`);
            return;
        }

        const base = slugify(name);
        // Try base slug first; ServicePage will attempt common variants
        navigate(`/services/${base}`);
    };

    return (
        <div
            className={`${finalBg} transition-all duration-300 shadow-lg`}
        >
            <div className="max-w-[1500px] h-15 mx-auto px-6 py-4 flex items-center justify-between relative">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <a href="/">
                        <div className="flex items-center gap-3">
                            <span className="text-white font-semibold hidden sm:inline">
                                Company
                            </span>
                        </div>
                    </a>
                </div>

                {/* Nav links */}
                <ul className="hidden lg:flex items-center gap-6 text-white text-[14px] font-medium">
                    {navItems.map((nav) => {
                        const isOpen = openMenu === nav._id;
                        const titles = titlesByNav[nav._id] || [];

                        return (
                            // wrapper includes both button + dropdown
                            <li
                                key={nav._id}
                                className="relative"
                                onMouseEnter={() => handleItemEnter(nav._id)}
                                onMouseLeave={handleItemLeave}
                                ref={(el) => { if (el) itemRefs.current[nav._id] = el; }}
                            >
                                <button
                                    type="button"
                                    className={`flex items-center gap-1 cursor-pointer transition px-2 py-1 ${isOpen ? "text-green-400" : "hover:text-green-400"
                                        }`}
                                    onClick={() => toggleClick(nav._id)}
                                >
                                    <span>{nav.name}</span>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`text-green-400 text-xs transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* dropdowns */}
                                {isOpen && (
                                    <DynamicMenu
                                        title={nav.name}
                                        titles={titles}
                                        hoverTitleId={hoverTitleId}
                                        onHoverTitle={(tid) => {
                                            setHoverTitleId(tid);
                                            if (!subtitlesByTitle[tid]) {
                                                fetch(`${API_BASE}/titles/${tid}/subtitles`).then((r) => r.json()).then((subs) => {
                                                    setSubtitlesByTitle((prev) => ({ ...prev, [tid]: subs || [] }));
                                                });
                                            }
                                        }}
                                        subtitles={hoverTitleId ? (subtitlesByTitle[hoverTitleId] || []) : []}
                                        anchorEl={itemRefs.current[nav._id]}
                                        onMouseEnter={handleMenuEnter}
                                        onMouseLeave={handleMenuLeave}
                                        onSelectService={(serviceName) => navigateToService(serviceName, nav.name)}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Blog */}
                <button
                    type="button"
                    onClick={() => navigate("/blogs")}
                    className="flex items-center gap-2 text-white font-medium px-3 py-1.5 rounded-lg
                        hover:bg-white/10 hover:text-green-400 transition-all duration-200"
                >
                    <FontAwesomeIcon icon={faNewspaper} className="text-sm" />
                    <span className="hidden sm:inline">Blog</span>
                </button>


            </div>
        </div>

    );
}


function DynamicMenu({ title, titles, hoverTitleId, onHoverTitle, subtitles, anchorEl, onMouseEnter, onMouseLeave, onSelectService }) {
    const [pos, setPos] = useState({ left: 8, top: 0, width: Math.min(720, typeof window !== 'undefined' ? window.innerWidth - 16 : 720) });
    const activeTitle = titles.find((t) => t._id === hoverTitleId);

    useEffect(() => {
        function compute() {
            const vw = window.innerWidth;
            const desired = Math.min(720, vw - 16);
            const margin = 8;
            if (!anchorEl) {
                const left = Math.max(margin, (vw - desired) / 2);
                setPos({ left, top: 100, width: desired });
                return;
            }
            const rect = anchorEl.getBoundingClientRect();
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

    return (
        <div
            className="fixed z-50"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ left: pos.left, top: pos.top, width: pos.width, maxWidth: '92vw' }}
        >
            <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-green-400">
                <div className="px-6 py-5 grid grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-green-600 font-semibold mb-2">Titles</h4>
                        <div className="text-sky-900 font-semibold mb-3">{title}</div>
                        <ul className="space-y-2 text-sm text-gray-800">
                            {titles.length === 0 ? (
                                <li className="text-gray-500">No titles yet</li>
                            ) : (
                                titles.map((t) => (
                                    <li key={t._id}>
                                        <button
                                            type="button"
                                            className={`w-full text-left px-3 py-2 rounded-lg cursor-pointer transition ${hoverTitleId === t._id ? "bg-sky-50" : "hover:bg-sky-50"}`}
                                            onMouseEnter={() => onHoverTitle(t._id)}
                                            onClick={() => onHoverTitle(t._id)}
                                        >
                                            {t.title}
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-green-600 font-semibold mb-3">Subtitles{activeTitle ? ` — ${activeTitle.title}` : ''}</h4>
                        <ul className="space-y-1 text-sm text-gray-900">
                            {subtitles.length === 0 ? (
                                <li className="text-gray-500">Hover a title to see subtitles</li>
                            ) : (
                                subtitles.map((s, idx) => (
                                    <li key={s._id}>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 hover:text-sky-700 cursor-pointer"
                                            onClick={() => {
                                                if (typeof onSelectService === 'function') onSelectService(s.title);
                                                else { const slug = s.title.toLowerCase().replace(/\.(php|html)$/, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'); window.location.href = `/services/${slug}` }
                                            }}
                                        >
                                            <span>{s.title}</span>
                                            {idx < 2 && (
                                                <FontAwesomeIcon icon={faFire} className="text-orange-500 text-xs" />
                                            )}
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
