import React from "react";
import NavProfile from "./NavProfile";
import NavItems from "./NavItems";
import useScrollState from "../hooks/useScrollState";

const NavBar = () => {
    const { hideUpper, lowerSticky } = useScrollState({ lowerStickyThreshold: 260 });

    return (
        <>
            <NavProfile hidden={hideUpper} />
            <div
                className={`w-full transition-all duration-300 ${lowerSticky ? "fixed top-0 left-0 right-0 z-60" : "absolute top-14 left-0 right-0 z-40"
                    }`}
            >
                <NavItems
                    sticky={lowerSticky}
                    adoptUpperColor={lowerSticky}
                    transparent={!lowerSticky}  
                />
            </div>

            {lowerSticky && <div style={{ height: "72px" }} />}
        </>
    );
};

export default NavBar;
