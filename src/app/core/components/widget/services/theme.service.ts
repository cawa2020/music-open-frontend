import { Injectable } from '@angular/core';
import { light, dark } from '../../../../shared/constants/theme.contant';
import { Theme, Mode, ColorCSS, ModeCSS } from '../../../../shared/interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = {
    mode: 'light',
    color: 'blue'
  }

  constructor() { }

  getMode(): Mode {
    return this.active.mode
  }

  toggleMode() {
    const newValue: Mode = this.active.mode === 'dark' ? ('light' as Mode) : ('dark' as Mode)
    this.active = { ...this.active, mode: newValue }
    const keys = {
      'dark': dark,
      'light': light,
    }
    const properties = keys[newValue]
    this.changeProperties(properties)
    localStorage.setItem('themeMode', newValue)
  }

  changeMainColor(newColor: string) {
    this.active = { ...this.active, color: newColor }
    const properties: ColorCSS = {
      "--main-color": newColor,
      "--hover-color": newColor,
      "--focus-color": newColor
    }
    this.changeProperties(properties)
  }

  private changeProperties(properties: ColorCSS | ModeCSS) {
    const prop = properties
    Object.keys(prop).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        prop[(property as keyof unknown)]
      );
    });
  }
}
