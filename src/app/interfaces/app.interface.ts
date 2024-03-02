export type Mode = 'dark' | 'light'
export type Repeat = 'none' | 'song' | 'playlist'

export interface Song {
  author: string
  name: string
  duration: number
  cover: string
  songSource: string
  feat?: string
  id: string
}

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
  "--text-button-color": string,
  "--text-input-color": string,
  "--text-color": string,
  "--text-color-secondary": string,
  "--icon-color": string,
  "--border-color": string,
}
