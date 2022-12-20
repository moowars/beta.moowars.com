import React, { Component } from "react";
import { animate, motion } from "framer-motion";

type Props = {};

const PercentMinted = (props: Props) => {
  const TOTAL_NFTS = 80000;
  const NUM_MINTED = 60000;
  const PERCENT_MINTED = Math.round((NUM_MINTED / TOTAL_NFTS) * 100);

  const numberAnimationRef = React.useRef<HTMLSpanElement>(null);
  const percentAnimationRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const controls = animate(0, NUM_MINTED, {
      delay: 0.8,
      duration: 1.6,
      type: "tween",
      ease: "easeInOut",
      onUpdate: (value) => {
        // Prevents Client-Side error on changing pages if animation has not finished.
        if (
          numberAnimationRef.current === null ||
          percentAnimationRef.current === null
        )
          return;

        numberAnimationRef.current.textContent =
          Math.round(value).toLocaleString();
        percentAnimationRef.current.textContent = Math.round(
          (value / TOTAL_NFTS) * 100
        ).toFixed(0);
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <div className="md:w-[1279px] py-9 md:py-0 w-full md:h-40 flex flex-col justify-center items-center relative md:space-y-6 space-y-4">
      {/* Background */}
      <div className="md:w-[1279px] md:h-40 rounded-t-md bg-maroon mix-blend-multiply absolute inset-0 -z-10" />

      {/* Progress Bar */}
      <div className="md:w-[951px] w-[90%] h-2 border rounded-full border-light-green overflow-visible flex items-center justify-start">
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${PERCENT_MINTED}%` }}
          transition={{
            delay: 0.8,
            duration: 1.6,
            type: "tween",
            ease: "easeInOut",
          }}
          className="h-full overflow-hidden bg-light-green"
        >
          <motion.div
            className="w-1/3 h-full opacity-75 bg-gradient-to-r from-transparent via-white to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          />
        </motion.div>

        {/* Icon */}
        <div className="relative z-0 -m-5 aspect-square md:w-11 w-9">
          <img
            src="/mint/progress-marker.svg"
            className="relative object-contain w-full h-full drop-shadow-md"
            alt="Progress Icon"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 0.8,
            }}
            className="absolute inset-0 rounded-full -z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
            }}
          />
        </div>
      </div>

      {/* Text Percentage */}
      <p className="text-sm font-bold uppercase font-lexend-exa text-offwhite md:text-base">
        <motion.span ref={numberAnimationRef}>0</motion.span>/
        {TOTAL_NFTS.toLocaleString()} MINTED (
        <motion.span ref={percentAnimationRef}>0</motion.span>%)
      </p>
    </div>
  );
};

export default PercentMinted;
