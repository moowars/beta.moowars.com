import { useMetamask } from "@lib/metamask/useMetamask";
import Link from "next/link";
import React from "react";

type Props = {};

const Success = (props: Props) => {
  const [currentTxURL] = useMetamask((state) => [state.currentTxURL]);

  return (
    <div>
      <h3 className="mt-12 mb-8 text-5xl leading-8 text-center md:mt-0 font-cinder">
        Mint complete!
      </h3>
      <Link href={currentTxURL}>
        <a
          target="_blank"
          className="underline transition-colors text-light-green"
        >
          View your transaction on Block Explorer here
        </a>
      </Link>
    </div>
  );
};

export default Success;
