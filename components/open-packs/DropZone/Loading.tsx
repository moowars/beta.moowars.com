import { MobileContext } from "@lib/MobileCheck";
import { useOpenPacksStore } from "@lib/open-packs/useOpenPacksStore";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Loading = () => {
  const isMobile = React.useContext(MobileContext);
  const poofAnimationPlaying = useOpenPacksStore(
    (state) => state.poofAnimationPlaying
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1,
      }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 1,
      }}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <AnimatePresence exitBeforeEnter>
        {poofAnimationPlaying ? (
          <motion.video
            key={"poof-animation"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              type: "tween",
              ease: "easeInOut",
            }}
            controls={false}
            muted
            playsInline
            autoPlay
            preload="auto"
            className="w-full h-full object-cover absolute inset-0"
          >
            Your device does not support HTML5 video.
            <source type="video/mp4" src="/open-packs/poof-animation.mp4" />
          </motion.video>
        ) : (
          <>
            <motion.div
              /* Loading Card */
              key={"loading-card"}
              initial={{ x: 0, scale: 1 }}
              animate={{
                x: isMobile ? 5 : 10,
                scale: 1,
                transition: {
                  repeat: Infinity,
                  repeatType: "loop",
                  type: "spring",
                  damping: 0.15,
                  mass: 0.05,
                  stiffness: 300,
                },
              }}
              exit={{ x: 0, scale: 0 }}
              transition={{
                duration: 0.2,
                type: "tween",
                ease: "easeInOut",
              }}
              className="w-[94.08px] h-[131.2px] md:w-[169px] md:h-[237px] z-50 hover:cursor-grab active:cursor-grabbing active:z-50"
            >
              <img
                src="/open-packs/unopened-card-pack.png"
                alt="Unopened Card Pack"
                className="object-contain w-full h-full pointer-events-none"
              />
            </motion.div>

            <div className="absolute bottom-5 font-lexend-exa text-[11px] tracking-tighter leading-[13.75px] w-full text-center">
              Waiting on the BlockChain... This might take a minute.
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Loading;
