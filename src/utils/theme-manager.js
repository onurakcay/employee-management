/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Theme Manager Utility
 * Merkezi renk yönetimi için utility class
 */
export class ThemeManager {
  static themes = {
    default: {
      '--ing-primary': '#e60026',
      '--ing-primary-dark': '#cc0022',
      '--ing-primary-light': '#ff4757',
    },
    blue: {
      '--ing-primary': '#0066cc',
      '--ing-primary-dark': '#0056b3',
      '--ing-primary-light': '#4285f4',
    },
    green: {
      '--ing-primary': '#28a745',
      '--ing-primary-dark': '#218838',
      '--ing-primary-light': '#34ce57',
    },
    purple: {
      '--ing-primary': '#6f42c1',
      '--ing-primary-dark': '#5a34a8',
      '--ing-primary-light': '#8a63d2',
    },
  };

  static applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) {
      console.warn(`Theme "${themeName}" not found`);
      return;
    }

    const root = document.documentElement;
    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // LocalStorage'da tema tercihini sakla
    localStorage.setItem('selectedTheme', themeName);
  }

  static getCurrentTheme() {
    return localStorage.getItem('selectedTheme') || 'default';
  }

  static initTheme() {
    const savedTheme = this.getCurrentTheme();
    this.applyTheme(savedTheme);
  }

  static addCustomColor(colorName, colorValue) {
    document.documentElement.style.setProperty(
      `--color-${colorName}`,
      colorValue
    );
  }

  static getColorValue(colorProperty) {
    return getComputedStyle(document.documentElement).getPropertyValue(
      colorProperty
    );
  }
}

// Sayfa yüklendiğinde tema'yı başlat
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initTheme();
  });
}
