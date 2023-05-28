import { create } from "zustand";

const store = (set) => ({
  modal: false,
  openModal: () => set((state) => ({ modal: true })),
  closeModal: () => set((state) => ({ modal: false })),
  testiModal: false,
  openTestiModal: () => set((state) => ({ testiModal: true })),
  closeTestiModal: () => set((state) => ({ testiModal: false })),
  AiModals: false,
  openAiModal: () => set((state) => ({ AiModals: true })),
  closeAiModal: () => set((state) => ({ AiModals: false })),
});

const useModal = create(store);

export default useModal;
