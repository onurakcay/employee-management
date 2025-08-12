/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {css} from 'lit';

/**
 * Global CSS Custom Properties (CSS Variables)
 * Bu dosyada tüm renk ve tasarım değişkenleri merkezi olarak yönetilir
 */
export const globalStyles = css`
  :host {
    /* ING Brand Colors */
    --ing-primary: #ff6600;
    --ing-primary-dark: #cc0022;
    --ing-primary-light: #ff4757;
    --ing-orange: #ff6200;
    --ing-orange-dark: #e55100;

    /* Semantic Colors */
    --color-primary: var(--ing-primary);
    --color-primary-dark: var(--ing-primary-dark);
    --color-secondary: #0066cc;
    --color-success: #28a745;
    --color-warning: #ffc107;
    --color-danger: #dc3545;
    --color-info: #17a2b8;

    /* Neutral Colors */
    --color-white: #ffffff;
    --color-light: #f8f9fa;
    --color-light-gray: #e9ecef;
    --color-gray: #6c757d;
    --color-dark-gray: #495057;
    --color-dark: #343a40;
    --color-black: #000000;

    /* Background Colors */
    --bg-primary: var(--color-white);
    --bg-secondary: var(--color-light);
    --bg-dark: var(--color-dark);
    --bg-brand: var(--ing-primary);

    /* Text Colors */
    --text-primary: var(--color-dark);
    --text-secondary: var(--color-gray);
    --text-muted: var(--color-dark-gray);
    --text-white: var(--color-white);
    --text-brand: var(--ing-primary);

    /* Border Colors */
    --border-color: #dee2e6;
    --border-color-light: #e0e0e0;
    --border-color-dark: #adb5bd;

    /* Shadow Colors */
    --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.15);
    --shadow-heavy: 0 8px 16px rgba(0, 0, 0, 0.2);

    /* Border Radius */
    --radius-small: 2px;
    --radius-medium: 4px;
    --radius-large: 8px;
    --radius-xl: 12px;
    --radius-round: 50%;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;

    /* Typography */
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial,
      sans-serif;
    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 24px;
    --font-size-xxl: 32px;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 600;
    --font-weight-extra-bold: 700;

    /* Transitions */
    --transition-fast: 0.15s ease-in-out;
    --transition-normal: 0.2s ease-in-out;
    --transition-slow: 0.3s ease-in-out;

    /* Z-index values */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;

    /* Component specific variables */
    --navbar-height: 64px;
    --sidebar-width: 250px;
    --content-max-width: 1200px;

    /* Box sizing */
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

/**
 * Backward compatibility - eski değişken isimleri
 */
export const baseStyles = css`
  ${globalStyles}

  :host {
    /* Eski değişken isimleri - geriye dönük uyumluluk için */
    --primary-color: var(--color-primary);
    --primary-dark: var(--color-primary-dark);
    --secondary-color: var(--color-secondary);
    --success-color: var(--color-success);
    --warning-color: var(--color-warning);
    --danger-color: var(--color-danger);
    --light-color: var(--color-light);
    --dark-color: var(--color-dark);
    --border-radius: var(--radius-medium);
    --transition: var(--transition-normal);
    --shadow: var(--shadow-light);
    --shadow-hover: var(--shadow-medium);
  }
`;

/**
 * Button specific styles with global variables
 */
export const buttonBaseStyles = css`
  ${globalStyles}

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm) var(--spacing-md);
    margin: 0;
    border: 1px solid transparent;
    border-radius: var(--radius-medium);
    font-family: var(--font-family);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition-normal);
    background-color: transparent;
    outline: none;
    user-select: none;
  }

  button:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/**
 * Form element specific styles with global variables
 */
export const formElementStyles = css`
  ${globalStyles}

  .form-element {
    display: block;
    margin-bottom: var(--spacing-md);
  }

  .form-label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: var(--font-weight-medium);
    color: var(--text-primary);
    font-size: var(--font-size-sm);
  }

  .form-control {
    display: block;
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-sm);
    font-size: var(--font-size-sm);
    line-height: 1.5;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-medium);
    transition: var(--transition-normal);
  }

  .form-control:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px rgba(230, 0, 38, 0.25);
  }

  .form-control:disabled {
    background-color: var(--color-light);
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
