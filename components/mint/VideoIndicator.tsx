import { AnimatePresence, motion } from "framer-motion";
import { PurchaseStatuses } from "pages/mint";
import React from "react";

type Props = {
  purchaseStatus: PurchaseStatuses;
};

const VideoIndicator = ({ purchaseStatus }: Props) => {
  const getSource = () => {
    switch (purchaseStatus) {
      case PurchaseStatuses.UNINITIATED:
        return "packinfo.webm";
      case PurchaseStatuses.PENDING:
        return "transaction-pending.webm";
      case PurchaseStatuses.SUCCESS:
        return "transaction-complete.webm";
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={purchaseStatus}
        width={800}
        height={800}
        className="w-full h-full"
        controls={false}
        autoPlay={true}
        src={`/mint/animations/${getSource()}`}
        muted
        playsInline
        loop
      />
    </AnimatePresence>
  );
};

export default VideoIndicator;
