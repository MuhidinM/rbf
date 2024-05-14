import { create } from "zustand";

interface useTrainingModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTrainingModal = create<useTrainingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
