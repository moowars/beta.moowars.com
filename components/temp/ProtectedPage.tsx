import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

type Props = {};

interface FormProps {
  password: string;
}

const ProtectedPage: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [wrongPassword, setWrongPassword] = React.useState(false);
  const { register, handleSubmit } = useForm<FormProps>();

  const DialogVariants: Variants = {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };
  const OverlayVariants: Variants = {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };
  const ModalVariants: Variants = {
    hide: {
      opacity: 0,
      scale: 0.7,
    },
    show: {
      opacity: 1,
      scale: 1,
    },
  };

  const handlePasswordSubmit: SubmitHandler<FormProps> = (data) => {
    if (data.password === process.env.NEXT_PUBLIC_PASSWORD) {
      window.localStorage.setItem("MooPass", process.env.NEXT_PUBLIC_PASSWORD);
      setIsOpen(false);
    }
    setWrongPassword(true);
    return;
  };

  React.useEffect(() => {
    if (
      window.localStorage.getItem("MooPass") ===
      process.env.NEXT_PUBLIC_PASSWORD
    ) {
      setIsOpen(false);
    }
  }, []);

  if (!isOpen) return <>{children}</>;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full"
          as={motion.div}
          open={isOpen}
          onClose={() => handleSubmit(handlePasswordSubmit)}
          static
          variants={DialogVariants}
          initial="hide"
          animate="show"
          exit="hide"
          initialFocus={
            register("password").ref as unknown as
              | React.MutableRefObject<HTMLElement | null>
              | undefined
          }
        >
          <Dialog.Overlay
            as={motion.div}
            variants={OverlayVariants}
            className="absolute inset-0 w-full h-full -z-10 bg-black/80"
          />

          <motion.form
            variants={ModalVariants}
            className="flex flex-col items-start max-w-xl p-10 space-y-6 tracking-tighter border-2 border-black rounded bg-offwhite font-lexend-exa"
            onSubmit={handleSubmit(handlePasswordSubmit)}
          >
            <div>
              <Dialog.Title className="text-2xl font-bold">
                Password Needed
              </Dialog.Title>
              <Dialog.Description>
                To access this page, you need a password.
              </Dialog.Description>
            </div>

            <div>
              <input
                type="password"
                id="password-input"
                className="w-full p-2 border-2 rounded border-slate-400"
                placeholder="Enter password..."
                {...register("password")}
              />
              {wrongPassword && (
                <p className="m-1 text-sm text-red-600">
                  Wrong password, please try again.
                </p>
              )}
            </div>

            <div className="flex items-center w-full space-x-4">
              <button
                className="p-2 font-bold transition-all border-2 border-black rounded font-lexend-exa hover:bg-light-green w-28"
                type="submit"
              >
                Submit
              </button>
            </div>
          </motion.form>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProtectedPage;
