import Head from "next/head";
import MainLayout from "@layouts/MainLayout";
import HomeLink from "@components/home/HomeLink";
import { MobileContext } from "@lib/MobileCheck";
import React from "react";

export default function Home() {
  const isMobile = React.useContext(MobileContext);

  return (
    <div id="index" className="md:mt-0">
      <Head>
        <title>MooWars</title>
      </Head>

      <MainLayout siteTitle="Home" bgColorClass="bg-offwhite">
        <div className="flex flex-col md:flex-row md:h-[635px] md:space-x-[33px] space-y-[30px] md:space-y-0 my-auto md:px-0 px-6 py-7 max-w-md mx-auto md:max-w-none">
          {/* Left Side */}
          <div className="md:w-[624px] h-[240px] md:h-auto">
            <HomeLink
              href="/battle"
              img="/HomeIllustration-Battle.png"
              className="md:text-[100px] leading-[34px] md:space-y-[44px] md:px-[105px] px-[36px] text-[50px] space-y-1"
            >
              Battle
            </HomeLink>
          </div>

          {/* Right Side */}
          <div className="md:w-[623px] flex flex-col md:space-y-[39px] space-y-[30px]">
            {/* Top */}
            <div className="w-full h-full">
              <HomeLink
                row={isMobile}
                href="/marketplace"
                img="/HomeIllustration-Marketplace.png"
                className="md:text-[50px] md:leading-[60px] md:space-y-[10px] md:px-[230px]"
              >
                Marketplace
              </HomeLink>
            </div>

            {/* Bottom */}
            <div className="w-full h-full flex flex-col md:flex-row md:space-x-[32px] space-y-[30px] md:space-y-0">
              <div className="md:w-[295px] h-full">
                <HomeLink
                  row={isMobile}
                  href="/open-packs"
                  img="/HomeIllustration-OpenPacks.png"
                  className="md:text-[50px] md:leading-[60px] md:space-y-[10px] md:px-[78px] whitespace-nowrap"
                >
                  Open Packs
                </HomeLink>
              </div>
              <div className="md:w-[295px] h-full">
                <HomeLink
                  row={isMobile}
                  href="/mint"
                  img="/HomeIllustration-Mint.png"
                  className="md:text-[50px] md:leading-[60px] md:space-y-[19px] md:px-[73px] whitespace-nowrap md:pt-3"
                >
                  Mint
                </HomeLink>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
