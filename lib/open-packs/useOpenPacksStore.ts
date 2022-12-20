import { RectReadOnly } from "react-use-measure";
import { MooType } from "types/MooType";
import create from "zustand";

type OpenPacksStoreProps = {
  mouseDown: boolean;
  setMouseDown: (state: boolean) => void;
  expandedMooID: string | undefined;
  setExpandedMooID: (mooID: string | undefined) => void;
  expandedMooImg: string;
  expandedMoo: MooType | null;
  setExpandedMoo: (moo: MooType | null) => void;
  setExpandedMooImg: (img: string) => void;
  dropZoneBounds: RectReadOnly;
  setDropZoneBounds: (bounds: RectReadOnly) => void;
  packBeingDragged: boolean;
  setPackBeingDragged: (isDragging: boolean) => void;
  packDragPosition: { x: number; y: number };
  updatePackDragPosition: (value: { x: number; y: number }) => void;
  loadingMoos: boolean;
  setLoadingMoos: (isLoading: boolean) => void;
  poofAnimationPlaying: boolean;
  setPoofAnimationPlaying: (value: boolean) => void;
};

export const useOpenPacksStore = create<OpenPacksStoreProps>()((set) => ({
  mouseDown: false,
  setMouseDown: (state: boolean) => set({ mouseDown: state }),
  expandedMooID: undefined,
  setExpandedMooID: (mooID: string | undefined) =>
    set({
      expandedMooID: mooID,
    }),
  expandedMooImg: "",
  setExpandedMooImg: (img: string) =>
    set({
      expandedMooImg: img,
    }),
  expandedMoo: null,
  setExpandedMoo: (moo: MooType | null) => set({ expandedMoo: moo }),
  dropZoneBounds: {
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  },
  setDropZoneBounds: (bounds: RectReadOnly) => set({ dropZoneBounds: bounds }),
  packBeingDragged: false,
  setPackBeingDragged: (isDragging: boolean) =>
    set({ packBeingDragged: isDragging }),
  packDragPosition: { x: 0, y: 0 },
  updatePackDragPosition: (value: { x: number; y: number }) =>
    set({ packDragPosition: value }),
  loadingMoos: false,
  setLoadingMoos: async (isLoading: boolean) => {
    set({ loadingMoos: isLoading });
  },
  poofAnimationPlaying: false,
  setPoofAnimationPlaying: (isPlaying: boolean) =>
    set({ poofAnimationPlaying: isPlaying }),
}));
