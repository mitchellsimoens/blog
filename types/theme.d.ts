export type ThemeModes = 'auto' | 'dark' | 'light';

export interface Theme {
  mode: ThemeModes;
  system: boolean;
}
