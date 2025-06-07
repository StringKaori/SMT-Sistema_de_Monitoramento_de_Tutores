// arquivo typescript criando uma store (estado global do zustand)
// que me permite recuperar os valores setados no arquivo anterior em
// qualquer parte do app de forma dinâmica.

import { create } from 'zustand';
import { lightTheme } from './lightTheme';
import { ThemeType } from './types/ThemeType';

interface ThemeState {
  theme: ThemeType,
  setTheme: (theme: ThemeType) => void

  width: number,
  setWidth: (width: number) => void

  height: number,
  setHeight: (height: number) => void
}

const useThemeStore = create<ThemeState>((set) => ({
  // por default o lightTheme é setado, porém ao chamar o setTheme é
  // possivel alterar de forma dinâmica o theme
  theme: lightTheme,
  setTheme: (theme: ThemeType) => set({ theme: theme }),

  width: 0,
  setWidth: (width: number) => set({ width: width }),

  height: 0,
  setHeight: (height: number) => set({ height: height })
}));

export { useThemeStore };