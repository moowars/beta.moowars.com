import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";
import MintButton from "../MintButton";
import Link from "next/link";
import { useMetamask } from "@lib/metamask/useMetamask";
import GeneralHoverClickAudioWrapper from "@components/global/GeneralHoverClickAudioWrapper";

interface IFormInput {
  amountToPurchase: number;
}

type Props = {
  initiatePurchase: (amount: number) => void;
};

const Uninitiated = (props: Props) => {
  const [loggedIn] = useMetamask((state) => [state.accountId]);
  const BIFI_PRICE = 0.05;

  const { register, handleSubmit, setValue, getValues } = useForm<IFormInput>({
    defaultValues: {
      amountToPurchase: 1,
    },
  });

  const [bifiCost, setBifiCost] = React.useReducer((initialState: number) => {
    const numMoos = getValues("amountToPurchase");
    const newBifiPrice =
      numMoos > 0 ? Number((numMoos * BIFI_PRICE).toFixed(3)) : 0;
    return newBifiPrice;
  }, BIFI_PRICE);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    props.initiatePurchase(data.amountToPurchase);
  };

  const incrementAmount = () => {
    setValue("amountToPurchase", getValues("amountToPurchase") + 1);
    setBifiCost();
  };
  const decrementAmount = () => {
    if (getValues("amountToPurchase") <= 1) {
      setValue("amountToPurchase", 1);
    } else {
      setValue("amountToPurchase", getValues("amountToPurchase") - 1);
      setBifiCost();
    }
  };

  return (
    <>
      <h3 className="font-bold">Mint now, open with the entire community!</h3>
      <p>
        Mint a mystery pack of 10 cards and you’ll be able to open the pack on
        [DATE HERE] along with the entire MooWars and Beefy community!
      </p>
      <AnimatePresence exitBeforeEnter>
        {!loggedIn ? (
          <motion.div
            key={"not-logged-in"}
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-16 mt-6 md:h-20 md:mt-10"
          >
            <MintButton />

            <Link href="/mint/how-it-works">
              <a className="text-sm leading-5 tracking-tighter underline text-light-green font-lexend-exa">
                How does minting work?
              </a>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="logged-in"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 md:h-20 md:mt-10"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center mb-5 space-y-8 md:space-y-0 md:flex-row"
            >
              <div className="flex items-center justify-center">
                <button
                  className="p-1 m-1 text-2xl font-bold leading-3 text-center align-middle transition-colors rounded-sm font-cinder hover:bg-black/20"
                  type="button"
                  onClick={decrementAmount}
                >
                  <GeneralHoverClickAudioWrapper>
                    -
                  </GeneralHoverClickAudioWrapper>
                </button>
                <div
                  className={
                    "px-1 rounded-sm bg-offwhite focus-within:outline focus-within:outline-2 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-1 focus-within:outline-blue-500 relative"
                  }
                >
                  <input
                    className="md:w-16 w-20 text-4xl md:text-5xl text-center bg-transparent font-cinder leading-[33.6px] focus:border-none focus:ring-0 focus:outline-none"
                    style={{}}
                    {...register("amountToPurchase", {
                      min: 1,
                      max: 999,
                      valueAsNumber: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
                      onChange: (e) => {
                        let newValue: string = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );

                        setValue(
                          "amountToPurchase",
                          Number(newValue.substring(0, 3))
                        );
                        setBifiCost();
                      },
                      onBlur: (e) => {
                        if (e.target.value < 1) {
                          setValue("amountToPurchase", 1);
                        } else {
                          setValue(
                            "amountToPurchase",
                            Math.floor(e.target.value)
                          );
                        }
                        setBifiCost();
                      },
                    })}
                  />
                  <p className="uppercase font-lexend-exa text-[9px] leading-[11.25px] tracking-tighter font-bold pb-2">
                    packs
                  </p>
                  <p className="absolute uppercase -bottom-5 w-full whitespace-nowrap text-[12px] font-lexend-exa text-[#4E928E] inset-x-0">
                    {bifiCost} BIFI
                  </p>
                </div>
                <button
                  className="p-1 m-1 text-2xl font-bold leading-3 text-center align-middle transition-colors rounded-sm font-cinder hover:bg-black/20"
                  type="button"
                  onClick={incrementAmount}
                >
                  <GeneralHoverClickAudioWrapper>
                    +
                  </GeneralHoverClickAudioWrapper>
                </button>
              </div>

              <Button
                key={"purchase-button"}
                className="w-[296px] h-14 font-medium font-lexend-exa tracking-tighter leading-4 ml-6"
                type="submit"
              >
                <img
                  src="/mint/bag-icon.svg"
                  alt="Bag Icon"
                  className="w-5 h-5 mr-2 aspect-square"
                />
                Mint
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Uninitiated;
