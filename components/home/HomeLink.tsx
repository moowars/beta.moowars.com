import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useStore } from "@lib/useStore";
import GeneralHoverClickAudioWrapper from "@components/global/GeneralHoverClickAudioWrapper";

type Props = {
  href: string;
  className?: string;
  img: string;
  row?: boolean;
};

const HomeLink: React.FC<Props> = ({
  href,
  className,
  img,
  children,
  row = false,
}) => {
  return (
    <GeneralHoverClickAudioWrapper>
      <Link href={href} passHref>
        <motion.a
          className={
            className +
            " " +
            "flex items-center justify-center w-full" +
            " " +
            (row ? "flex-row h-[107px] space-x-[20px]" : "flex-col h-full")
          }
          style={{
            background:
              "linear-gradient(180deg, rgba(124, 38, 54, 0.1) 0%, rgba(237, 227, 217, 0.1) 100%)",
            backdropFilter: "blur(3px)",
            borderRadius: "5px",
          }}
          initial={{
            backgroundColor: "rgba(200, 255, 228, 0.0)",
            boxShadow:
              "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 9px 14px -10px rgba(232, 255, 249, 0.25)",
          }}
          whileHover={{
            backgroundColor: "rgba(200, 255, 228, 0.15)",
            boxShadow:
              "0px 4px 4px rgba(0, 0, 0, 0.45), inset 0px 9px 14px -10px rgba(232, 255, 249, 0.25)",
          }}
        >
          <img
            src={img}
            className="object-contain"
            alt={"Image for " + { children } + "link."}
            style={{
              width: row ? 76.94 : "100%",
            }}
          />
          <h3
            className={
              "font-cinder text-[#4E928E] text-center capitalize" +
              " " +
              (row ? "text-4xl" : "")
            }
          >
            {children}
          </h3>
        </motion.a>
      </Link>
    </GeneralHoverClickAudioWrapper>
  );
};

export default HomeLink;
