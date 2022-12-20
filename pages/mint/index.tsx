import Head from "next/head";
import React from "react";
import { AnimatePresence } from "framer-motion";
import PercentMinted from "@components/mint/PercentMinted";
import PurchaseForm from "@components/mint/PurchaseForm";
import MainLayout from "@layouts/MainLayout";
import VideoIndicator from "@components/mint/VideoIndicator";

export enum PurchaseStatuses {
  UNINITIATED = "UNINITIATED",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

type Props = {};

const MintPage = (props: Props) => {
  const [purchaseStatus, setPurchaseStatus] = React.useState(
    PurchaseStatuses.UNINITIATED
  );

  return (
    <div className="min-h-screen">
      <Head>
        <title>MooWars - Mint</title>
      </Head>

      <MainLayout siteTitle="Minting" bgColorClass="bg-offwhite">
        <div className="flex flex-col items-center justify-between flex-grow w-full px-6 md:px-0">
          {/* Main Content */}
          <div className="flex flex-col-reverse items-center justify-end flex-grow md:justify-between md:flex-row">
            {/* Left Side Content */}
            <div className="text-sm leading-5 tracking-tighter text-center font-lexend-exa md:w-[459px]">
              <AnimatePresence exitBeforeEnter>
                <PurchaseForm
                  purchaseStatus={purchaseStatus}
                  setPurchaseStatus={setPurchaseStatus}
                />
              </AnimatePresence>
            </div>

            {/* Right Side Content */}
            <div className="md:w-[570px] h-[290px] relative md:h-[510px] md:left-28 mt-4">
              <VideoIndicator purchaseStatus={purchaseStatus} />
            </div>
          </div>

          {/* Footer */}
          <PercentMinted />
        </div>
      </MainLayout>
    </div>
  );
};

export default MintPage;
