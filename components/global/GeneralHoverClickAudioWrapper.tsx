import { useStore } from "@lib/useStore";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const GeneralHoverClickAudioWrapper = (props: Props) => {
  const audioSFXRef_Hover = React.useRef<HTMLAudioElement>(null!);
  const audioSFXRef_Click = React.useRef<HTMLAudioElement>(null!);

  const [bgAudioMuted] = useStore((state) => [state.bgAudioMuted]);

  return (
    <>
      {/* Audio Controller */}
      <audio ref={audioSFXRef_Hover}>
        <source type="audio/wav" src="/sounds/General_Hover.wav" />
      </audio>
      <audio ref={audioSFXRef_Click}>
        <source type="audio/wav" src="/sounds/General_Click.wav" />
      </audio>

      {/* Component */}
      <div
        className={props.className ?? "w-full h-full relative"}
        onMouseEnter={() => {
          if (!bgAudioMuted) {
            audioSFXRef_Hover.current.currentTime = 0;
            audioSFXRef_Hover.current.play();
          }
        }}
        onMouseDown={() => {
          if (!bgAudioMuted) {
            audioSFXRef_Click.current.currentTime = 0;
            audioSFXRef_Click.current.play();
          }
        }}
        {...props}
      >
        {props.children}
      </div>
    </>
  );
};

export default GeneralHoverClickAudioWrapper;
