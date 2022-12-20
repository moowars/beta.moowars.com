import React from "react";
import { motion, PanInfo, useMotionValue, useSpring } from "framer-motion";
import useMeasure, { RectReadOnly } from "react-use-measure";
import { Portal } from "@headlessui/react";
import { useOpenPacksStore } from "@lib/open-packs/useOpenPacksStore";
import { MobileContext } from "@lib/MobileCheck";
import { useStore } from "@lib/useStore";

type Props = {
  notifyDragPosition: ({ x, y }: { x: number; y: number }) => void;
};

const UnopenedCardPack = (props: Props) => {
  const sfxControllerRef_click = React.useRef<HTMLAudioElement>(null!);
  const sfxControllerRef_hover = React.useRef<HTMLAudioElement>(null!);
  const sfxControllerRef_overDropZone = React.useRef<HTMLAudioElement>(null!);

  const isMobile = React.useContext(MobileContext);
  const dropZoneBounds = useOpenPacksStore((state) => state.dropZoneBounds);
  const setPackBeingDragged = useOpenPacksStore(
    (state) => state.setPackBeingDragged
  );
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [isInDropZone, setIsInDropZone] = React.useState(false);

  const [mouseDown, setMouseDown] = useOpenPacksStore((state) => [
    state.mouseDown,
    state.setMouseDown,
  ]);

  const dragXDelta = useMotionValue(0);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const rotate = useSpring(dragXDelta, { damping: 25, stiffness: 400 });

  const dragSpringProps = {
    damping: 100,
    stiffness: 1500,
    mass: 1,
  };
  const dragXSpring = useSpring(dragX, dragSpringProps);
  const dragYSpring = useSpring(dragY, dragSpringProps);

  // const snapToPosition = {
  //   x: dropZoneBounds.left + dropZoneBounds.width / 2,
  //   y: dropZoneBounds.top + dropZoneBounds.height / 2,
  // };

  const handleDrag = (event: DragEvent, info: PanInfo) => {
    const positionInDropZone =
      info.point.x > dropZoneBounds.left &&
      info.point.x < dropZoneBounds.right &&
      info.point.y > dropZoneBounds.top &&
      info.point.y < dropZoneBounds.bottom;

    // Rotate card based on speed of dragging on x-axis
    dragXDelta.set(isInDropZone ? 0 : info.delta.x * Math.PI * 0.3);

    // Notify the global state of drag position.
    props.notifyDragPosition({
      x: info.point.x,
      y: info.point.y,
    });

    // Update state of whether drag position is in drop zone.
    if (positionInDropZone) {
      if (!isInDropZone) {
        setIsInDropZone(true);
        if (!bgAudioMuted) {
          sfxControllerRef_overDropZone.current.volume = 0.2;
          sfxControllerRef_overDropZone.current.play();
        }
      }
    } else {
      if (isInDropZone) {
        setIsInDropZone(false);
        if (!bgAudioMuted) {
          sfxControllerRef_overDropZone.current.pause();
          sfxControllerRef_overDropZone.current.currentTime = 0;
        }
      }
    }

    // Animate card position based on whether drag position is in drop zone.
    // FIXME: The snap position doesn't quite feel right. So I've removed it for now.
    // dragX.set(isInDropZone ? snapToPosition.x - info.point.x : 0);
    // dragY.set(isInDropZone ? snapToPosition.y - info.point.y : 0);
  };

  // Audio Controller
  const [bgAudioMuted] = useStore((state) => [state.bgAudioMuted]);

  return (
    <>
      <audio ref={sfxControllerRef_click}>
        <source
          src="/open-packs/OpenPacks_PackCardClick.wav"
          type="audio/wav"
        />
      </audio>
      <audio ref={sfxControllerRef_hover}>
        <source
          src="/open-packs/OpenPacks_PackCardHover.wav"
          type="audio/wav"
        />
      </audio>
      <audio ref={sfxControllerRef_overDropZone} loop>
        <source
          src="/open-packs/OpenPacks_PortalDragOver.wav"
          type="audio/wav"
        />
      </audio>

      {/* Height Wrapper */}
      <motion.div
        initial={{
          height: isMobile ? 131.2 : 237,
          width: isMobile ? 94.08 : 169,
        }}
        animate={{
          height: dragging && !isMobile ? 0 : isMobile ? 131.2 : 237,
          width: dragging && isMobile ? 0 : isMobile ? 94.08 : 169,
        }}
        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
        className="md:w-[169px] w-[94.08px] group"
        onMouseEnter={() => {
          if (!bgAudioMuted && !mouseDown) {
            sfxControllerRef_hover.current.play();
          }
          setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
        onMouseDown={() => {
          setMouseDown(true);
          setActive(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
          setActive(false);
        }}
        onTap={() => {
          setHover(false);
        }}
        onTapStart={() => {
          if (!bgAudioMuted) {
            sfxControllerRef_click.current.play();
          }
        }}
      >
        {/* Draggable Card */}
        <motion.div
          drag
          // If not in the drop zone, return to origin
          dragSnapToOrigin={!isInDropZone}
          onDragStart={() => {
            setPackBeingDragged(true);
            setDragging(true);
          }}
          onDragEnd={() => {
            setPackBeingDragged(false);
            setDragging(false);
          }}
          onDrag={handleDrag}
          initial={{ opacity: 0, rotate: 0, scale: 1 }}
          whileDrag={{ opacity: 1 }}
          whileTap={{ scale: 1.1 }}
          style={{ rotate }}
          transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
          className="md:w-[169px] md:h-[237px] h-[131.2px] w-[94.08px] z-50 hover:cursor-grab active:cursor-grabbing active:z-50 fixed"
        >
          <motion.img
            src="/open-packs/unopened-card-pack.png"
            alt="Unopened Card Pack"
            className="object-contain md:w-[169px] md:h-[237px] h-[131.2px] w-[94.08px] pointer-events-none fixed"
            style={{
              x: dragXSpring,
              y: dragYSpring,
            }}
          />
        </motion.div>

        {/* Stationary Card Placeholder */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: dragging || isInDropZone ? 0 : 1 }}
          transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
          className="relative md:w-[169px] md:h-[237px] h-[131.2px] w-[94.08px]"
        >
          <motion.img
            src="/open-packs/unopened-card-pack.png"
            alt="Unopened Card Pack"
            className="object-contain w-full h-full transition-transform pointer-events-none group-active:scale-110"
            initial={{
              filter:
                "drop-shadow(0px 0px 10px rgba(51, 177, 116, 0)) drop-shadow(0px 4px 6px rgba(16, 37, 37, 0))",
            }}
            animate={{
              filter:
                hover && !active
                  ? "drop-shadow(0px 0px 10px rgba(51, 177, 116, 1)) drop-shadow(0px 4px 6px rgba(16, 37, 37, 0.2))"
                  : "drop-shadow(0px 0px 10px rgba(51, 177, 116, 0)) drop-shadow(0px 4px 6px rgba(16, 37, 37, 0))",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default UnopenedCardPack;
