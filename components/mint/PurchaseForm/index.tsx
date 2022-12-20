import { useMetamask } from "@lib/metamask/useMetamask";
import { motion, Variants } from "framer-motion";
import { PurchaseStatuses } from "pages/mint";
import React from "react";
import Failure from "./Failure";
import Pending from "./Pending";
import Success from "./Success";
import Uninitiated from "./Uninitiated";

type Props = {
  purchaseStatus: PurchaseStatuses;
  setPurchaseStatus: (status: PurchaseStatuses) => void;
};

const PurchaseForm = ({ purchaseStatus, setPurchaseStatus }: Props) => {
  const mint = useMetamask((state) => state.mintPacks);

  const initiatePurchase = async (numToPurchase: number) => {
    setPurchaseStatus(PurchaseStatuses.PENDING);
    const { status } = await mint(numToPurchase);
    if (status === "SUCCESS") {
      setPurchaseStatus(PurchaseStatuses.SUCCESS);
    } else {
      setPurchaseStatus(PurchaseStatuses.FAIL);
    }
  };

  const AnimationVariants: Variants = {
    initial: {
      opacity: 0,
      x: 20,
    },
    show: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -20,
    },
  };

  switch (purchaseStatus) {
    case PurchaseStatuses.UNINITIATED:
      return (
        <motion.div
          variants={AnimationVariants}
          initial={false}
          animate="show"
          exit="exit"
          key={PurchaseStatuses.UNINITIATED}
        >
          <Uninitiated initiatePurchase={initiatePurchase} />
        </motion.div>
      );
    case PurchaseStatuses.PENDING:
      return (
        <motion.div
          variants={AnimationVariants}
          initial="initial"
          animate="show"
          exit="exit"
          key={PurchaseStatuses.PENDING}
        >
          <Pending />
        </motion.div>
      );
    case PurchaseStatuses.SUCCESS:
      return (
        <motion.div
          variants={AnimationVariants}
          initial="initial"
          animate="show"
          exit="exit"
          key={PurchaseStatuses.SUCCESS}
        >
          <Success />
        </motion.div>
      );
    case PurchaseStatuses.FAIL:
      return (
        <motion.div
          variants={AnimationVariants}
          initial="initial"
          animate="show"
          exit="exit"
          key={PurchaseStatuses.FAIL}
        >
          <Failure />
        </motion.div>
      );
  }
};

export default PurchaseForm;
