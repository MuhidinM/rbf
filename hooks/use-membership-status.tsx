import { create } from "zustand";

interface useMembershipStatusModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMembershipStatusModal = create<useMembershipStatusModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
