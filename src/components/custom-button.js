/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {buttonBaseStyles} from '../styles/base-styles.js';
import {globalStyles} from '../styles/global-styles.js';

/**
 * A custom button component
 *
 * @fires button-click - Dispatched when button is clicked
 * @slot - Button content
 * @csspart button - The button element
 */
export class CustomButton extends LitElement {
  static get styles() {
    return [
      globalStyles,
      buttonBaseStyles,
      css`
        :host {
          display: inline-block;
        }

        :host(.full-width) {
          display: block !important;
          width: 100% !important;
        }

        :host(.full-width) button {
          width: 100% !important;
          display: block !important;
        }

        button {
          min-width: 80px;
        }

        /* Primary variant */
        :host([variant='primary']) button {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        :host([variant='primary']) button:hover:not(:disabled) {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          box-shadow: var(--shadow-hover);
        }

        /* Secondary variant */
        :host([variant='secondary']) button {
          background-color: var(--color-secondary);
          border-color: var(--color-secondary);
          color: white;
        }

        :host([variant='secondary']) button:hover:not(:disabled) {
          background-color: #0056b3;
          border-color: #0056b3;
          box-shadow: var(--shadow-hover);
        }

        /* Outline variant */
        :host([variant='outline']) button {
          background-color: transparent;
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        :host([variant='outline']) button:hover:not(:disabled) {
          background-color: var(--color-primary);
          color: white;
        }

        /* Success variant */
        :host([variant='success']) button {
          background-color: var(--color-success);
          border-color: var(--color-success);
          color: white;
        }

        :host([variant='success']) button:hover:not(:disabled) {
          background-color: #218838;
          border-color: #218838;
        }

        /* Danger variant */
        :host([variant='danger']) button {
          background-color: var(--color-danger);
          border-color: var(--color-danger);
          color: white;
        }

        :host([variant='danger']) button:hover:not(:disabled) {
          background-color: #c82333;
          border-color: #c82333;
        }

        /* Link variant */
        :host([variant='link']) button {
          background-color: transparent;
          border: none;
          color: var(--color-primary);
          text-decoration: none;
          padding: var(--spacing-xs) var(--spacing-sm);
          min-width: auto;
          font-weight: var(--font-weight-medium);
          transition: all 0.2s ease;
        }

        :host([variant='link']) button:hover:not(:disabled) {
          color: var(--color-primary-dark);
          text-decoration: underline;
          background-color: transparent;
          box-shadow: none;
        }

        :host([variant='link']) button:focus:not(:disabled) {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        /* Size variants */
        :host([size='small']) button {
          padding: 4px 8px;
          font-size: 12px;
          min-width: 60px;
        }

        :host([size='large']) button {
          padding: 12px 24px;
          font-size: 16px;
          min-width: 120px;
        }

        /* Full width */
        :host([full-width]) {
          display: block;
          width: 100%;
        }

        :host([full-width]) button {
          width: 100%;
        }

        /* Loading state */
        :host([loading]) button {
          position: relative;
          color: transparent;
        }

        :host([loading]) button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 16px;
          margin: -8px 0 0 -8px;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          color: inherit;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Button variant
       * @type {'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'link'}
       */
      variant: {type: String, reflect: true},

      /**
       * Button size
       * @type {'small' | 'medium' | 'large'}
       */
      size: {type: String, reflect: true},

      /**
       * Whether the button is disabled
       * @type {boolean}
       */
      disabled: {type: Boolean, reflect: true},

      /**
       * Whether the button should take full width
       * @type {boolean}
       */
      fullWidth: {type: Boolean, attribute: 'full-width', reflect: true},

      /**
       * Whether the button is in loading state
       * @type {boolean}
       */
      loading: {type: Boolean, reflect: true},

      /**
       * Button type attribute
       * @type {'button' | 'submit' | 'reset'}
       */
      type: {type: String},
    };
  }

  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'medium';
    this.disabled = false;
    this.fullWidth = false;
    this.loading = false;
    this.type = 'button';
  }

  render() {
    return html`
      <button
        part="button"
        type=${this.type === 'submit'
          ? 'submit'
          : this.type === 'reset'
          ? 'reset'
          : 'button'}
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        <slot></slot>
      </button>
    `;
  }

  _handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('button-click', {
        detail: {
          originalEvent: event,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('custom-button', CustomButton);
