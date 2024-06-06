import { ModeCSS } from "../interfaces/theme.interface"

export const light: ModeCSS = {
  "--bg-color-main": "white",
  "--bg-color-secondary": "rgb(235, 235, 235)",

  "--text-input-color": "#000000",
  "--text-color": "#222",
  "--text-color-secondary": "#898989",
  "--icon-color": "#5f6368",
  "--border-color": "#d1d5db",
  "--bg-slider-color": "#ddd",
  "--bg-input-color": "white",
  "--silder-color": "#ddd"
}

export const dark: ModeCSS = {
  "--bg-color-main": "#121212",
  "--bg-color-secondary": "#000",

  "--text-input-color": "#000000",
  "--text-color": "#eee",
  "--text-color-secondary": "#898989",
  "--icon-color": "#b0b7c0",
  "--border-color": "#222",
  "--bg-slider-color": "#616161",
  "--bg-input-color": "#222",
  "--silder-color": "hsla(0,0%,100%,.3)"
}
