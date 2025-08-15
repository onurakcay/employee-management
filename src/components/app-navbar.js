/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {Router} from '@vaadin/router';
import {LocalizedLitElement} from '../utils/localized-lit-element.js';
import {globalStyles} from '../styles/global-styles.js';
import './custom-button.js';

/**
 * Common navigation header component
 *
 * @fires navigate - Dispatched when navigation is requested
 */
export class AppNavbar extends LocalizedLitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: var(--z-sticky);
        }

        .header {
          background-color: var(--bg-primary);
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--border-color-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: var(--shadow-light);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          cursor: pointer;
          text-decoration: none;
        }

        .logo-image {
          height: 32px;
          width: auto;
          object-fit: contain;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background-color: var(--color-primary);
          border-radius: var(--radius-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-white);
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-lg);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }

        .country-flag {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-small);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: transform 0.2s ease;
        }

        .country-flag:hover {
          transform: scale(1.1);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .header {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .header-left,
          .header-right {
            gap: var(--spacing-sm);
          }

          .nav-button .nav-text {
            display: none; /* Mobilde text'leri gizle */
          }

          .nav-button .nav-icon {
            font-size: 1.2em; /* Icon'ları biraz büyüt */
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Page title
       * @type {string}
       */
      pageTitle: {type: String, attribute: 'page-title'},
    };
  }

  constructor() {
    super();
    this.pageTitle = '';
  }

  render() {
    return html`
      <div class="header">
        <div class="header-left">
          <a href="/" class="logo" @click="${this._handleLogoClick}">
            <img
              src="/public/images/logo.png"
              alt="ING Logo"
              class="logo-image"
            />
            <span>ING</span>
          </a>
        </div>

        <div class="header-right">
          <custom-button
            variant="link"
            class="nav-button"
            @button-click="${this._handleEmployeesClick}"
          >
            <span class="nav-icon">👥</span>&nbsp;&nbsp;
            <span class="nav-text">${this.t('employees')}</span>
          </custom-button>
          <custom-button
            variant="link"
            class="nav-button"
            @button-click="${this._handleAddEmployeeClick}"
          >
            <span class="nav-icon">+</span>&nbsp;
            <span class="nav-text">${this.t('add_employee')}</span>
          </custom-button>
          <div
            class="country-flag"
            @click="${this._handleLanguageToggle}"
            style="cursor: pointer; user-select: none;"
            title="${this.t('change_language', 'Change Language')}"
          >
            ${this.currentLanguage === 'tr' ? '🇬🇧' : '🇹🇷'}
          </div>
        </div>
      </div>
    `;
  }

  _handleLogoClick(event) {
    event.preventDefault();
    this._navigate('/');
  }

  _handleEmployeesClick(event) {
    event.preventDefault();
    this._navigate('/');
  }

  _handleAddEmployeeClick(event) {
    event.preventDefault();
    this._navigate('/add');
  }

  _navigate(path) {
    Router.go(path);
  }

  _handleLanguageToggle(event) {
    event.preventDefault();
    event.stopPropagation();

    // Get current language
    const currentLang = document.documentElement.lang || 'tr';

    // Toggle between Turkish and English
    const newLang = currentLang === 'tr' ? 'en' : 'tr';

    // Update the HTML lang attribute
    document.documentElement.lang = newLang;

    // Trigger a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent('languagechange', {
        detail: {language: newLang},
      })
    );

    // Force re-render of all components
    this.requestUpdate();
  }
}

customElements.define('app-navbar', AppNavbar);
