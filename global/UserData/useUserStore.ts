import { User } from '@common/types/User';
import { create } from 'zustand';

interface UserState {
    user: User | undefined,
    setUser: (user: User) => void
};

const useUserStore = create<UserState>((set) => ({
    user: undefined,
    setUser: (user: User) => { set({user: user}) }
}));

export { useUserStore };