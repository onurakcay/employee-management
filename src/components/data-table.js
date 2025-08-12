/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {LocalizedLitElement} from '../utils/localized-lit-element.js';
import {baseStyles} from '../styles/base-styles.js';
import {globalStyles} from '../styles/global-styles.js';
import './custom-checkbox.js';

/**
 * A custom data table component
 *
 * @fires row-select - Dispatched when a row is selected
 * @fires row-action - Dispatched when an action button is clicked
 * @fires sort-change - Dispatched when column sorting changes
 * @slot - Table content
 * @csspart table - The table element
 * @csspart header - The table header
 * @csspart row - Table rows
 */
export class DataTable extends LocalizedLitElement {
  static get styles() {
    return [
      globalStyles,
      baseStyles,
      css`
        :host {
          display: block;
          width: 100%;
          background: var(--bg-primary);
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-light);
          overflow: hidden;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--font-size-sm);
        }

        .table th {
          padding: var(--spacing-md) var(--spacing-sm);
          text-align: left;
          font-weight: var(--font-weight-semibold);
          color: var(--text-brand);
          border-bottom: 1px solid var(--border-color);
          white-space: nowrap;
          position: relative;
        }

        .table th.sortable {
          cursor: pointer;
          user-select: none;
        }

        .table th.sortable:hover {
          background-color: var(--color-light-gray);
        }

        .table th.sorted {
          color: var(--color-primary);
        }

        .sort-icon {
          display: inline-block;
          margin-left: var(--spacing-xs);
          font-size: var(--font-size-xs);
          opacity: 0.5;
        }

        .table th.sorted .sort-icon {
          opacity: 1;
        }

        .table td {
          padding: var(--spacing-lg) var(--spacing-sm);
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        .table tbody tr {
          transition: background-color var(--transition-fast);
        }

        .table tbody tr:hover {
          background-color: var(--bg-hover);
        }

        .table tbody tr.selected {
          background-color: var(--color-primary-alpha-5);
        }

        .checkbox-cell {
          width: 40px;
          padding: var(--spacing-sm) var(--spacing-md);
        }

        .action-cell {
          width: 100px;
          text-align: right;
          padding: var(--spacing-sm) var(--spacing-md);
        }

        .action-button {
          background: none;
          border: none;
          margin: 0 var(--spacing-xs);
          border-radius: var(--radius-medium);
          cursor: pointer;
          color: var(--text-brand);
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
        }

        .action-button:hover {
          background-color: var(--color-light-gray);
          color: var(--color-primary);
        }

        .action-button svg {
          pointer-events: none;
        }

        .action-button.edit {
          color: var(--color-primary);
        }

        .action-button.delete {
          color: var(--color-primary);
        }

        .empty-state {
          text-align: center;
          padding: var(--spacing-xxl) var(--spacing-lg);
          color: var(--text-secondary);
        }

        .loading-state {
          text-align: center;
          padding: var(--spacing-xxl) var(--spacing-lg);
          color: var(--text-secondary);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-light);
          border-top: 3px solid var(--color-primary);
          border-radius: var(--radius-round);
          animation: spin 1s linear infinite;
          margin: 0 auto var(--spacing-md);
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Table data
       * @type {Array}
       */
      data: {type: Array},

      /**
       * Table columns configuration
       * @type {Array}
       */
      columns: {type: Array},

      /**
       * Selected rows
       * @type {Array}
       */
      selectedRows: {type: Array, state: true},

      /**
       * Whether all rows are selected
       * @type {boolean}
       */
      allSelected: {type: Boolean, state: true},

      /**
       * Loading state
       * @type {boolean}
       */
      loading: {type: Boolean},

      /**
       * Sort configuration
       * @type {Object}
       */
      sortConfig: {type: Object, state: true},
    };
  }

  constructor() {
    super();
    this.data = [];
    this.columns = [];
    this.selectedRows = [];
    this.allSelected = false;
    this.loading = false;
    this.sortConfig = {column: null, direction: 'asc'};
  }

  // Icon templates using SVG
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
    if (this.loading) {
      return html`
        <div class="loading-state">
          <div class="spinner"></div>
          <div>${this.t('loading')}</div>
        </div>
      `;
    }

    if (!this.data || this.data.length === 0) {
      return html`
        <div class="empty-state">
          <div>${this.t('no_employees_found')}</div>
        </div>
      `;
    }

    return html`
      <div class="table-container">
        <table part="table" class="table">
          <thead part="header">
            <tr>
              <th class="checkbox-cell">
                <custom-checkbox
                  .checked="${this.allSelected}"
                  .indeterminate="${this.selectedRows.length > 0 &&
                  this.selectedRows.length < this.data.length}"
                  @change="${this._handleSelectAll}"
                ></custom-checkbox>
              </th>
              ${this.columns.map(
                (column) => html`
                  <th
                    class="${column.sortable ? 'sortable' : ''} ${this
                      .sortConfig.column === column.key
                      ? 'sorted'
                      : ''}"
                    @click="${column.sortable
                      ? () => this._handleSort(column.key)
                      : null}"
                  >
                    ${column.title}
                    ${column.sortable
                      ? html`
                          <span class="sort-icon">
                            ${this.sortConfig.column === column.key
                              ? this.sortConfig.direction === 'asc'
                                ? '↑'
                                : '↓'
                              : '↕'}
                          </span>
                        `
                      : ''}
                  </th>
                `
              )}
              <th class="action-cell">${this.t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${this.data.map(
              (row, index) => html`
                <tr
                  part="row"
                  class="${this.selectedRows.includes(index) ? 'selected' : ''}"
                >
                  <td class="checkbox-cell">
                    <custom-checkbox
                      .checked="${this.selectedRows.includes(index)}"
                      @change="${(e) =>
                        this._handleRowSelect(index, e.detail.checked)}"
                    ></custom-checkbox>
                  </td>
                  ${this.columns.map(
                    (column) => html`
                      <td>${this._renderCell(row, column)}</td>
                    `
                  )}
                  <td class="action-cell">
                    <button
                      class="action-button edit"
                      title="${this.t('edit')}"
                      @click="${() => this._handleAction('edit', row, index)}"
                    >
                      ${this.editIcon}
                    </button>
                    <button
                      class="action-button delete"
                      title="${this.t('delete')}"
                      @click="${() => this._handleAction('delete', row, index)}"
                    >
                      ${this.deleteIcon}
                    </button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  _renderCell(row, column) {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    return value || '';
  }

  _handleSelectAll(event) {
    const checked = event.detail.checked;
    this.allSelected = checked;
    this.selectedRows = checked ? this.data.map((_, index) => index) : [];

    this.dispatchEvent(
      new CustomEvent('row-select', {
        detail: {
          selectedRows: this.selectedRows,
          allSelected: this.allSelected,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleRowSelect(index, checked) {
    if (checked) {
      this.selectedRows = [...this.selectedRows, index];
    } else {
      this.selectedRows = this.selectedRows.filter((i) => i !== index);
    }

    this.allSelected = this.selectedRows.length === this.data.length;

    this.dispatchEvent(
      new CustomEvent('row-select', {
        detail: {
          selectedRows: this.selectedRows,
          allSelected: this.allSelected,
          rowIndex: index,
          checked,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleSort(columnKey) {
    let direction = 'asc';

    if (
      this.sortConfig.column === columnKey &&
      this.sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }

    this.sortConfig = {column: columnKey, direction};

    this.dispatchEvent(
      new CustomEvent('sort-change', {
        detail: this.sortConfig,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleAction(action, row, index) {
    this.dispatchEvent(
      new CustomEvent('row-action', {
        detail: {
          action,
          row,
          index,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('data-table', DataTable);
