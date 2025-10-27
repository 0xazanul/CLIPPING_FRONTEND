import { create } from 'zustand';

interface UserState {
  role: 'brand' | 'clipper' | null;
  setRole: (role: 'brand' | 'clipper' | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
