import Button from "@components/mint/Button";
import React from "react";

type Props = {
  mobile?: boolean;
  className?: string;
  onClick?: () => void;
};

const NavButton: React.FC<Props> = ({ mobile = false, children, ...props }) => {
  return mobile ? (
    // Mobile Nav Button
    <div
      className={`text-dark-green h-5 w-5 aspect-square ${props.className}`}
      {...props}
    >
      {children}
    </div>
  ) : (
    // Desktop Nav Button
    <Button {...props}>{children}</Button>
  );
};

export default NavButton;
