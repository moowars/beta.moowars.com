import ComingSoonPage from "@components/temp/ComingSoonPage";
import Head from "next/head";
import React from "react";
import MainLayout from "../../layouts/MainLayout";

type Props = {};

const BattlePage = (props: Props) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>MooWars - Battle</title>
      </Head>

      <MainLayout siteTitle="Battle" bgColorClass="bg-offwhite">
        <ComingSoonPage />
      </MainLayout>
    </div>
  );
};

export default BattlePage;
