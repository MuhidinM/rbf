import { create } from "zustand";

interface useFamilySizeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFamilySizeModal = create<useFamilySizeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
