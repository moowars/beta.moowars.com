import create from "zustand";

type StoreProps = {
  accountPowerAnimated: boolean;
  setAccountPowerAnimated: () => void;
  currentPageTitle: string | undefined;
  setCurrentPageTitle: (newTitle: string) => void;
  currentBgColor: string;
  setCurrentBgColor: (newColor: string) => void;
  bgAudioMuted: boolean;
  setBgAudioMuted: (muted: boolean) => void;
  sfxSource: string;
  setSFXSource: (source: string) => void;
};

export const useStore = create<StoreProps>((set) => ({
  accountPowerAnimated: false,
  setAccountPowerAnimated: () => set({ accountPowerAnimated: true }),
  currentPageTitle: undefined,
  setCurrentPageTitle: (newTitle: string) =>
    set({ currentPageTitle: newTitle }),
  currentBgColor: "bg-offwhite",
  setCurrentBgColor: (newColor: string) => set({ currentBgColor: newColor }),
  bgAudioMuted: true,
  setBgAudioMuted: (muted: boolean) => set({ bgAudioMuted: muted }),
  sfxSource: "",
  setSFXSource: (source: string) => set({ sfxSource: source }),
}));
