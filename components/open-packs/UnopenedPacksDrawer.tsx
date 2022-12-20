import React from "react";

type Props = {};

const UnopenedPacksDrawer: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center w-screen md:w-[296px] relative">
      {/* Title */}
      <h2 className="md:mb-0.5 my-[10px] text-[24px] leading-[23.6px] md:text-3xl text-center capitalize font-cinder">
        Unopened Packs
      </h2>

      <div className="md:w-full md:h-full w-[310.19px] h-[162px] relative">
        {/* Pack Drawer */}
        <div
          className="absolute inset-x-0 h-full md:w-[296px] md:h-[590px] py-6 rounded-md backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(180deg, rgba(124, 38, 54, 0.1) 0%, rgba(237, 227, 217, 0.1) 100%)",
            boxShadow:
              "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 9px 14px -10px rgba(232, 255, 249, 0.25)",
          }}
        ></div>
        <div className="absolute inset-x-4 md:inset-x-0 flex md:flex-col items-center justify-start w-full h-full md:w-[296px] md:h-[590px] py-6 rounded-md overflow-y-hidden overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UnopenedPacksDrawer;
