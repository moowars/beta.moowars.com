import React, { useEffect, useState } from "react";

export const MobileContext = React.createContext(false);

const MobileCheckContext: React.FC = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize mobile check
    setIsMobile(window.innerWidth > 768 ? false : true);

    // Change mobile check on resize
    window.addEventListener("resize", () =>
      window.innerWidth > 768 ? setIsMobile(false) : setIsMobile(true)
    );

    // Remove the listener on unmount
    return window.removeEventListener("resize", () =>
      window.innerWidth > 768 ? setIsMobile(false) : setIsMobile(true)
    );
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
  );
};

export default MobileCheckContext;
