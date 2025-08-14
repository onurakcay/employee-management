/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import './employee-card.js';

/**
 * Employee Card Grid Component
 * Displays employees in a card grid layout
 *
 * @fires card-action - Dispatched when an action is performed on a card
 * @fires card-select - Dispatched when cards are selected/deselected
 * @fires select-all - Dispatched when select all is triggered
 */
export class EmployeeCardGrid extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-family);
      }

      .grid-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacing-lg);
        padding: var(--spacing-md);
        background: var(--bg-primary);
        border-radius: var(--radius-medium);
        border: 1px solid var(--border-light);
      }

      .select-all-section {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }

      .select-all-label {
        font-size: var(--font-size-sm);
        color: var(--color-dark);
        font-weight: var(--font-weight-medium);
      }

      .results-info {
        font-size: var(--font-size-sm);
        color: var(--color-gray);
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 60px;
        column-gap: 60px;
        margin-bottom: var(--spacing-xl);
        align-items: stretch;
      }

      .no-results {
        text-align: center;
        padding: var(--spacing-xxl);
        color: var(--color-gray);
        font-size: var(--font-size-lg);
        grid-column: 1 / -1;
      }

      .no-results-icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-md);
        opacity: 0.5;
      }

      .loading-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 60px;
        column-gap: 60px;
        align-items: stretch;
      }

      .loading-card {
        background: var(--bg-light);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-large);
        padding: var(--spacing-lg);
        height: 320px;
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }

      .loading-skeleton {
        background: var(--border-light);
        border-radius: var(--radius-small);
        margin-bottom: var(--spacing-sm);
      }

      .skeleton-title {
        height: 20px;
        width: 70%;
      }

      .skeleton-subtitle {
        height: 14px;
        width: 50%;
      }

      .skeleton-line {
        height: 12px;
        width: 100%;
      }

      .skeleton-line.short {
        width: 60%;
      }

      /* Responsive design */
      @media (max-width: 1024px) {
        .cards-grid,
        .loading-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .grid-header {
          flex-direction: column;
          gap: var(--spacing-sm);
          align-items: stretch;
        }

        .select-all-section {
          justify-content: center;
        }

        .results-info {
          text-align: center;
        }

        .cards-grid,
        .loading-grid {
          row-gap: var(--spacing-xl);
          column-gap: var(--spacing-xl);
        }
      }
    `;
  }

  static get properties() {
    return {
      /**
       * Array of employees to display
       * @type {Array}
       */
      employees: {type: Array},

      /**
       * Array of selected employee IDs
       * @type {Array}
       */
      selectedRows: {type: Array},

      /**
       * Whether data is loading
       * @type {boolean}
       */
      loading: {type: Boolean},

      /**
       * Total number of employees (for pagination info)
       * @type {number}
       */
      totalEmployees: {type: Number},

      /**
       * Current page number
       * @type {number}
       */
      currentPage: {type: Number},

      /**
       * Items per page
       * @type {number}
       */
      itemsPerPage: {type: Number},

      /**
       * Whether to show the select all checkbox
       * @type {boolean}
       */
      showSelectAll: {type: Boolean},

      /**
       * Whether all filtered employees are selected
       * @type {boolean}
       */
      allFilteredSelected: {type: Boolean},

      /**
       * Translation function
       * @type {Function}
       */
      t: {attribute: false},
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.selectedRows = [];
    this.loading = false;
    this.totalEmployees = 0;
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.showSelectAll = true;
    this.allFilteredSelected = false;
    this.t = (key, fallback) => fallback || key;
  }

  render() {
    if (this.loading) {
      return this._renderLoading();
    }

    if (!this.employees || this.employees.length === 0) {
      return this._renderNoResults();
    }

    return html`
      ${this.showSelectAll ? this._renderHeader() : ''}
      <div class="cards-grid">
        ${this.employees.map(
          (employee) => html`
            <employee-card
              .employee="${employee}"
              .selected="${this.selectedRows.includes(employee.id)}"
              .showCheckbox="${this.showSelectAll}"
              @card-action="${this._handleCardAction}"
              @card-select="${this._handleCardSelect}"
            ></employee-card>
          `
        )}
      </div>
    `;
  }

  _renderHeader() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endIndex = Math.min(
      startIndex + this.employees.length - 1,
      this.totalEmployees
    );

    return html`
      <div class="grid-header">
        <div class="select-all-section">
          <custom-checkbox
            .checked="${this.allFilteredSelected}"
            .indeterminate="${this.selectedRows.length > 0 &&
            !this.allFilteredSelected}"
            @change="${this._handleSelectAll}"
          ></custom-checkbox>
          <span class="select-all-label">
            ${this.t('select_all', 'Select All')}
          </span>
        </div>
        <div class="results-info">
          ${startIndex}-${endIndex} ${this.t('of', 'of')} ${this.totalEmployees}
          ${this.t('employees', 'employees')}
        </div>
      </div>
    `;
  }

  _renderLoading() {
    return html`
      <div class="loading-grid">
        ${Array(4)
          .fill(0)
          .map(
            () => html`
              <div class="loading-card">
                <div class="loading-skeleton skeleton-title"></div>
                <div class="loading-skeleton skeleton-subtitle"></div>
                <br />
                <div class="loading-skeleton skeleton-line"></div>
                <div class="loading-skeleton skeleton-line short"></div>
                <div class="loading-skeleton skeleton-line"></div>
                <div class="loading-skeleton skeleton-line short"></div>
              </div>
            `
          )}
      </div>
    `;
  }

  _renderNoResults() {
    return html`
      <div class="cards-grid">
        <div class="no-results">
          <div class="no-results-icon">👥</div>
          <div>${this.t('no_employees_found', 'No employees found')}</div>
        </div>
      </div>
    `;
  }

  _handleCardAction(event) {
    const {action, employee} = event.detail;

    // Convert card action to table action format for consistency
    this.dispatchEvent(
      new CustomEvent('card-action', {
        detail: {
          action,
          row: employee,
          employee,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleCardSelect(event) {
    const {employee, selected} = event.detail;

    let newSelectedRows;
    if (selected) {
      newSelectedRows = [...this.selectedRows, employee.id];
    } else {
      newSelectedRows = this.selectedRows.filter((id) => id !== employee.id);
    }

    this.dispatchEvent(
      new CustomEvent('card-select', {
        detail: {selectedRows: newSelectedRows},
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleSelectAll(event) {
    this.dispatchEvent(
      new CustomEvent('select-all', {
        detail: {checked: event.detail.checked},
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('employee-card-grid', EmployeeCardGrid);
