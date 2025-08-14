/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {t, getPositionDisplayName} from '../utils/localization.js';

/**
 * Employee Card Component
 * Displays employee information in a card format
 *
 * @fires card-action - Dispatched when an action button is clicked
 * @fires card-select - Dispatched when card is selected/deselected
 */
export class EmployeeCard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-family);
      }

      .card {
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-large);
        padding: var(--spacing-xl);
        box-shadow: var(--shadow-small);
        transition: all 0.2s ease;
        position: relative;
        display: flex;
        flex-direction: column;
        height: 400px;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }

      .card:hover {
        box-shadow: var(--shadow-medium);
        transform: translateY(-2px);
        border-color: var(--color-primary);
      }

      .card.selected {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(230, 0, 38, 0.1);
      }

      .card-header {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        margin-bottom: var(--spacing-lg);
        min-height: 40px;
      }

      .employee-info {
        flex: 1;
      }

      .card-checkbox {
        flex-shrink: 0;
        margin-left: var(--spacing-sm);
        margin-top: var(--spacing-xs);
      }

      .card-body {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
        overflow: hidden;
      }

      .field-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        min-height: 60px;
      }

      .field-label {
        font-size: var(--font-size-sm);
        color: var(--color-gray);
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.2;
      }

      .field-value {
        font-size: var(--font-size-md);
        color: var(--color-dark);
        font-weight: var(--font-weight-medium);
        line-height: 1.3;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      .field-value.name {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--color-dark);
      }

      .card-footer {
        margin-top: auto;
        display: flex;
        gap: var(--spacing-md);
        justify-content: flex-start;
        padding-top: var(--spacing-md);
        border-top: 1px solid var(--border-light);
      }

      .action-button {
        padding: var(--spacing-sm) var(--spacing-lg);
        border: none;
        border-radius: var(--radius-medium);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        min-width: 100px;
        justify-content: center;
      }

      .edit-button {
        background: #6366f1;
        color: white;
      }

      .edit-button:hover {
        background: #4f46e5;
        transform: translateY(-1px);
      }

      .delete-button {
        background: #f97316;
        color: white;
      }

      .delete-button:hover {
        background: #ea580c;
        transform: translateY(-1px);
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .card {
          padding: var(--spacing-lg);
          height: 360px;
        }

        .card-body {
          grid-template-columns: 1fr;
          gap: var(--spacing-md);
        }

        .field-group {
          min-height: 50px;
        }

        .card-footer {
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .action-button {
          width: 100%;
          min-width: unset;
        }
      }
    `;
  }

  static get properties() {
    return {
      /**
       * Employee data
       * @type {Object}
       */
      employee: {type: Object},

      /**
       * Whether the card is selected
       * @type {boolean}
       */
      selected: {type: Boolean},

      /**
       * Whether to show selection checkbox
       * @type {boolean}
       */
      showCheckbox: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.employee = {};
    this.selected = false;
    this.showCheckbox = true;
  }

  /**
   * Helper method for getting translations
   * @param {string} key - Translation key
   * @param {string} fallback - Fallback text
   * @returns {string} Translated string
   */
  t(key, fallback) {
    return t(key, fallback);
  }

  render() {
    if (!this.employee || !this.employee.id) {
      return html``;
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      dateOfEmployment,
      dateOfBirth,
    } = this.employee;

    return html`
      <div class="card ${this.selected ? 'selected' : ''}">
        <div class="card-header">
          <div class="employee-info">
            <!-- Name fields will be in the body -->
          </div>
          ${this.showCheckbox
            ? html`
                <div class="card-checkbox">
                  <custom-checkbox
                    .checked="${this.selected}"
                    @change="${this._handleSelect}"
                  ></custom-checkbox>
                </div>
              `
            : ''}
        </div>

        <div class="card-body">
          <!-- Left Column -->
          <div class="field-group">
            <span class="field-label"
              >${this.t('first_name', 'First Name')}:</span
            >
            <span class="field-value name">${firstName}</span>
          </div>

          <div class="field-group">
            <span class="field-label">${this.t('last_name', 'Last Name')}</span>
            <span class="field-value name">${lastName}</span>
          </div>

          <div class="field-group">
            <span class="field-label"
              >${this.t('hire_date_label', 'Date of Employment')}</span
            >
            <span class="field-value">${dateOfEmployment}</span>
          </div>

          <div class="field-group">
            <span class="field-label"
              >${this.t('date_of_birth', 'Date of Birth')}</span
            >
            <span class="field-value">${dateOfBirth}</span>
          </div>

          <div class="field-group">
            <span class="field-label">${this.t('phone_label', 'Phone')}</span>
            <span class="field-value">${phone}</span>
          </div>

          <div class="field-group">
            <span class="field-label">${this.t('email', 'Email')}</span>
            <span class="field-value">${email}</span>
          </div>

          <div class="field-group">
            <span class="field-label"
              >${this.t('department_label', 'Department')}</span
            >
            <span class="field-value">${department}</span>
          </div>

          <div class="field-group">
            <span class="field-label"
              >${this.t('position_label', 'Position')}</span
            >
            <span class="field-value">${getPositionDisplayName(position)}</span>
          </div>
        </div>

        <div class="card-footer">
          <button
            class="action-button edit-button"
            @click="${this._handleEdit}"
            title="${this.t('edit', 'Edit')}"
          >
            ✏️ ${this.t('edit', 'Edit')}
          </button>
          <button
            class="action-button delete-button"
            @click="${this._handleDelete}"
            title="${this.t('delete', 'Delete')}"
          >
            🗑️ ${this.t('delete', 'Delete')}
          </button>
        </div>
      </div>
    `;
  }

  _handleSelect(event) {
    this.selected = event.detail.checked;
    this.dispatchEvent(
      new CustomEvent('card-select', {
        detail: {
          employee: this.employee,
          selected: this.selected,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleEdit() {
    this.dispatchEvent(
      new CustomEvent('card-action', {
        detail: {
          action: 'edit',
          employee: this.employee,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleDelete() {
    this.dispatchEvent(
      new CustomEvent('card-action', {
        detail: {
          action: 'delete',
          employee: this.employee,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('employee-card', EmployeeCard);
