import React from "react";
import { HTMLMotionProps, motion, MotionProps } from "framer-motion";
import GeneralHoverClickAudioWrapper from "@components/global/GeneralHoverClickAudioWrapper";

type Props = {};

const Button: React.FC<Props & HTMLMotionProps<"button">> = ({
  children,
  ...props
}) => {
  return (
    <motion.button
      {...props}
      className={`text-offwhite ${props.className} relative`}
      initial={false}
      animate={{
        background:
          "linear-gradient(0deg, rgba(16, 37, 37, 0.2), rgba(16, 37, 37, 0.2)), linear-gradient(180deg, #246864 0%, #215653 53.65%)",
      }}
      whileHover={{
        background:
          "linear-gradient(0deg, rgba(78, 146, 142, 0.2), rgba(78, 146, 142, 0.2)), linear-gradient(180deg, #246864 0%, #215653 53.65%)",
      }}
      whileTap={{
        background:
          "linear-gradient(0deg, rgba(16, 37, 37, 0.2), rgba(16, 37, 37, 0.2)), linear-gradient(180deg, #246864 0%, #215653 53.65%)",
      }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
      style={{
        boxShadow: "0px 2px 3px rgba(16, 37, 37, 0.3)",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GeneralHoverClickAudioWrapper className="absolute inset-0" />
      {children}
    </motion.button>
  );
};

export default Button;
