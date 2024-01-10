import { Dispatch } from 'react';

export type Action = {
  type: string;
};

export type ThemeContextType = {
  theme: string;
  dispatch: Dispatch<Action>;
};
