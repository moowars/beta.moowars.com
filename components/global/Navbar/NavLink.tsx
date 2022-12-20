import Link, { LinkProps } from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import GeneralHoverClickAudioWrapper from "../GeneralHoverClickAudioWrapper";

type Props = {};

const NavLink: React.FC<Props & LinkProps> = ({ href, children, ...props }) => {
  const router = useRouter();
  const active =
    (router.pathname.includes(href.toString().substring(1)) && href !== "/") ||
    (href.toString().substring(1) === "" && router.pathname === "/");

  return (
    <GeneralHoverClickAudioWrapper className="relative flex flex-col items-center justify-center font-bold md:font-normal">
      <Link href={href}>
        <a
          className={`text-[22px] md:text-sm tracking-tighter uppercase md:capitalize font-lexend-exa mx-2 md:mx-0 transition-colors hover:text-light-green ${
            active ? "text-light-green font-bold" : ""
          }`}
        >
          {children}
        </a>
      </Link>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute w-[7.24px] md:w-1 rounded-full -bottom-2 md:-bottom-1 bg-light-green aspect-square"
        />
      )}
    </GeneralHoverClickAudioWrapper>
  );
};

export default NavLink;
