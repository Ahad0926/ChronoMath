import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeKey = 'userTheme';
  private defaultTheme = 'light';

  constructor() {
    this.loadTheme();
  }

  loadTheme(): void {
    const storedTheme = localStorage.getItem(this.themeKey);
    this.applyTheme(storedTheme || this.defaultTheme);
  }

  applyTheme(theme: string): void {
    const html = document.documentElement;

    // Remove previous theme classes
    html.classList.remove(
      'theme-light',
      'theme-dark',
      'theme-deuteranopia',
      'theme-protanopia',
      'theme-tritanopia'
    );

    html.classList.add(`theme-${theme}`);
    localStorage.setItem(this.themeKey, theme);
  }

  getCurrentTheme(): string {
    return localStorage.getItem(this.themeKey) || this.defaultTheme;
  }
}
