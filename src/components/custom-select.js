/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {formElementStyles} from '../styles/base-styles.js';

/**
 * A custom select component
 *
 * @fires change - Dispatched when select value changes
 * @fires input - Dispatched when select is interacted with
 * @slot - Option elements
 * @csspart select - The select element
 * @csspart label - The label element
 */
export class CustomSelect extends LitElement {
  static get styles() {
    return [
      formElementStyles,
      css`
        :host {
          display: block;
        }

        .select-wrapper {
          position: relative;
          display: block;
        }

        .select-control {
          display: block;
          width: 100%;
          padding: 8px 32px 8px 12px;
          font-size: 14px;
          line-height: 1.5;
          color: var(--dark-color);
          background-color: white;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 8px center;
          background-repeat: no-repeat;
          background-size: 16px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          transition: var(--transition);
          outline: none;
          appearance: none;
          cursor: pointer;
        }

        .select-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(230, 0, 38, 0.25);
        }

        .select-control:disabled {
          background-color: var(--light-color);
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Label styles */
        .select-label {
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
          color: var(--dark-color);
          font-size: 14px;
        }

        .select-label:empty {
          display: none;
        }

        /* Required indicator */
        .select-label.required::after {
          content: ' *';
          color: var(--danger-color);
        }

        /* Size variants */
        :host([size='small']) .select-control {
          padding: 4px 24px 4px 8px;
          font-size: 12px;
          background-size: 14px 10px;
          background-position: right 6px center;
        }

        :host([size='large']) .select-control {
          padding: 12px 40px 12px 16px;
          font-size: 16px;
          background-size: 18px 14px;
          background-position: right 12px center;
        }

        /* Error state */
        :host([error]) .select-control {
          border-color: var(--danger-color);
        }

        :host([error]) .select-control:focus {
          border-color: var(--danger-color);
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
        }

        /* Success state */
        :host([success]) .select-control {
          border-color: var(--success-color);
        }

        :host([success]) .select-control:focus {
          border-color: var(--success-color);
          box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
        }

        /* Help text */
        .help-text {
          margin-top: 4px;
          font-size: 12px;
          color: #6c757d;
        }

        .help-text:empty {
          display: none;
        }

        :host([error]) .help-text {
          color: var(--danger-color);
        }

        :host([success]) .help-text {
          color: var(--success-color);
        }

        /* Option styles */
        ::slotted(option) {
          padding: 8px 12px;
          color: var(--dark-color);
        }

        ::slotted(option:disabled) {
          color: #6c757d;
          background-color: var(--light-color);
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Select value
       * @type {string}
       */
      value: {type: String},

      /**
       * Whether the select is disabled
       * @type {boolean}
       */
      disabled: {type: Boolean, reflect: true},

      /**
       * Whether the select is required
       * @type {boolean}
       */
      required: {type: Boolean, reflect: true},

      /**
       * Select name attribute
       * @type {string}
       */
      name: {type: String},

      /**
       * Select label
       * @type {string}
       */
      label: {type: String},

      /**
       * Help text for the select
       * @type {string}
       */
      helpText: {type: String, attribute: 'help-text'},

      /**
       * Select size
       * @type {'small' | 'medium' | 'large'}
       */
      size: {type: String, reflect: true},

      /**
       * Whether the select is in error state
       * @type {boolean}
       */
      error: {type: Boolean, reflect: true},

      /**
       * Whether the select is in success state
       * @type {boolean}
       */
      success: {type: Boolean, reflect: true},

      /**
       * Whether multiple selection is allowed
       * @type {boolean}
       */
      multiple: {type: Boolean, reflect: true},

      /**
       * Placeholder text
       * @type {string}
       */
      placeholder: {type: String},

      /**
       * Options for the select
       * @type {Array<{value: string, label: string, disabled?: boolean}>}
       */
      options: {type: Array},
    };
  }

  constructor() {
    super();
    this.value = '';
    this.disabled = false;
    this.required = false;
    this.name = '';
    this.label = '';
    this.helpText = '';
    this.size = 'medium';
    this.error = false;
    this.success = false;
    this.multiple = false;
    this.placeholder = '';
    this.options = [];
  }

  render() {
    return html`
      ${this.label
        ? html`
            <label
              part="label"
              class="select-label ${this.required ? 'required' : ''}"
            >
              ${this.label}
            </label>
          `
        : ''}

      <div class="select-wrapper">
        <select
          part="select"
          class="select-control"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          ?multiple="${this.multiple}"
          name="${this.name}"
          @change="${this._handleChange}"
          @input="${this._handleInput}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
        >
          ${this.placeholder
            ? html`
                <option value="" disabled ?selected="${!this.value}">
                  ${this.placeholder}
                </option>
              `
            : ''}
          ${this.options.map(
            (option) => html`
              <option
                value="${option.value}"
                ?disabled="${option.disabled}"
                ?selected="${this.value === option.value}"
              >
                ${option.label}
              </option>
            `
          )}
          <slot></slot>
        </select>
      </div>

      ${this.helpText
        ? html` <div class="help-text">${this.helpText}</div> `
        : ''}
    `;
  }

  _handleChange(event) {
    this.value = event.target.value;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: this.value,
          originalEvent: event,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleInput(event) {
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {
          value: event.target.value,
          originalEvent: event,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleFocus(event) {
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: {
          originalEvent: event,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleBlur(event) {
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: {
          originalEvent: event,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Focus the select
   */
  focus() {
    const select = this.shadowRoot.querySelector('.select-control');
    if (select) {
      select.focus();
    }
  }

  /**
   * Blur the select
   */
  blur() {
    const select = this.shadowRoot.querySelector('.select-control');
    if (select) {
      select.blur();
    }
  }
}

customElements.define('custom-select', CustomSelect);
