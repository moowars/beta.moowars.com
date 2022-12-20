import ComingSoonPage from "@components/temp/ComingSoonPage";
import Head from "next/head";
import React from "react";
import MainLayout from "../../layouts/MainLayout";

type Props = {};

const MarketplacePage = (props: Props) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>MooWars - Marketplace</title>
      </Head>

      <MainLayout siteTitle="Marketplace" bgColorClass="bg-offwhite">
        <ComingSoonPage />
      </MainLayout>
    </div>
  );
};

export default MarketplacePage;
