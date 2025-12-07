import { useEffect, useRef, useState } from "react";

/**
 * useScrollState({ lowerStickyThreshold })
 * returns { hideUpper, lowerSticky }
 */

export default function useScrollState({ lowerStickyThreshold = 220 } = {}) {
    const [hideUpper, setHideUpper] = useState(false);
    const [lowerSticky, setLowerSticky] = useState(false);
    const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const ticking = useRef(false);

    useEffect(() => {
        function onScroll() {
            const currentY = window.scrollY;
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const delta = currentY - lastY.current;

                    // hide upper nav when scrolling down slightly and not at top
                    if (delta > 5 && currentY > 20) {
                        setHideUpper(true);
                    } else if (delta < -5) {
                        setHideUpper(false);
                    }

                    // sticky when scrolled beyond threshold
                    setLowerSticky(currentY >= lowerStickyThreshold);

                    lastY.current = currentY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [lowerStickyThreshold]);

    return { hideUpper, lowerSticky };
}
