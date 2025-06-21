import { User } from "@common/types/User";
import { create } from "zustand";

interface UserState {
  user: User | undefined;
  setUser: (user: User) => void;
  setProfilePicture: (profilePicture: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user: User) => {
    set({ user: user });
  },
  setProfilePicture: (profilePicture: string) =>
    set((state) =>
      state.user ? { user: { ...state.user, profilePicture } } : state
    ),
}));

export { useUserStore };
