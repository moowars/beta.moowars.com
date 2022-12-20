import { Dialog } from "@headlessui/react";
import { useMetamask } from "@lib/metamask/useMetamask";
import { useStore } from "@lib/useStore";
import { animate, AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import NavButton from "./NavButton";
import NavLink from "./NavLink";

type Props = {};

const MobileNavDrawer = ({}: Props) => {
  const accountPowerAnimated = useStore((state) => state.accountPowerAnimated);
  const accountPower = useMetamask((state) => state.accountPower);

  const [open, setOpen] = React.useState(false);

  const numberAnimationRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (accountPowerAnimated) return;

    const controls = animate(0, accountPower, {
      delay: 0.8,
      duration: 1.6,
      type: "tween",
      ease: "easeInOut",
      onUpdate: (value) => {
        // Prevents Client-Side error on changing pages if animation has not finished.
        if (numberAnimationRef.current === null) return;

        numberAnimationRef.current.textContent =
          Math.round(value).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [accountPower, accountPowerAnimated]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-[24.45px] h-5 text-dark-green"
      >
        <img
          className="object-contain"
          src="/navbar/nav_drawer_button.svg"
          alt="nav-button"
        />
      </button>

      <AnimatePresence>
        {open && (
          <Dialog
            static
            as={motion.div}
            open={open}
            onClose={() => setOpen(false)}
            className="fixed inset-0 z-40 flex flex-col items-center justify-start"
            initial={{
              opacity: 0,
              background:
                "linear-gradient(180deg, #EDE3D9 99.99%, rgba(237, 227, 217, 0) 100%)",
            }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {/* Header */}
            <div
              className="flex w-full flex-col items-center justify-center md:justify-start mx-auto md:max-w-7xl h-[116.62px] md:h-auto px-[24px] md:px-0 z-50 md:static"
              style={{
                background:
                  "linear-gradient(180deg, #EDE3D9 99.99%, rgba(237, 227, 217, 0) 100%)",
              }}
            >
              <div className="flex items-start justify-between w-full">
                {/* Logo & Title Section */}
                <div>
                  <img
                    src="/moowars_logo.svg"
                    alt="MooWars logo"
                    className="object-contain object-left w-[141.64px] md:w-full md:h-12 md:min-w-[263px]"
                  />
                  <div className="h-6 font-medium uppercase md:leading-7 md:text-2xl font-lexend-exa text-green"></div>
                </div>

                {/* Herd Power, Notifications, & Profile Section */}
                <div className="md:min-w-[428px] flex justify-between md:items-center items-start mt-0.5 md:h-11 space-x-4 md:space-x-0">
                  {/* Notifications Button */}
                  <NavButton mobile className="md:p-[10px]">
                    <img
                      src={"/navbar/notification_button-mobile.svg"}
                      alt="Bell"
                      className="w-full h-full"
                    />
                  </NavButton>

                  {/* Profile Button */}
                  <NavButton
                    mobile
                    className="md:p-[10px] md:flex md:items-center md:justify-center md:space-x-2 md:px-[28px] md:h-[38px]"
                  >
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-green"
                    >
                      <path
                        d="M14.4956 11.0162C15.614 9.91576 16.307 8.38862 16.307 6.70058C16.307 3.34742 13.5728 0.62915 10.2 0.62915C6.82725 0.62915 4.09309 3.34742 4.09309 6.70058C4.09309 8.38863 4.78602 9.91579 5.90452 11.0162C3.01772 12.3542 0.867076 14.9989 0.222075 18.1854C0.0776084 18.8991 0.664561 19.518 1.39683 19.518H19.0033C19.7356 19.518 20.3225 18.8991 20.1781 18.1854C19.5331 14.9989 17.3824 12.3541 14.4956 11.0162Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="hidden text-sm tracking-tighter text-offwhite font-lexend-exa md:inline-block">
                      Profile
                    </p>
                  </NavButton>

                  <button
                    onClick={() => setOpen(false)}
                    className="w-[24.45px] h-5 text-dark-green"
                  >
                    <img
                      className="object-contain mx-auto"
                      src="/navbar/mobile-nav-close.svg"
                      alt="nav-button"
                    />
                  </button>
                </div>
              </div>

              {/* Bottom border component placeholder for formatting */}
              <div className="items-center justify-center w-full md:w-[1280px] mx-auto pt-2 flex">
                <div className="h-[4px] w-full" />
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex flex-col items-center justify-between flex-grow">
              {/* Nav Links */}
              <div className="flex flex-col items-center justify-center">
                <ul className="flex flex-col items-center justify-around w-full h-full px-2 space-y-12">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/battle">Battle</NavLink>
                  <NavLink href="/marketplace">Marketplace</NavLink>
                  <NavLink href="/open-packs">Open Packs</NavLink>
                  <NavLink href="/mint">Mint</NavLink>
                </ul>
              </div>

              {/* Power, Info Links, and Bottom Border */}
              <div className="w-full my-6 space-y-2">
                {/* Power */}
                <div className="justify-self-end relative w-[288.61px] flex items-center justify-center">
                  {/* Border */}
                  <img
                    src="/navbar/herd-power-border-mobile.svg"
                    alt="herd power border"
                    className="absolute inset-0 object-contain w-full h-full -z-10"
                  />

                  {/* Text */}
                  <div className="flex items-center justify-center w-full p-3 space-x-3">
                    <p className="text-[10px] font-medium tracking-tighter uppercase font-lexend-exa text-[#4E928E]">
                      My Herd Power
                    </p>
                    <p className="text-3xl uppercase font-cinder text-light-green">
                      <motion.span ref={numberAnimationRef}>
                        {accountPowerAnimated
                          ? accountPower.toLocaleString()
                          : 0}
                      </motion.span>
                    </p>
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center justify-between">
                  <Link href="https://www.moowars.com/">
                    <a className="flex text-xs tracking-tighter uppercase text-light-green">
                      About Moo Wars
                      <img
                        src="/navbar/mobile-info-link-arrow.svg"
                        alt="link arrow"
                        className="object-contain ml-1.5"
                      />
                    </a>
                  </Link>

                  <Link href="https://www.moowars.com/#how-to-play">
                    <a className="flex text-xs tracking-tighter uppercase text-light-green">
                      How to Battle
                      <img
                        src="/navbar/mobile-info-link-arrow.svg"
                        alt="link arrow"
                        className="object-contain ml-1.5"
                      />
                    </a>
                  </Link>
                </div>

                {/* Bottom Border */}
                <div className="items-center justify-center w-full md:w-[1280px] mx-auto pt-2 flex">
                  <div className="border-y-[1px] border-y-maroon h-[4px] w-full" />
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavDrawer;
