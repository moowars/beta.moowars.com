import { motion, Transition } from "framer-motion";

type Props = {
  dragState: boolean;
};

const Uninitiated = (props: Props) => {
  const GLOBAL_TRANSITION: Transition = {
    repeat: Infinity,
    repeatDelay: 0.01,
    repeatType: "mirror",
    duration: 1,
    type: "tween",
    ease: "linear",
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dragging State Overlay */}
      {props.dragState && (
        <motion.div
          key={"dragging"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center w-full h-full"
        >
          {/* Background Gradients */}
          <motion.div
            // State 1
            initial={{
              width: 629,
              height: 648,
            }}
            animate={{
              width: 495,
              height: 510,
            }}
            transition={GLOBAL_TRANSITION}
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #4E928E 0%, rgba(51, 177, 116, 0) 100%)",
            }}
            className="-z-20 w-[629px] h-[648px] absolute m-auto"
          ></motion.div>
          <motion.div
            initial={{
              width: 273,
              height: 282,
            }}
            animate={{
              width: 353,
              height: 364,
            }}
            transition={GLOBAL_TRANSITION}
            className="absolute inset-0 m-auto -z-10"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #215653 0%, rgba(51, 177, 116, 0) 100%)",
            }}
          />

          {/* Background Diamonds */}
          <motion.div
            // State 1
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={GLOBAL_TRANSITION}
            className="absolute w-[332.33px] h-[312.18px] m-auto -z-10"
          >
            <img
              src="/open-packs/drop-zone-diamonds-1.svg"
              className="object-contain w-full h-full"
              alt=""
            />
          </motion.div>
          <motion.div
            // State 2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={GLOBAL_TRANSITION}
            className="absolute w-[390.04px] h-[330.57px] m-auto -z-10"
          >
            <img
              src="/open-packs/drop-zone-diamonds-2.svg"
              className="object-contain w-full h-full"
              alt=""
            />
          </motion.div>

          {/* Card Drop Target */}
          <motion.div
            initial={{
              outlineColor: "#33B174",
              boxShadow: "inset 0px 0px 24px rgba(51, 177, 116, 0)",
            }}
            animate={{
              outlineColor: "#33B174",
              boxShadow: "inset 0px 0px 24px rgba(51, 177, 116, 1)",
            }}
            transition={GLOBAL_TRANSITION}
            className="md:w-[162px] w-[95px] md:h-[227px] h-[133.12px] rounded-[10px] outline outline-[3px] flex items-center justify-center"
          >
            <p className="text-light-green font-lexend-exa text-[11px] leading-[13.75px] tracking-tighter text-center px-4">
              Drag and drop a pack here to discover your MooWar NFTs
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Non-Dragging State Layout */}
      <div className="md:w-[162px] w-[95px] md:h-[227px] h-[133.12px] rounded-[10px] outline-dashed outline-2 md:outline-[3px] outline-[#4E928E] flex items-center justify-center">
        <p className="text-[#4E928E] font-lexend-exa text-[11px] leading-[13.75px] tracking-tighter text-center px-4">
          Drag and drop a pack here to discover your MooWar NFTs
        </p>
      </div>
    </motion.div>
  );
};

export default Uninitiated;
