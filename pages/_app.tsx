import "../styles/globals.css";
import type { AppProps } from "next/app";
import MobileCheckContext from "../lib/MobileCheck";
import React from "react";
import ProtectedPage from "@components/temp/ProtectedPage";
import { QueryClient, QueryClientProvider } from "react-query";
import AudioController from "@components/global/AudioController";
import MetamaskLoginDialog from "@components/global/MetamaskLoginDialog";
import { useMetamask } from "@lib/metamask/useMetamask";
import { moowars } from "@utils/moowars";

const NoSSR = ({ children }: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const setMetamaskId = useMetamask((state) => state.setAccountId);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // MooWars event listeners
    moowars
      .on("connected", () => console.log("connected"))
      .on("disconnected", () => console.log("disconnected"))
      .on("account", (account: string) => {
        if (account === null) {
          setMetamaskId(null);
        } else {
          setMetamaskId(account);
        }
      });
  });

  return (
    // Disable SSR
    <NoSSR>
      
        {/* Enables react-query hooks */}
        <QueryClientProvider client={queryClient}>
          {/* Provide isMobile boolean to tsx components */}
          <MobileCheckContext>
            {/* Main Component */}
            <Component {...pageProps} />

            {/* Login Prompt */}
            <MetamaskLoginDialog />

            {/* Audio Controller */}
            <AudioController />
          </MobileCheckContext>
        </QueryClientProvider>
      
    </NoSSR>
  );
}

export default MyApp;
