import { create } from "zustand";

interface useAgeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAgeModal = create<useAgeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
