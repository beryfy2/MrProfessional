/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFire } from "@fortawesome/free-solid-svg-icons";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function NavItems({ transparent = false }) {
    const navigate = useNavigate();
    const solidBg = "bg-[#0f4260]";
    const glassBg = "bg-[#0f4260]/40";
    const finalBg = transparent ? glassBg : solidBg;

    const [navItems, setNavItems] = useState([]);
    const [openMenu, setOpenMenu] = useState(null); // nav item id
    const closeTimer = useRef(null);
    const openTimer = useRef(null);
    const [titlesByNav, setTitlesByNav] = useState({}); // { navId: Title[] }
    const [hoverTitleId, setHoverTitleId] = useState(null);
    const [subtitlesByTitle, setSubtitlesByTitle] = useState({}); // { titleId: Subtitle[] }
    const itemRefs = useRef({}); // map navId -> li element
    const [menuHovering, setMenuHovering] = useState(false);
    const [headHovering, setHeadHovering] = useState(false);

    useEffect(() => {
        function handleWindowMouseOut(e) {
            if (!e.relatedTarget) {
                setOpenMenu(null);
                setHoverTitleId(null);
                setMenuHovering(false);
                setHeadHovering(false);
            }
        }
        window.addEventListener('mouseout', handleWindowMouseOut);
        return () => window.removeEventListener('mouseout', handleWindowMouseOut);
    }, []);

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

    const scheduleClose = () => {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            setOpenMenu(null);
        }, 180);
    };


    const handleItemEnter = (navId) => {
        setHeadHovering(true);
        if (openTimer.current) clearTimeout(openTimer.current);
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        openTimer.current = setTimeout(() => open(navId), 80);
    };
    const handleItemLeave = () => {
        setHeadHovering(false);
        scheduleClose(220);
    };
    const handleMenuEnter = () => {
        setMenuHovering(true);
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };
    const handleMenuLeave = () => {
        setMenuHovering(false);
        scheduleClose(220);
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
            className={`${finalBg} transition-all duration-300 ${transparent ? "backdrop--md" : "shadow-lg"
                }`}
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
                <ul className="hidden lg:flex items-center gap-6 text-white text-[14px] font-medium" onMouseLeave={() => { setHeadHovering(false); setMenuHovering(false); scheduleClose(100); }}>
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

                {/* Right icons */}
                <div className="flex items-center gap-4 text-white">
                    <i className="fa-brands fa-whatsapp cursor-pointer" />
                    <i className="fa-brands fa-facebook-f cursor-pointer" />
                    <i className="fa-brands fa-instagram cursor-pointer" />
                </div>
            </div>
        </div>
    );
}



function BusinessSetupMenu({ onMouseEnter, onMouseLeave }) {
    return (
        <div
            className="absolute left-[580px] -translate-x-1/2 top-full mt-2 w-7xl max-w-[95vw] z-50"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="bg-white rounded-3xl shadow-2xl border-t-4 border-green-400 overflow-hidden">
                <div className="flex">
                    {/* Left column */}
                    <div className="w-1/4 border-r">
                        <div className="bg-sky-900 text-white font-semibold px-4 py-2">
                            Entity Registration
                        </div>
                        <ul className="text-sm text-gray-800">
                            {[
                                "Hospitality Business Setup",
                                "FSSAI Licence I",
                                "FSSAI Licence II",
                                "NGO",
                                "Healthcare Business",
                                "Fire NOC",
                                "Subsidy",
                                "Startup India Registration",
                            ].map((item) => (
                                <li key={item} className="border-b last:border-b-0">
                                    <button
                                        type="button"
                                        className="w-full text-left px-4 py-2 hover:bg-sky-50 cursor-pointer"
                                        onClick={() => { const slug = item.toLowerCase().replace(/\.(php|html)$/, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'); window.location.href = `/services/${slug}` }}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Domestic */}
                    <div className="w-2/5 px-6 py-4">
                        <h4 className="text-green-600 font-semibold mb-3">
                            DOMESTIC REGISTRATION
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-900">
                            {[
                                "Company Registration",
                                "Private Limited Company",
                                "Partnership Firm Registration",
                                "Limited Liability Partnership",
                                "One Person Company",
                                "Sole Proprietorship Registration",
                                "Section 8 Company",
                                "Society Registration",
                                "Nidhi Company",
                                "Section 8 Microfinance Company",
                                "NGO Registration",
                                "Public Limited Company",
                                "Producer Company",
                            ].map((item) => (
                                <li key={item}>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 hover:text-sky-700 cursor-pointer"
                                        onClick={() => { const slug = item.toLowerCase().replace(/\.(php|html)$/, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'); window.location.href = `/services/${slug}` }}
                                    >
                                        {["Limited Liability Partnership", "Producer Company"].includes(
                                            item
                                        ) && (
                                                <FontAwesomeIcon
                                                    icon={faFire}
                                                    className="text-orange-500 text-xs"
                                                />
                                            )}
                                        <span>{item}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* International */}
                    <div className="flex-1 px-6 py-4 border-l">
                        <h4 className="text-green-600 font-semibold mb-3">
                            INTERNATIONAL REGISTRATION
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-900">
                            {[
                                "Foreign Company Registration",
                                "Foreign Subsidiary Company",
                                "Incorporation in USA",
                                "Incorporation in UK",
                                "Incorporation in Singapore",
                                "Incorporation in Australia",
                                "Incorporation in Switzerland",
                                "Incorporation in China",
                                "Incorporation in Dubai",
                                "Incorporation in Hong Kong",
                                "Incorporation in Malaysia",
                                "Incorporation in Netherlands",
                            ].map((item, idx) => (
                                <li key={item}>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 hover:text-sky-700 cursor-pointer"
                                        onClick={() => { const slug = item.toLowerCase().replace(/\.(php|html)$/, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'); window.location.href = `/services/${slug}` }}
                                    >
                                        <span>{item}</span>
                                        {idx < 2 && (
                                            <FontAwesomeIcon
                                                icon={faFire}
                                                className="text-orange-500 text-xs"
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
            const top = rect.bottom + 12;
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
