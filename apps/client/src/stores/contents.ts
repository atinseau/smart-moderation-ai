import { create } from 'zustand';

export interface ContentsStore {
  isSelectionMode: boolean;
  selectedIds: string[];
  setSelectionMode: (isSelectionMode: boolean) => void;
  setSelectedIds: (ids: string[]) => void;
}

export const useContentsStore = create<ContentsStore>((set, get) => ({
  isSelectionMode: false,
  selectedIds: [],
  setSelectedIds: (ids) => set({
    selectedIds: ids
  }),
  setSelectionMode: (isSelectionMode) => set({
    isSelectionMode,
    selectedIds: [] // Reset selectedIds when toggling selection mode
  })
}))
