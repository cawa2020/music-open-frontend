export type Mode = 'dark' | 'light'

export interface Theme {
  mode: Mode;
  color: string;
}

export interface ColorCSS {
  "--main-color": string,
  "--hover-color": string,
  "--focus-color": string
}

export interface ModeCSS {
  "--bg-color-main": string,
  "--bg-color-secondary": string,
  "--text-input-color": string,
  "--text-color": string,
  "--text-color-secondary": string,
  "--icon-color": string,
  "--border-color": string,
  "--bg-slider-color": string,
  "--bg-input-color": string,
  "--silder-color": string
}
