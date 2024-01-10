'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

import { TOGGLE_THEME } from '@/app/actions/type';
import { DARK, LIGHT } from '@/app/constants/theme';
import { Action, ThemeContextType } from '@/app/types/theme';

function themeReducer(state: string, action: Action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return state === LIGHT ? DARK : LIGHT;
    default:
      return state;
  }
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LIGHT,
  dispatch: function () {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, dispatch] = useReducer(themeReducer, LIGHT);

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
