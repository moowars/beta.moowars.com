import { moowars } from "@utils/moowars";
import { MooType } from "types/MooType";
import { PackCollectionToken } from "types/PackCollectionToken";
import create from "zustand";
import connect from "./connect";
import loadAccountPower from "./getAccountPower";
import loadNotifications from "./loadNotifications";
import mint from "./mint";
import openPack from "./openPack";

// METAMASK GLOBAL STATE HOOK USING (ZUSTAND)[https://github.com/pmndrs/zustand]
/**
 * TYPES
 */
type MetamaskID = string | number | null;

type Notification = {
  message: string;
  time: string;
  url: string;
};

type Moo = {
  img: string;
  id: string | number;
};

type UnopenedPack = PackCollectionToken;

/**
 * HOOK
 */
interface MetamaskProps {
  accountId: MetamaskID;
  setAccountId: (newId: MetamaskID) => void;
  connectAccount: () => Promise<{ status: string }>;
  accountPower: number;
  loadAccountPower: () => Promise<{ status: string }>;
  unopenedPacks: UnopenedPack[];
  setUnopenedPacks: (packArr: UnopenedPack[]) => void;
  mintPacks: (amount: number) => Promise<{ status: string }>;
  currentTxURL: string;
  setCurrentTxURL: (url: string) => void;
  moos: Moo[];
  openPack: (pack: PackCollectionToken) => Promise<{
    status: string;
    moos: MooType[];
  }>;
  notifications: Notification[];
  loadNotifications: () => Promise<{
    status: string;
    notifications: Notification[];
  }>;
  loginPromptOpen: boolean;
  setLoginPromptOpen: (isOpen: boolean) => void;
}

export const useMetamask = create<MetamaskProps>()((set) => ({
  accountId: null,
  setAccountId: (newId: MetamaskID) => set({ accountId: newId }),
  connectAccount: async () => await connect(),
  accountPower: 0,
  loadAccountPower: async () => await loadAccountPower(),
  unopenedPacks: [],
  setUnopenedPacks: (packArr: UnopenedPack[]) =>
    set({ unopenedPacks: packArr }),
  mintPacks: async (amount: number) => await mint(amount),
  currentTxURL: "",
  setCurrentTxURL: (url: string) => set({ currentTxURL: url }),
  moos: [],
  openPack: async (pack: PackCollectionToken) => await openPack(pack),
  notifications: [],
  loadNotifications: async () => await loadNotifications(),
  loginPromptOpen: false,
  setLoginPromptOpen: (isOpen: boolean) =>
    set({
      loginPromptOpen: isOpen,
    }),
}));
