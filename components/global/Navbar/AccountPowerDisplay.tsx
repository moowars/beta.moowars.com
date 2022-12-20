import React from "react";
import { useStore } from "@lib/useStore";
import { useMetamask } from "@lib/metamask/useMetamask";
import { animate, motion, useSpring } from "framer-motion";
import { moowars } from "@utils/moowars";

type Props = {};

const AccountPowerDisplay = (props: Props) => {
  const [accountPowerAnimated, setAccountPowerAnimated] = useStore((state) => [
    state.accountPowerAnimated,
    state.setAccountPowerAnimated,
  ]);
  const [accountPower, loadAccountPower, loggedIn] = useMetamask((state) => [
    state.accountPower,
    state.loadAccountPower,
    state.accountId,
  ]);

  const numberAnimationRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    loadAccountPower();

    moowars.on("heardPower", () => {
      loadAccountPower();
    });

    if (accountPowerAnimated || accountPower === 0) return;

    const controls = animate(
      accountPowerAnimated ? accountPower : 0,
      accountPower,
      {
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
        onComplete: () => {
          if (loggedIn) {
            // console.log("completed");
            setAccountPowerAnimated();
          }
        },
      }
    );
    return () => controls.stop();
  }, [
    accountPower,
    loadAccountPower,
    accountPowerAnimated,
    loggedIn,
    setAccountPowerAnimated,
  ]);

  return (
    <div className="relative w-[200px] md:flex items-center justify-center hidden">
      {/* Border */}
      <img
        src="/herd_power_border.svg"
        alt="herd power border"
        className="absolute inset-0 object-contain w-full h-full -z-10"
      />

      {/* Text */}
      <div className="flex items-center justify-between w-full p-3">
        <p className="text-[10px] font-medium tracking-tighter uppercase font-lexend-exa text-green">
          My Herd Power
        </p>
        <p className="text-3xl uppercase font-cinder text-light-green">
          <motion.span ref={numberAnimationRef}>
            {accountPowerAnimated ? accountPower.toLocaleString() : 0}
          </motion.span>
        </p>
      </div>
    </div>
  );
};

export default AccountPowerDisplay;
