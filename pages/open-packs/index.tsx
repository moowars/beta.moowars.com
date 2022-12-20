import DropZone from "@components/open-packs/DropZone";
import Lottie from "lottie-web";
import Head from "next/head";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import instructionLottie from "public/open-packs/instruction-lottie.json";
import UnopenedCardPack from "@components/open-packs/UnopenedCardPack";
import UnopenedPacksDrawer from "@components/open-packs/UnopenedPacksDrawer";
import { useMotionValue, motion } from "framer-motion";
import openPack from "@lib/metamask/openPack";
import { useOpenPacksStore } from "@lib/open-packs/useOpenPacksStore";
import { MobileContext } from "@lib/MobileCheck";
import { useStore } from "@lib/useStore";
import { PackCollectionToken } from "types/PackCollectionToken";
import { moowars } from "@utils/moowars";
import { useMetamask } from "@lib/metamask/useMetamask";
import { MooType } from "types/MooType";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function OpenPacksPage() {
  const isMobile = React.useContext(MobileContext);

  const sfxControllerRef_dropInDropZone = React.useRef<HTMLAudioElement>(null!);

  /**
   * OPENING PACK LOGIC
   */
  const [packCollectionArr, setPackCollectionArr] = useMetamask((state) => [
    state.unopenedPacks,
    state.setUnopenedPacks,
  ]);

  /**
   * DRAG STATE LOGIC
   */
  const packDragPosition = useMotionValue({
    x: 0,
    y: 0,
  });

  const updateDragPosition = ({ x, y }: { x: number; y: number }) => {
    packDragPosition.set({ x, y });
  };

  // Get bounds from store.
  const bounds = useOpenPacksStore((state) => state.dropZoneBounds);

  const [loadingMoos, setLoadingMoos, setPoofAnimationPlaying] =
    useOpenPacksStore((state) => [
      state.loadingMoos,
      state.setLoadingMoos,
      state.setPoofAnimationPlaying,
    ]);
  const [openedMoos, setOpenedMoos] = React.useState<MooType[]>([]);

  const [bgAudioMuted] = useStore((state) => [state.bgAudioMuted]);

  const handleCardDrop = async () => {
    const inDropZone =
      packDragPosition.get().x > bounds.left &&
      packDragPosition.get().x < bounds.right &&
      packDragPosition.get().y > bounds.top &&
      packDragPosition.get().y < bounds.bottom;

    // If mouse position of drag interaction is within the bounds of the drop-zone, open the pack.
    if (inDropZone) {
      setPoofAnimationPlaying(false);
      if (!bgAudioMuted) {
        sfxControllerRef_dropInDropZone.current.play();
      }

      const droppedPack = packCollectionArr[0];

      console.log(
        "Packs to display while loading: ",
        packCollectionArr.filter((pack) => pack.id !== droppedPack.id)
      );
      // Optimistically remove pack from UI display
      setPackCollectionArr(
        packCollectionArr.filter((pack) => pack.id !== droppedPack.id)
      );
      setLoadingMoos(true);

      // Open a pack
      const openedPack = await openPack(droppedPack);

      // Handle pack opening failure
      if (openedPack.status !== "SUCCESS") {
        window.alert(
          "There has been a problem opening this pack. Please try again."
        );

        // Reset UI display to reflect moowars data
        setPackCollectionArr(moowars.packCollection.collection);

        setLoadingMoos(false);
        return;
      }

      // Update the opened moos with proper values from server.
      setOpenedMoos(openedPack.moos);

      setPoofAnimationPlaying(true);
      await sleep(2200);

      setLoadingMoos(false);
    }
  };

  // Lottie animation on mount.
  React.useEffect(() => {
    // Init Lottie Animation on mount.
    const lottieAnimation = Lottie.loadAnimation({
      container: document.querySelector("#instructional-lottie"),
      animationData: instructionLottie,
      loop: false,
      renderer: "svg",
    });

    // Loop Lottie every 2 seconds
    lottieAnimation.addEventListener("complete", () => {
      setTimeout(() => lottieAnimation.goToAndPlay(0), 2000);
    });

    // Remove event listener on unmount.
    return lottieAnimation.removeEventListener("complete", () => {
      setTimeout(() => lottieAnimation.goToAndPlay(0), 2000);
    });
  }, []);

  // Unopened packs event emitters/listeners
  React.useEffect(() => {
    setPackCollectionArr(moowars.packCollection.collection);

    moowars.packCollection
      .on("load", (tokens: PackCollectionToken[]) => {
        setPackCollectionArr(tokens);
      })
      .on("unload", () => {
        setPackCollectionArr([]);
      })
      .on("add", (token: PackCollectionToken) => {
        setPackCollectionArr(moowars.packCollection.collection);
      })
      .on("remove", (token: PackCollectionToken) => {
        setPackCollectionArr(moowars.packCollection.collection);
      });
  }, [setPackCollectionArr]);

  return (
    <>
      <Head>
        <title>MooWars - Open Packs</title>
      </Head>

      {/* Audio Controller */}
      <audio ref={sfxControllerRef_dropInDropZone}>
        <source src="/open-packs/OpenPacks_PortalDrop.wav" type="audio/wav" />
      </audio>

      <MainLayout siteTitle="Open Packs" bgColorClass="bg-offwhite">
        <motion.div
          // Reset drag position on mouse click
          onMouseUp={() => {
            handleCardDrop();
            packDragPosition.set({ x: 0, y: 0 });
          }}
          onTouchEnd={() => {
            handleCardDrop();
            packDragPosition.set({ x: 0, y: 0 });
          }}
          className="md:h-[590px] m-auto md:w-full w-screen flex md:flex-row flex-col items-center justify-between overflow-x-hidden md:overflow-x-visible"
        >
          {/* Unopened Packs display */}
          <UnopenedPacksDrawer>
            {packCollectionArr.map((_item, id) => (
              <UnopenedCardPack
                key={_item.id}
                notifyDragPosition={updateDragPosition}
              />
            ))}
          </UnopenedPacksDrawer>

          {/* Instructional Area */}
          <div className="flex flex-col items-center justify-center w-20 h-full">
            {/* Lottie */}
            <div className="w-full h-16 scale-90 md:scale-100 overflow-hidden">
              <div id="instructional-lottie" />
            </div>

            {/* Arrow */}
            {isMobile ? (
              <img
                src="/open-packs/arrow-mobile.svg"
                alt="Open Packs by dragging them below."
                className="object-contain h-[20.06px] w-full"
              />
            ) : (
              <img
                src="/open-packs/arrow.svg"
                alt="Open Packs by dragging them to the right."
                className="object-contain w-[70px]"
              />
            )}
          </div>

          {/* Open Pack Drop Zone */}
          <DropZone loading={loadingMoos} openedMoos={openedMoos} />
        </motion.div>
      </MainLayout>
    </>
  );
}
