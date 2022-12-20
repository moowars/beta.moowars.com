import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useMetamask } from "@lib/metamask/useMetamask";
import GeneralHoverClickAudioWrapper from "@components/global/GeneralHoverClickAudioWrapper";

type Props = {
  closeDialog: () => void;
};

const MetamaskLoginPrompt = (props: Props) => {
  const [connectAccount] = useMetamask((state) => [state.connectAccount]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { status: connectionStatus } = await connectAccount();
    if (connectionStatus === "SUCCESS") {
      setLoading(false);
      props.closeDialog();
    } else {
      setError(true);
    }
  };

  return (
    <motion.div className="flex flex-col items-center space-y-7 justify-items-center">
      <AnimatePresence initial={false}>
        {!error && (
          <Dialog.Title
            as={motion.h3}
            key={"confirmation-title"}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={"font-bold"}
          >
            Click the Metamask logo to confirm connection
          </Dialog.Title>
        )}

        <motion.button
          layout
          key={"login-button"}
          onClick={handleClick}
          className="bg-offwhite rounded-[10px] group w-[76px] relative aspect-square overflow-hidden disabled:cursor-not-allowed"
          disabled={loading}
        >
          {!loading && (
            <GeneralHoverClickAudioWrapper className="absolute inset-0" />
          )}
          <img
            src="/metamask-logo.png"
            alt="Metamask link button"
            className={`aspect-square object-contain w-[76px] ${
              !loading ? "group-hover:scale-105 group-active:scale-100" : ""
            } transition-transform`}
          />
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 w-full h-full bg-black/50"
            >
              {/* Loading Spinner */}
              {error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center w-full h-full"
                  key={"question-mark"}
                >
                  <img
                    src="/mint/login-error.svg"
                    alt="Login Error"
                    className="object-contain w-[23.09px] h-[32.49px]"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={"loading-spinner"}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 0,
                    duration: 1,
                    repeatType: "loop",
                    type: "tween",
                    ease: "linear",
                  }}
                  className="w-full h-full text-offwhite"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                        clipRule="evenodd"
                        opacity=".2"
                      />
                      <path d="M12 22c5.523 0 10-4.477 10-10h-3a7 7 0 0 1-7 7v3ZM2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
                    </g>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.button>
        <AnimatePresence exitBeforeEnter>
          {!error ? (
            <motion.p
              key={"new-to-metamask"}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              New to Metamask?{" "}
              <Link href="https://levelup.gitconnected.com/how-to-use-metamask-a-step-by-step-guide-f380a3943fb1">
                <a target={"_blank"} className="text-[#4E928E] hover:underline">
                  Learn how to set yours up here
                </a>
              </Link>
            </motion.p>
          ) : (
            <motion.p
              key={"metamask-not-installed"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-center w-[339px]"
            >
              Metamask doesn’t not appear to be installed on this browser,
              please install to continue.
            </motion.p>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </motion.div>
  );
};

export default MetamaskLoginPrompt;
