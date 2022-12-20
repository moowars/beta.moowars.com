import React from "react";
import NavLink from "./NavLink";
import { motion } from "framer-motion";
import NavButton from "./NavButton";
import { MobileContext } from "@lib/MobileCheck";
import MobileNavDrawer from "./MobileNavDrawer";
import NotificationButton from "./NotificationButton";
import AccountPowerDisplay from "./AccountPowerDisplay";
import { useMetamask } from "@lib/metamask/useMetamask";
import { useRouter } from "next/router";
import GeneralHoverClickAudioWrapper from "../GeneralHoverClickAudioWrapper";

type Props = {
  siteTitle: string;
};

const Navbar = (props: Props) => {
  const isMobile = React.useContext(MobileContext);
  const [isSignedIn, setSignInPromptOpen] = useMetamask((state) => [
    state.accountId !== null,
    state.setLoginPromptOpen,
  ]);
  const router = useRouter();

  return (
    <div
      className="flex w-full flex-col items-center justify-center md:justify-start mx-auto md:max-w-7xl h-[116.62px] md:h-auto px-[24px] md:px-0 z-50 md:static"
      style={{
        background: isMobile
          ? "linear-gradient(180deg, #EDE3D9 99.99%, rgba(237, 227, 217, 0) 100%)"
          : "",
      }}
    >
      <div className="flex items-start justify-between w-full md:w-auto md:px-20 md:pt-10 md:space-x-16">
        {/* Logo & Title Section */}
        <div>
          <img
            src="/moowars_logo.svg"
            alt="MooWars logo"
            className="object-contain object-left w-[141.64px] md:w-full md:h-12 md:min-w-[263px]"
          />
          <motion.h1
            // layoutId="nav-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-medium uppercase md:leading-7 md:text-2xl font-lexend-exa text-green"
          >
            {props.siteTitle}
          </motion.h1>
        </div>

        {/* Link List */}
        <div className="relative z-0 h-12 min-w-[459.33px] hidden md:flex">
          <img
            src="/navbar/nav_links_border.svg"
            alt="Nav Links Border"
            className="absolute inset-0 w-full h-full -z-10"
          />

          <ul className="flex items-center justify-around w-full h-full px-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/battle">Battle</NavLink>
            <NavLink href="/marketplace">Marketplace</NavLink>
            <NavLink href="/open-packs">Open Packs</NavLink>
            <NavLink href="/mint">Mint</NavLink>
          </ul>
        </div>

        {/* Herd Power, Notifications, & Profile Section */}
        <div className="md:min-w-[428px] flex justify-between md:items-center items-start mt-0.5 md:h-11 space-x-4 md:space-x-0">
          {/* Power */}
          <AccountPowerDisplay />

          {/* Notifications Button */}
          <NotificationButton />

          {/* Profile Button */}
          <NavButton
            onClick={() => {
              if (isSignedIn) {
                router.push("/profile");
              } else {
                setSignInPromptOpen(true);
              }
            }}
            mobile={isMobile}
            className="md:p-[10px] md:flex md:items-center md:justify-center md:space-x-2 md:px-[28px] relative"
          >
            <GeneralHoverClickAudioWrapper className="absolute inset-0" />
            {isMobile ? (
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green"
              >
                <path
                  d="M14.4956 11.0162C15.614 9.91576 16.307 8.38862 16.307 6.70058C16.307 3.34742 13.5728 0.62915 10.2 0.62915C6.82725 0.62915 4.09309 3.34742 4.09309 6.70058C4.09309 8.38863 4.78602 9.91579 5.90452 11.0162C3.01772 12.3542 0.867076 14.9989 0.222075 18.1854C0.0776084 18.8991 0.664561 19.518 1.39683 19.518H19.0033C19.7356 19.518 20.3225 18.8991 20.1781 18.1854C19.5331 14.9989 17.3824 12.3541 14.4956 11.0162Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-offwhite"
              >
                <path
                  d="M12.4276 8.90282L11.7842 9.53586L12.6031 9.9154C15.0254 11.038 16.8276 13.2566 17.3676 15.9246C17.4068 16.1182 17.2524 16.375 16.9229 16.375H1.07708C0.747586 16.375 0.5932 16.1182 0.632378 15.9246C1.17243 13.2566 2.97457 11.0381 5.39681 9.91543L6.21575 9.53588L5.57233 8.90285C4.67979 8.02471 4.12871 6.8087 4.12871 5.46429C4.12871 2.79505 6.3062 0.625 8.99996 0.625C11.6937 0.625 13.8712 2.79505 13.8712 5.46429C13.8712 6.80869 13.3201 8.02469 12.4276 8.90282Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
              </svg>
            )}
            <p className="hidden text-sm tracking-tighter text-offwhite font-lexend-exa md:inline-block">
              Profile
            </p>
          </NavButton>

          {isMobile && <MobileNavDrawer />}
        </div>
      </div>

      {/* Bottom border component */}
      <div className="items-center justify-center w-full md:w-[1280px] mx-auto pt-2 flex">
        <div className="border-y-[1px] border-y-maroon h-[4px] w-full" />
      </div>
    </div>
  );
};

export default Navbar;
