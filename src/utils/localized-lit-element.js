/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement} from 'lit';
import {
  t,
  getCurrentLanguage,
  formatDate,
  formatCurrency,
  formatNumber,
} from './localization.js';

/**
 * Base class for all localized Lit components
 * Automatically handles language changes and provides translation methods
 */
export class LocalizedLitElement extends LitElement {
  constructor() {
    super();
    this._boundLanguageChangeHandler = this._handleLanguageChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen for language changes
    document.addEventListener(
      'languagechange',
      this._boundLanguageChangeHandler
    );
    // Also listen for manual lang attribute changes
    this._observer = new MutationObserver(this._boundLanguageChangeHandler);
    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(
      'languagechange',
      this._boundLanguageChangeHandler
    );
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  _handleLanguageChange() {
    // Trigger re-render when language changes
    this.requestUpdate();
  }

  /**
   * Helper method for getting translations in components
   * @param {string} key - Translation key
   * @param {string} fallback - Fallback text
   * @returns {string} Translated string
   */
  t(key, fallback) {
    return t(key, fallback);
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  get currentLanguage() {
    return getCurrentLanguage();
  }

  /**
   * Format date according to current locale
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date
   */
  formatDate(date) {
    return formatDate(date);
  }

  /**
   * Format currency according to current locale
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency
   */
  formatCurrency(amount) {
    return formatCurrency(amount);
  }

  /**
   * Format number according to current locale
   * @param {number} number - Number to format
   * @returns {string} Formatted number
   */
  formatNumber(number) {
    return formatNumber(number);
  }
}
