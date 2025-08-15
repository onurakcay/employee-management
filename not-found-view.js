/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {Router} from '@vaadin/router';
import {LocalizedLitElement} from './src/utils/localized-lit-element.js';
import './src/components/app-navbar.js';

/**
 * Not Found page component
 */
export class NotFoundView extends LocalizedLitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Arial, sans-serif;
        background-color: #f5f5f5;
        min-height: 100vh;
      }

      .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 80px);
        text-align: center;
        padding: 20px;
        color: #333;
      }

      .error-code {
        font-size: 6rem;
        font-weight: bold;
        color: #e60026;
        margin: 0;
        line-height: 1;
      }

      .error-message {
        font-size: 1.5rem;
        margin: 20px 0;
        color: #666;
      }

      .error-description {
        font-size: 1rem;
        margin-bottom: 30px;
        color: #888;
        max-width: 400px;
      }

      .home-button {
        padding: 12px 24px;
        background-color: #e60026;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        text-decoration: none;
        display: inline-block;
      }

      .home-button:hover {
        background-color: #cc0022;
      }

      .icon {
        font-size: 3rem;
        margin-bottom: 20px;
      }
    `;
  }

  render() {
    return html`
      <app-navbar
        current-page="404"
        page-title="${this.t('page_not_found')}"
      ></app-navbar>

      <div class="error-container">
        <div class="icon">🔍</div>
        <h1 class="error-code">404</h1>
        <div class="error-message">${this.t('page_not_found')}</div>
        <div class="error-description">
          ${this.t('page_not_found_description')}
        </div>
        <a href="/" class="home-button" @click="${this._handleHomeClick}">
          ${this.t('go_home')}
        </a>
      </div>
    `;
  }

  _handleHomeClick(event) {
    event.preventDefault();
    Router.go('/');
  }
}

customElements.define('not-found-view', NotFoundView);
