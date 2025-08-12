/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {formElementStyles} from '../styles/base-styles.js';

/**
 * A custom input component
 *
 * @fires input - Dispatched when input value changes
 * @fires change - Dispatched when input loses focus
 * @fires focus - Dispatched when input gains focus
 * @fires blur - Dispatched when input loses focus
 * @slot prefix - Content before the input
 * @slot suffix - Content after the input
 * @csspart input - The input element
 * @csspart label - The label element
 */
export class CustomInput extends LitElement {
  static get styles() {
    return [
      formElementStyles,
      css`
        :host {
          display: block;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-control {
          flex: 1;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          padding: 8px 12px;
          font-size: 14px;
          line-height: 1.5;
          color: var(--dark-color);
          background-color: white;
          transition: var(--transition);
          outline: none;
        }

        .input-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(230, 0, 38, 0.25);
        }

        .input-control:disabled {
          background-color: var(--light-color);
          opacity: 0.6;
          cursor: not-allowed;
        }

        .input-control::placeholder {
          color: #6c757d;
          opacity: 1;
        }

        /* Label styles */
        .input-label {
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
          color: var(--dark-color);
          font-size: 14px;
        }

        .input-label:empty {
          display: none;
        }

        /* Required indicator */
        .input-label.required::after {
          content: ' *';
          color: var(--danger-color);
        }

        /* Prefix and suffix slots */
        .prefix-slot,
        .suffix-slot {
          display: flex;
          align-items: center;
          padding: 0 8px;
          background-color: var(--light-color);
          border: 1px solid var(--border-color);
          color: #6c757d;
          font-size: 14px;
        }

        .prefix-slot {
          border-right: none;
          border-radius: var(--border-radius) 0 0 var(--border-radius);
        }

        .suffix-slot {
          border-left: none;
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }

        .has-prefix .input-control {
          border-left: none;
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }

        .has-suffix .input-control {
          border-right: none;
          border-radius: var(--border-radius) 0 0 var(--border-radius);
        }

        .has-prefix.has-suffix .input-control {
          border-left: none;
          border-right: none;
          border-radius: 0;
        }

        /* Size variants */
        :host([size='small']) .input-control {
          padding: 4px 8px;
          font-size: 12px;
        }

        :host([size='small']) .prefix-slot,
        :host([size='small']) .suffix-slot {
          padding: 0 6px;
          font-size: 12px;
        }

        :host([size='large']) .input-control {
          padding: 12px 16px;
          font-size: 16px;
        }

        :host([size='large']) .prefix-slot,
        :host([size='large']) .suffix-slot {
          padding: 0 12px;
          font-size: 16px;
        }

        /* Error state */
        :host([error]) .input-control {
          border-color: var(--danger-color);
        }

        :host([error]) .input-control:focus {
          border-color: var(--danger-color);
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
        }

        :host([error]) .prefix-slot,
        :host([error]) .suffix-slot {
          border-color: var(--danger-color);
        }

        /* Success state */
        :host([success]) .input-control {
          border-color: var(--success-color);
        }

        :host([success]) .input-control:focus {
          border-color: var(--success-color);
          box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
        }

        :host([success]) .prefix-slot,
        :host([success]) .suffix-slot {
          border-color: var(--success-color);
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
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Input value
       * @type {string}
       */
      value: {type: String},

      /**
       * Input type
       * @type {string}
       */
      type: {type: String},

      /**
       * Input placeholder
       * @type {string}
       */
      placeholder: {type: String},

      /**
       * Whether the input is disabled
       * @type {boolean}
       */
      disabled: {type: Boolean, reflect: true},

      /**
       * Whether the input is readonly
       * @type {boolean}
       */
      readonly: {type: Boolean, reflect: true},

      /**
       * Whether the input is required
       * @type {boolean}
       */
      required: {type: Boolean, reflect: true},

      /**
       * Input name attribute
       * @type {string}
       */
      name: {type: String},

      /**
       * Input label
       * @type {string}
       */
      label: {type: String},

      /**
       * Help text for the input
       * @type {string}
       */
      helpText: {type: String, attribute: 'help-text'},

      /**
       * Input size
       * @type {'small' | 'medium' | 'large'}
       */
      size: {type: String, reflect: true},

      /**
       * Whether the input is in error state
       * @type {boolean}
       */
      error: {type: Boolean, reflect: true},

      /**
       * Whether the input is in success state
       * @type {boolean}
       */
      success: {type: Boolean, reflect: true},

      /**
       * Minimum length
       * @type {number}
       */
      minlength: {type: Number},

      /**
       * Maximum length
       * @type {number}
       */
      maxlength: {type: Number},

      /**
       * Pattern for validation
       * @type {string}
       */
      pattern: {type: String},

      /**
       * Autocomplete attribute
       * @type {string}
       */
      autocomplete: {type: String},
    };
  }

  constructor() {
    super();
    this.value = '';
    this.type = 'text';
    this.placeholder = '';
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.name = '';
    this.label = '';
    this.helpText = '';
    this.size = 'medium';
    this.error = false;
    this.success = false;
    this.autocomplete = '';
  }

  render() {
    const hasPrefix = this.querySelector('[slot="prefix"]');
    const hasSuffix = this.querySelector('[slot="suffix"]');

    return html`
      ${this.label
        ? html`
            <label
              part="label"
              class="input-label ${this.required ? 'required' : ''}"
            >
              ${this.label}
            </label>
          `
        : ''}

      <div
        class="input-wrapper ${hasPrefix ? 'has-prefix' : ''} ${hasSuffix
          ? 'has-suffix'
          : ''}"
      >
        ${hasPrefix
          ? html`
              <div class="prefix-slot">
                <slot name="prefix"></slot>
              </div>
            `
          : ''}

        <input
          part="input"
          class="input-control"
          type="${this.type}"
          .value="${this.value || ''}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          name="${this.name}"
          minlength="${this.minlength || ''}"
          maxlength="${this.maxlength || ''}"
          pattern="${this.pattern || ''}"
          autocomplete="${this.autocomplete || ''}"
          @input="${this._handleInput}"
          @change="${this._handleChange}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
        />

        ${hasSuffix
          ? html`
              <div class="suffix-slot">
                <slot name="suffix"></slot>
              </div>
            `
          : ''}
      </div>

      ${this.helpText
        ? html` <div class="help-text">${this.helpText}</div> `
        : ''}
    `;
  }

  _handleInput(event) {
    const inputValue = event.target.value;

    // Eğer değer undefined veya null ise event dispatch etme
    if (inputValue === undefined || inputValue === null) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {
          value: inputValue,
          originalEvent: event,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleChange(event) {
    this.dispatchEvent(
      new CustomEvent('change', {
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
   * Focus the input
   */
  focus() {
    const input = this.shadowRoot.querySelector('.input-control');
    if (input) {
      input.focus();
    }
  }

  /**
   * Blur the input
   */
  blur() {
    const input = this.shadowRoot.querySelector('.input-control');
    if (input) {
      input.blur();
    }
  }

  /**
   * Select all text in the input
   */
  select() {
    const input = this.shadowRoot.querySelector('.input-control');
    if (input) {
      input.select();
    }
  }
}

customElements.define('custom-input', CustomInput);
