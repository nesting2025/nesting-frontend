import { useEffect, useState } from "react";

export default function useScreenSize () {
    const getScreenSize = () => {
        if (window.innerWidth <= 360) return "extra-small";
        else if (window.innerWidth < 768) return "small";
        else if (window.innerWidth < 1439) return "medium";
        else return "large";
    };

    const [screenSize, setScreenSize] = useState(getScreenSize());

    useEffect(() => {
        const handleResize = () => {
        setScreenSize(getScreenSize());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        screenSize,
        isExtraSmall: screenSize === "extra-small",
        isSmall: screenSize === "small",
        isMedium: screenSize === "medium",
        isLarge: screenSize === "large",
    };
}