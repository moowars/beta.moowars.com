import React from "react";
import { motion } from "framer-motion";
import { useOpenPacksStore } from "@lib/open-packs/useOpenPacksStore";
import { MobileContext } from "@lib/MobileCheck";
import GeneralHoverClickAudioWrapper from "@components/global/GeneralHoverClickAudioWrapper";

type Props = {
  expandedMooID: string;
};

const ExpandedMoo = (props: Props) => {
  const isMobile = React.useContext(MobileContext);
  const [setExpandedMooID, expandedMooImg, expandedMoo] = useOpenPacksStore(
    (state) => [state.setExpandedMooID, state.expandedMooImg, state.expandedMoo]
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full bg-[#EDE3D9]/95 flex items-center justify-between px-[33px]"
    >
      {/* Close Button */}
      <GeneralHoverClickAudioWrapper className="absolute right-5 top-5 flex items-center justify-center">
        <motion.button
          className="w-[17.74px] aspect-square bg-[#F4F2EA] flex items-center justify-center rounded-full"
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.3,
          }}
          onClick={() => setExpandedMooID(undefined)}
        >
          <svg
            className="absolute aspect-square w-2"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.81885 0.918701L0.918518 6.81897"
              stroke="#102525"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="absolute rotate-90 aspect-square w-2"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.81885 0.918701L0.918518 6.81897"
              stroke="#102525"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </GeneralHoverClickAudioWrapper>

      <motion.div
        layoutId={props.expandedMooID + expandedMooImg}
        className="md:w-[356px] md:h-[356px] w-full px-5 md:px-0"
      >
        <motion.img
          src={expandedMooImg}
          height={356}
          width={356}
          alt="temp-moo.png"
          initial={{ transform: "rotate3d(0, 1, 0, 90deg)" }}
          animate={{
            transform: "rotate3d(0, 1, 0, 0deg)",
          }}
          transition={{
            type: "tween",
          }}
          key={"opened"}
          className="flex flex-col items-center justify-center object-cover aspect-square rounded-[5px]"
        />
      </motion.div>

      {!isMobile && (
        <div className="h-[362.65px] flex flex-col items-start justify-center space-y-[20px] mr-[85px]">
          <h3 className="font-cinder text-[48px] leading-[33.6px] text-[#102525]">
            #{expandedMoo.id}
          </h3>
          <p className="uppercase font-lexend-exa font-semibold text-lg leading-[22.5px] tracking-tighter text-[#102525]">
            Level {expandedMoo.powerLevel ?? "TBD"}
          </p>

          <div className="flex">
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2611 7.93664L15.9998 8.74618L16.7385 7.93664C18.0977 6.44712 20.0005 5.56961 22.0153 5.50261C25.506 5.51098 28.3332 8.34329 28.3332 11.8359C28.3332 14.0878 26.9443 16.6057 25.0077 19.0499C23.4149 21.0602 21.5711 22.8784 20.1157 24.3137C19.8241 24.6013 19.548 24.8735 19.2927 25.1288L16.2527 28.1688L16.2523 28.1693L15.7474 28.1693L15.7469 28.1688L12.7069 25.1288C12.4516 24.8735 12.1756 24.6013 11.8839 24.3137C10.4285 22.8784 8.58475 21.0602 6.99197 19.0499C5.05538 16.6057 3.6665 14.0878 3.6665 11.8359C3.6665 8.34329 6.49366 5.51098 9.98433 5.50261C11.9992 5.56961 13.902 6.44712 15.2611 7.93664Z"
                stroke="#33B174"
                strokeWidth="2"
              />
            </svg>
            <div className="ml-[20px]">
              <p className="uppercase font-lexend-exa text-[10px] text-[#4E928E] font-bold leading-[12.5px] tracking-tighter">
                HEALTH
              </p>
              <p className="uppercase font-lexend-exa text-[18px] text-[#102525] font-bold leading-[22.5px] tracking-tighter">
                {expandedMoo.hitPoints ?? "TBD"}
              </p>
            </div>
          </div>

          <div className="flex">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.1386 13.1911L25.2448 13.3337L13.6898 27.9125C13.6898 27.9125 13.6897 27.9125 13.6896 27.9127C13.6876 27.9149 13.6665 27.9377 13.6114 27.9616C13.555 27.9862 13.4786 28.0046 13.3904 28.0055H13.2566L14.1525 20.0131L14.2771 18.9017H13.1588H7.16016C7.06949 18.9005 6.99192 18.8808 6.93579 18.8554C6.88175 18.831 6.86313 18.8088 6.86305 18.8089L6.74872 18.6553L18.2952 4.08738C18.2952 4.08738 18.2953 4.08733 18.2954 4.08722C18.2973 4.08507 18.3195 4.06101 18.3779 4.03637C18.4379 4.01108 18.5185 3.99308 18.6104 3.99436L18.6104 3.99446H18.6243H18.7611L17.8494 11.985L17.7224 13.0983H18.8429H24.8415C24.9322 13.0995 25.0098 13.1192 25.0659 13.1446C25.121 13.1695 25.1393 13.1921 25.1386 13.1911Z"
                stroke="#33B174"
                strokeWidth="2"
              />
            </svg>

            <div className="ml-[20px]">
              <p className="uppercase font-lexend-exa text-[10px] text-[#4E928E] font-bold leading-[12.5px] tracking-tighter">
                ATTACK
              </p>
              <p className="uppercase font-lexend-exa text-[18px] text-[#102525] font-bold leading-[22.5px] tracking-tighter">
                {expandedMoo.attack}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ExpandedMoo;
