/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {baseStyles} from '../styles/global-styles.js';
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
    return [
      baseStyles,
      css`
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
          cursor: pointer;
        }

        .card:hover {
          box-shadow: var(--shadow-medium);
          transform: translateY(-2px);
          border-color: var(--color-primary);
        }

        .card.selected {
          border-color: #e6720b;
          box-shadow: 0 0 0 2px rgba(230, 114, 11, 0.2);
          background: rgba(230, 114, 11, 0.05);
        }

        .card-header {
          background: var(--primary-color, #2563eb);
          color: white;
          padding: 12px 16px;
          border-radius: 12px 12px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          min-height: 48px;
        }
        .employee-info {
          flex: 1;
        }

        .card-body {
          padding: 12px 16px;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .field-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .field-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          min-height: 48px;
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

        .action-button svg {
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .action-button span {
          flex: 1;
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
            padding: var(--spacing-md);
            height: auto;
            min-height: 280px;
            max-height: none;
          }

          .card-header {
            padding: var(--spacing-sm) var(--spacing-md);
            min-height: 32px;
          }

          .card-body {
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-sm);
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .field-column {
            gap: var(--spacing-sm);
          }

          .field-group {
            min-height: 32px;
            gap: 2px;
          }

          .field-label {
            font-size: 10px;
            line-height: 1.1;
          }

          .field-value {
            font-size: 12px;
            line-height: 1.2;
          }

          .field-value.name {
            font-size: 13px;
            font-weight: var(--font-weight-bold);
          }

          .card-footer {
            flex-direction: row;
            gap: var(--spacing-xs);
            padding: var(--spacing-xs) var(--spacing-md);
            margin-top: var(--spacing-xs);
          }

          .action-button {
            padding: var(--spacing-sm) var(--spacing-sm);
            font-size: 10px;
            min-width: 70px;
            min-height: 36px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .action-button svg {
            width: 12px;
            height: 12px;
          }

          .action-button span {
            display: none; /* Mobilde sadece icon göster */
          }
        }
      `,
    ];
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
    };
  }

  constructor() {
    super();
    this.employee = {};
    this.selected = false;
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

  /**
   * Edit icon template - same as data-table
   */
  get editIcon() {
    return html`
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    `;
  }

  /**
   * Delete icon template - same as data-table
   */
  get deleteIcon() {
    return html`
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="3,6 5,6 21,6" />
        <path
          d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"
        />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    `;
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
      <div
        class="card ${this.selected ? 'selected' : ''}"
        @click="${this._handleCardClick}"
      >
        <div class="card-body">
          <!-- Left Column -->
          <div class="field-column">
            <div class="field-group">
              <span class="field-label"
                >${this.t('first_name', 'First Name')}:</span
              >
              <span class="field-value name">${firstName}</span>
            </div>

            <div class="field-group">
              <span class="field-label"
                >${this.t('last_name', 'Last Name')}</span
              >
              <span class="field-value name">${lastName}</span>
            </div>

            <div class="field-group">
              <span class="field-label">${this.t('phone_label', 'Phone')}</span>
              <span class="field-value"
                >${phone || this.t('not_specified', 'Not Specified')}</span
              >
            </div>

            <div class="field-group">
              <span class="field-label">${this.t('email', 'Email')}</span>
              <span class="field-value"
                >${email || this.t('not_specified', 'Not Specified')}</span
              >
            </div>
          </div>

          <!-- Right Column -->
          <div class="field-column">
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
              <span class="field-label"
                >${this.t('department_label', 'Department')}</span
              >
              <span class="field-value">${department}</span>
            </div>

            <div class="field-group">
              <span class="field-label"
                >${this.t('position_label', 'Position')}</span
              >
              <span class="field-value"
                >${getPositionDisplayName(position)}</span
              >
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button
            class="action-button edit-button"
            @click="${this._handleEdit}"
            title="${this.t('edit', 'Edit')}"
          >
            ${this.editIcon}
            <span>${this.t('edit', 'Edit')}</span>
          </button>
          <button
            class="action-button delete-button"
            @click="${this._handleDelete}"
            title="${this.t('delete', 'Delete')}"
          >
            ${this.deleteIcon}
            <span>${this.t('delete', 'Delete')}</span>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Handle card click to toggle selection
   * @param {Event} e - Click event
   */
  _handleCardClick(e) {
    // Don't select if clicking on action buttons
    if (e.target.closest('.action-button')) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('card-select', {
        detail: {
          employee: this.employee,
          selected: !this.selected,
        },
        bubbles: true,
        composed: true,
      })
    );
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

  _handleEdit(e) {
    e.stopPropagation(); // Prevent card selection
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

  _handleDelete(e) {
    e.stopPropagation(); // Prevent card selection
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
