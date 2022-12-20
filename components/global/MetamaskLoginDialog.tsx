import MetamaskLoginPrompt from "@components/mint/MetamaskLoginPrompt";
import { Dialog } from "@headlessui/react";
import { useMetamask } from "@lib/metamask/useMetamask";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";

type Props = {};

const MetamaskLoginDialog = (props: Props) => {
  const [isOpen, setIsOpen] = useMetamask((state) => [
    state.loginPromptOpen,
    state.setLoginPromptOpen,
  ]);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const OverlayVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const DialogVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <motion.div
              variants={OverlayVariants}
              className="fixed inset-0 bg-black/40"
              initial="hidden"
              animate="show"
              exit="hidden"
            />

            <Dialog.Panel
              as={motion.div}
              variants={DialogVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={
                "fixed m-auto inset-0 md:w-[484px] w-[95%] h-[219px] flex flex-col items-center justify-center text-xs font-lexend-exa tracking-tighter leading-[13.75px] text-offwhite"
              }
              style={{
                background: "linear-gradient(180deg, #215653 0%, #102525 100%)",
                boxShadow: "0px 0px 10px rgba(18, 28, 26, 0.8)",
                borderRadius: "5px",
              }}
            >
              {/* Exit Button */}
              <button
                onClick={closeDialog}
                className="absolute top-[6px] right-[6.5px] text-offwhite p-1"
              >
                <img
                  src="/mint/exit-icon.svg"
                  alt="Close Button"
                  className="object-contain"
                />
              </button>

              {/* Main Content */}
              <MetamaskLoginPrompt closeDialog={closeDialog} />
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default MetamaskLoginDialog;
