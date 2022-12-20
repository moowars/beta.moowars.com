import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOpenPacksStore } from "@lib/open-packs/useOpenPacksStore";
import { useStore } from "@lib/useStore";
import { MooType } from "types/MooType";

type Props = {
  img: string;
  id: number;
  moo: MooType;
};

const IndividualMoo = (props: Props) => {
  const [bgAudioMuted] = useStore((state) => [state.bgAudioMuted]);
  const sfxControllerRef_hover = React.useRef<HTMLAudioElement>(null!);

  const [setExpandedMoo, setExpandedMooID, setExpandedMooImg] =
    useOpenPacksStore((state) => [
      state.setExpandedMoo,
      state.setExpandedMooID,
      state.setExpandedMooImg,
    ]);
  const [hover, setHover] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);

  const openCard = () => setFlipped(true);

  return (
    <>
      {/* Audio Controls */}
      <audio ref={sfxControllerRef_hover}>
        <source
          src="/open-packs/OpenPacks_PackCardHover.wav"
          type="audio/wav"
        />
      </audio>

      <motion.div
        className="w-[63.5px] md:w-[107px] aspect-square relative rounded-[5px] flex flex-col items-center justify-center hover:cursor-pointer"
        initial={{
          filter:
            "drop-shadow(0px 0px 10px rgba(51, 177, 116, 0)) drop-shadow(0px 4px 6px rgba(16, 37, 37, 0))",
        }}
        animate={{
          filter: hover
            ? "drop-shadow(0px 0px 6px rgba(51, 177, 116, 1)) drop-shadow(0px 0px 4px rgba(16, 37, 37, 0.2))"
            : "drop-shadow(0px 0px 6px rgba(51, 177, 116, 0)) drop-shadow(0px 0px 4px rgba(16, 37, 37, 0.0))",
        }}
        onHoverStart={() => {
          if (!bgAudioMuted) {
            sfxControllerRef_hover.current.play();
          }
          setHover(true);
        }}
        onHoverEnd={() => setHover(false)}
        onClick={openCard}
      >
        <AnimatePresence exitBeforeEnter>
          {!flipped ? (
            <motion.div
              initial={{
                rotateY: 0,
              }}
              exit={{
                rotateY: -90,
              }}
              transition={{
                type: "tween",
              }}
              key={"unopened"}
              className="absolute w-full h-full"
            >
              <img
                src={"/open-packs/mystery-moo.png"}
                alt="mystery-moo.png"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              key={"opened"}
              layoutId={props.id + props.img}
              className="w-[63.5px] h-[63.5px] md:w-[107px] md:h-[107px] relative"
              initial={{ rotateY: 90 }}
              animate={{
                rotateY: 0,
              }}
              transition={{
                type: "tween",
              }}
              onClick={() => {
                setExpandedMoo(props.moo);
                setExpandedMooID(props.id.toString());
                setExpandedMooImg(props.img);
              }}
            >
              <motion.img
                src={props.img}
                height={107}
                width={107}
                alt={`Image for Moo# ${props.moo.id}`}
                className="absolute flex flex-col items-center justify-center object-cover rounded-[5px] w-full h-full overflow-hidden bg-gray-400"
                loading="eager"
              />

              {/* Hover overlay */}
              <AnimatePresence>
                {hover && (
                  <motion.div
                    key={"hovering-info"}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      type: "tween",
                    }}
                    className="absolute w-full h-full z-10 flex items-end pb-2 justify-center bg-gradient-to-t from-black/50 to-transparent rounded-[5px] pointer-events-none text-white text-center font-lexend-exa tracking-tighter text-sm"
                  >
                    <motion.p
                      key="hover-text"
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      exit={{ y: 10 }}
                      transition={{ type: "spring", mass: 0.5, damping: 13 }}
                    >
                      See Details
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default IndividualMoo;
