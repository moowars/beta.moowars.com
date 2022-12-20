import React from "react";
import { AnimatePresence, motion, Transition } from "framer-motion";
import Uninitiated from "./Uninitiated";
import Loading from "./Loading";
import Success from "./Success";
import ExpandedMoo from "./ExpandedMoo";
import useMeasure from "react-use-measure";
import { useOpenPacksStore } from "@lib/open-packs/useOpenPacksStore";
import { MobileContext } from "@lib/MobileCheck";
import { MooType } from "types/MooType";

type Props = {
  loading: boolean;
  openedMoos: MooType[];
};

const DropZone = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const isMobile = React.useContext(MobileContext);
  const packBeingDragged = useOpenPacksStore((state) => state.packBeingDragged);
  const expandedMooID = useOpenPacksStore((state) => state.expandedMooID);
  const setBounds = useOpenPacksStore((state) => state.setDropZoneBounds);
  const [dropZoneRef, bounds] = useMeasure();

  // Set dropzone bounds on mount.
  React.useEffect(() => {
    setBounds(bounds);
  }, [setBounds, bounds]);

  return (
    <div className="w-[310.19px] md:w-[787px] h-full">
      <h2 className="mb-0.5 md:text-3xl text-[24px] text-center capitalize font-cinder">
        Opening Portal
      </h2>
      <div className="relative flex items-start justify-center w-full h-[267.13px] md:h-full">
        {/* Background Frame */}
        {isMobile ? (
          <img
            src="/open-packs/opening-portal-border-mobile.svg"
            alt="Open Portal Border"
            className="absolute inset-0 object-contain w-full h-full"
          />
        ) : (
          <img
            src="/open-packs/opening-portal-border.svg"
            alt="Open Portal Border"
            className="absolute inset-0 object-contain w-full h-full"
          />
        )}

        {/* DropZone Container */}
        <motion.div
          ref={dropZoneRef}
          className="w-[290px] md:w-full md:mx-12 md:h-[490px] h-[227px] mt-2 md:mt-5 rounded-md backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(124, 38, 54, 0.1) 0%, rgba(237, 227, 217, 0.1) 100%)",
            boxShadow:
              "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 9px 14px -10px rgba(232, 255, 249, 0.25)",
          }}
        >
          <AnimatePresence exitBeforeEnter>
            {props.loading && <Loading key={"loading"} />}
            {!props.loading &&
              props.openedMoos.length > 0 &&
              !packBeingDragged && (
                <Success openedMoos={props.openedMoos} key={"success"} />
              )}
            {!props.loading &&
              (packBeingDragged || props.openedMoos.length === 0) && (
                <Uninitiated dragState={packBeingDragged} key={"uninitiated"} />
              )}
          </AnimatePresence>
          <AnimatePresence>
            {expandedMooID !== undefined && (
              <ExpandedMoo key={"expandedMoo"} expandedMooID={expandedMooID} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default DropZone;
