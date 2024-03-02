import { ModeCSS } from "./interfaces/app.interface"

export const light: ModeCSS = {
  "--bg-color-main": "white",
  "--bg-color-secondary": "rgb(245, 245, 245)",

  "--text-button-color": "#ffffff",
  "--text-input-color": "#000000",
  "--text-color": "#222",
  "--text-color-secondary": "#818c99",
  "--icon-color": "#5f6368",
  "--border-color": "#d1d5db",
}

export const dark: ModeCSS = {
  "--bg-color-main": "#121212",
  "--bg-color-secondary": "#000",

  "--text-button-color": "#ffffff",
  "--text-input-color": "#000000",
  "--text-color": "#eee",
  "--text-color-secondary": "#818c99",
  "--icon-color": "#b0b7c0",
  "--border-color": "#222",
}
