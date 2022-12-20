import { Popover } from "@headlessui/react";
import { MobileContext } from "@lib/MobileCheck";
import Link from "next/link";
import React from "react";
import NavButton from "./NavButton";
import { AnimatePresence, motion } from "framer-motion";
import { useMetamask } from "@lib/metamask/useMetamask";
import { useQuery } from "react-query";
import GeneralHoverClickAudioWrapper from "../GeneralHoverClickAudioWrapper";

type Props = {};

const NotificationButton = (props: Props) => {
  const isMobile = React.useContext(MobileContext);
  const loadNotifications = useMetamask((state) => state.loadNotifications);

  const notifications = useQuery("notifications", async () => {
    const { notifications } = await loadNotifications();

    return notifications;
  });

  const [open, setOpen] = React.useState(false);

  return (
    <Popover className="relative flex flex-col items-center">
      <NavButton
        onClick={() => {
          if (!open) notifications.refetch();
          setOpen(!open);
        }}
        mobile={isMobile}
        className="md:p-[10px] md:h-[38px] md:w-[38px]"
      >
        <GeneralHoverClickAudioWrapper className="absolute inset-0" />
        {isMobile ? (
          <motion.svg
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[21px] h-21px]"
            initial={{
              color: "#215653",
            }}
            animate={{
              color: open ? "#33B174" : "#215653",
              transition: {
                duration: 0.4,
              },
            }}
          >
            <path
              d="M10.1568 20.6291C8.5943 20.6291 7.24013 19.6561 6.71929 18.1426C6.61513 17.9264 6.7193 17.8183 6.82346 17.6021C6.92763 17.494 7.03179 17.3859 7.24013 17.3859H13.0735C13.2818 17.3859 13.386 17.494 13.4901 17.6021C13.5943 17.7102 13.5943 17.9264 13.5943 18.1426C13.0735 19.6561 11.7193 20.6291 10.1568 20.6291Z"
              fill="currentColor"
            />
            <path
              d="M17.9693 18.467H2.34432C2.13599 18.467 1.92765 18.3589 1.82349 18.1427C1.82349 17.9264 1.82349 17.7102 1.92765 17.6021L3.07349 16.0886C3.59432 15.44 3.90682 14.5751 3.90682 13.7102V9.81834C3.90682 6.25077 6.71932 3.33185 10.1568 3.33185C13.5943 3.33185 16.4068 6.25077 16.4068 9.81834V13.7102C16.4068 14.5751 16.7193 15.44 17.2402 16.0886L18.386 17.6021C18.4902 17.8183 18.4902 18.0346 18.4902 18.1427C18.386 18.3589 18.1777 18.467 17.9693 18.467Z"
              fill="currentColor"
            />
            <ellipse
              cx="9.76583"
              cy="2.22799"
              rx="1.48568"
              ry="1.54189"
              fill="currentColor"
            />
          </motion.svg>
        ) : (
          <motion.svg
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[18px] h-[18px]`}
            initial={{
              color: "#EDE3D9",
            }}
            animate={{
              color: open ? "#33B174" : "#EDE3D9",
              transition: {
                duration: 0.4,
              },
            }}
          >
            <path
              d="M8.49998 17.375C7.41703 17.375 6.46956 16.7355 6.05235 15.7061H10.9476C10.5304 16.7355 9.58293 17.375 8.49998 17.375Z"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <path
              d="M15.2385 15.4291H1.76154L2.61817 14.2976C3.17175 13.6046 3.5 12.6916 3.5 11.773V8.27027C3.5 5.38256 5.7731 3.05743 8.5 3.05743C11.2269 3.05743 13.5 5.38256 13.5 8.27027V11.773C13.5 12.6916 13.8283 13.6046 14.3818 14.2976L15.2385 15.4291Z"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <path
              d="M8.86026 1.43897C8.86026 1.88228 8.51976 2.20168 8.14815 2.20168C7.77653 2.20168 7.43604 1.88228 7.43604 1.43897C7.43604 0.995662 7.77653 0.67627 8.14815 0.67627C8.51976 0.67627 8.86026 0.995662 8.86026 1.43897Z"
              stroke="currentColor"
              strokeWidth="1.25"
            />
          </motion.svg>
        )}
      </NavButton>
      <AnimatePresence>
        {open && (
          <>
            {/* Uncomment for an overlay that closes the popover but blocks other page interaction. */}
            {/* <Popover.Overlay
              static
              as={motion.div}
              className="fixed inset-0"
              onClick={() => setOpen(false)}
            /> */}
            <Popover.Panel
              as={motion.div}
              key={"notification-panel"}
              static
              className="absolute z-10 flex flex-col items-center mt-5 md:mt-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{
                duration: 0.4,
              }}
            >
              {/* Popover Arrow */}
              <div className="border-b-[#215653] h-0 w-0 border-b-[21.04px] border-x-[21.04px] border-x-transparent border-b-solid mt-2"></div>

              {/* Popover Box */}
              <div className="bg-[#215653] relative rounded-sm p-2.5 -ml-20">
                <ul className="w-[270.83px] divide-y-[2px] divide-[#4E928E]">
                  {!notifications.data && !notifications.error ? (
                    <div className="font-lexend-exa uppercase text-[11px] leading-[13.75px] tracking-tighter text-white">
                      Loading...
                    </div>
                  ) : (
                    notifications.data.map((notification, id) => {
                      return (
                        <li key={id}>
                          <GeneralHoverClickAudioWrapper>
                            <Link href={notification.url}>
                              <a className="font-lexend-exa flex items-start justify-between py-[5px] group">
                                <span className="uppercase text-[11px] leading-[13.75px] tracking-tighter text-white max-w-[217.31px] group-hover:underline">
                                  {notification.message}
                                </span>
                                <span className="text-[#4E928E] font-medium leading[15px] tracking-tighter text-xs group-hover:text-[#33B174]">
                                  {notification.time}
                                </span>
                              </a>
                            </Link>
                          </GeneralHoverClickAudioWrapper>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </Popover.Panel>
          </>
        )}
      </AnimatePresence>
    </Popover>
  );
};

export default NotificationButton;
