import Link from "next/link";
import React from "react";
// import { moowars } from "@utils/moowars";
import { useMetamask } from "@lib/metamask/useMetamask";

type Props = {};

const Pending = (props: Props) => {
  const currentTxURL = useMetamask((state) => state.currentTxURL);

  return (
    <div className="mt-12 text-sm leading-5 tracking-tighter text-center md:mt-0 font-lexend-exa">
      <p className="font-bold">Transaction pending...</p>
      <p className="mb-4">
        Your mint is in process on the blockchain! This may take a few minutes.
      </p>
      {currentTxURL && (
        <Link href={currentTxURL}>
          <a
            target="_blank"
            className="underline transition-colors text-light-green"
          >
            View your transaction on Block Explorer here
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pending;
