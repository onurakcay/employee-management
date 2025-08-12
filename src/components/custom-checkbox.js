/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {formElementStyles} from '../styles/base-styles.js';

/**
 * A custom checkbox component
 *
 * @fires change - Dispatched when checkbox value changes
 * @fires input - Dispatched when checkbox is interacted with
 * @slot label - Label content for the checkbox
 * @csspart checkbox - The checkbox input element
 * @csspart label - The label element
 */
export class CustomCheckbox extends LitElement {
  static get styles() {
    return [
      formElementStyles,
      css`
        :host {
          display: block;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox-input {
          position: relative;
          width: 18px;
          height: 18px;
          margin: 0;
          appearance: none;
          border: 2px solid var(--border-color);
          border-radius: 3px;
          background-color: white;
          cursor: pointer;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .checkbox-input:checked {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .checkbox-input:checked::after {
          content: '';
          position: absolute;
          top: 1px;
          left: 5px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-input:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }

        .checkbox-input:disabled {
          background-color: var(--light-color);
          border-color: var(--border-color);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .checkbox-input:disabled:checked {
          background-color: #ccc;
          border-color: #ccc;
        }

        .checkbox-label {
          flex: 1;
          color: var(--dark-color);
          cursor: pointer;
          line-height: 1.4;
          margin: 0;
        }

        .checkbox-label:empty {
          display: none;
        }

        :host([disabled]) .checkbox-wrapper {
          cursor: not-allowed;
        }

        :host([disabled]) .checkbox-label {
          cursor: not-allowed;
          opacity: 0.6;
        }

        /* Size variants */
        :host([size='small']) .checkbox-input {
          width: 14px;
          height: 14px;
        }

        :host([size='small']) .checkbox-input:checked::after {
          left: 3px;
          width: 3px;
          height: 6px;
        }

        :host([size='large']) .checkbox-input {
          width: 22px;
          height: 22px;
        }

        :host([size='large']) .checkbox-input:checked::after {
          left: 7px;
          width: 5px;
          height: 10px;
        }

        /* Indeterminate state */
        .checkbox-input:indeterminate {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .checkbox-input:indeterminate::after {
          content: '';
          position: absolute;
          top: 7px;
          left: 3px;
          width: 10px;
          height: 2px;
          background-color: white;
          border: none;
          transform: none;
        }

        :host([size='small']) .checkbox-input:indeterminate::after {
          top: 5px;
          left: 2px;
          width: 8px;
        }

        :host([size='large']) .checkbox-input:indeterminate::after {
          top: 9px;
          left: 4px;
          width: 12px;
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Whether the checkbox is checked
       * @type {boolean}
       */
      checked: {type: Boolean, reflect: true},

      /**
       * Whether the checkbox is disabled
       * @type {boolean}
       */
      disabled: {type: Boolean, reflect: true},

      /**
       * Whether the checkbox is in indeterminate state
       * @type {boolean}
       */
      indeterminate: {type: Boolean, reflect: true},

      /**
       * Checkbox size
       * @type {'small' | 'medium' | 'large'}
       */
      size: {type: String, reflect: true},

      /**
       * Form value for the checkbox
       * @type {string}
       */
      value: {type: String},

      /**
       * Form name for the checkbox
       * @type {string}
       */
      name: {type: String},

      /**
       * Whether the checkbox is required
       * @type {boolean}
       */
      required: {type: Boolean, reflect: true},
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.indeterminate = false;
    this.size = 'medium';
    this.value = '';
    this.name = '';
    this.required = false;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('indeterminate')) {
      const input = this.shadowRoot.querySelector('.checkbox-input');
      if (input) {
        input.indeterminate = this.indeterminate;
      }
    }
  }

  render() {
    return html`
      <div class="checkbox-wrapper" @click="${this._handleWrapperClick}">
        <input
          part="checkbox"
          class="checkbox-input"
          type="checkbox"
          .checked="${this.checked}"
          .disabled="${this.disabled}"
          .value="${this.value}"
          .name="${this.name}"
          .required="${this.required}"
          @change="${this._handleChange}"
          @input="${this._handleInput}"
        />
        <label part="label" class="checkbox-label">
          <slot name="label"></slot>
        </label>
      </div>
    `;
  }

  _handleWrapperClick(event) {
    if (this.disabled) return;

    // Prevent double-firing when clicking the actual input
    if (event.target.classList.contains('checkbox-input')) return;

    this.toggle();
  }

  _handleChange(event) {
    this.checked = event.target.checked;
    this.indeterminate = false;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          checked: this.checked,
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
          checked: event.target.checked,
          value: this.value,
          originalEvent: event,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Toggle the checkbox state
   */
  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          checked: this.checked,
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Set the checkbox to checked state
   */
  check() {
    this.checked = true;
    this.indeterminate = false;
  }

  /**
   * Set the checkbox to unchecked state
   */
  uncheck() {
    this.checked = false;
    this.indeterminate = false;
  }

  /**
   * Set the checkbox to indeterminate state
   */
  setIndeterminate() {
    this.indeterminate = true;
    this.checked = false;
  }
}

customElements.define('custom-checkbox', CustomCheckbox);
