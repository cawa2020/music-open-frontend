import { Injectable } from '@angular/core';
import { light, dark } from '../app.themes';
import { ColorCSS, Mode, ModeCSS, Theme } from '../interfaces/app.interface';

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
    const asd = properties
    Object.keys(asd).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        asd[(property as keyof unknown)]
      );
    });
  }
}
