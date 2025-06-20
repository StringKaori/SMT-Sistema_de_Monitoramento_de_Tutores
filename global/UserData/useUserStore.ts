import { LoginUser } from '@common/types/User';
import { create } from 'zustand';

interface UserState {
    user: LoginUser | undefined,
    setUser: (user: LoginUser) => void
};

const useUserStore = create<UserState>((set) => ({
    user: undefined,
    setUser: (user: LoginUser) => { set({user: user}) }
}));

export { useUserStore };