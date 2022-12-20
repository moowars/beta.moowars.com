import React from "react";
import Navbar from "../components/global/Navbar";
import { motion } from "framer-motion";

type Props = {
  siteTitle: string;
  bgColorClass: string;
};

const MainLayout: React.FC<Props> = ({ bgColorClass, siteTitle, children }) => {
  return (
    <div
      className={`min-h-screen ${bgColorClass} relative z-0 flex flex-col items-center`}
    >
      {/* Background Image */}
      <div
        id="bg-image"
        className="absolute inset-0 w-full h-full overflow-hidden -z-20"
      >
        <div
          className="absolute inset-0 w-full h-full mix-blend-normal"
          style={{
            background:
              "linear-gradient(180deg, #F4F2EA 11.98%, #EDE3D9 17.19%, #EDE3D9 100%)",
          }}
        />
        <img
          className="absolute inset-0 object-cover w-full h-[120%] mix-blend-soft-light"
          alt="header frame for image"
          src="/11039147924_19a31d097f_k1.png"
        />
      </div>

      <Navbar siteTitle={siteTitle} />

      <motion.main
        key={siteTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col flex-grow w-full h-full md:max-w-7xl"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default MainLayout;
