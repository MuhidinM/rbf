import { create } from "zustand";

interface useLoanExperienceModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useLoanExperienceModal = create<useLoanExperienceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
