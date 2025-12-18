import React from "react";
import NavProfile from "./NavProfile";
import NavItems from "./NavItems";
import useScrollState from "../hooks/useScrollState";

const NavBar = () => {
    const { hideUpper, lowerSticky } = useScrollState({ lowerStickyThreshold: 260 });

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-60 w-full">
                <NavProfile hidden={hideUpper} transparent={!lowerSticky} />
                <NavItems
                    sticky={lowerSticky}
                    adoptUpperColor={lowerSticky}
                    transparent={!lowerSticky}  
                />
            </div>

            {/* Always include spacer to ensure navbar takes up space */}
            <div style={{ height: "var(--navbar-height)" }} />
        </>
    );
};

export default NavBar;
