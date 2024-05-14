import { create } from "zustand";

interface useDistanceModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDistanceModal = create<useDistanceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
