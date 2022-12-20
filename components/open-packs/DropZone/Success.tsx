import { MobileContext } from "@lib/MobileCheck";
import { motion } from "framer-motion";
import IndividualMoo from "./IndividualMoo";
import React from "react";
import { MooType } from "types/MooType";

type Props = {
  openedMoos: MooType[];
};

const Success = (props: Props) => {
  const isMobile = React.useContext(MobileContext);

  React.useEffect(() => {
    const images: HTMLImageElement[] = [];

    const preloadImages = async () => {
      for (let i = 0; i < props.openedMoos.length; i++) {
        const newImage = new Image();
        newImage.src = props.openedMoos[i].image();

        images.push(newImage);
      }
    };
    preloadImages();
  }, [props.openedMoos]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-wrap justify-center w-full md:w-[655px]">
        {props.openedMoos.map((moo, id) => {
          const offset = isMobile ? 0 : 30;
          let top = 0;
          if (id > 4 && id % 2) {
            top = -offset;
          } else if (id < 5 && !(id % 2)) {
            top = -offset;
          } else {
            top = offset;
          }

          let marginRight = undefined;
          if (id === 2 && isMobile) {
            marginRight = 63.5 / 2;
          }

          let marginLeft = undefined;
          if (id === 0 && isMobile) {
            marginLeft = 63.5 / 2;
          }

          return (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                bounce: 0.2,
                velocity: 0.8,
                delay: 0.1 * id,
              }}
              style={{
                top,
                marginRight,
                marginLeft,
              }}
              key={id}
              className="m-0.5 md:m-2 relative"
            >
              <IndividualMoo id={id} moo={moo} img={moo.image()} />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Success;
