/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {ReduxConnectedLitElement} from './src/utils/redux-connected-lit-element.js';
import {globalStyles} from './src/styles/global-styles.js';
import {
  setSearchFilter,
  toggleSortDirection,
  setCurrentPage,
  deleteEmployee,
  setSelectedRows,
  clearSelectedRows,
} from './src/store/slices/employeeSlice.js';
import {
  selectPaginatedEmployees,
  selectFilters,
  selectUniqueDepartments,
  selectEmployeeLoading,
  selectEmployeeError,
  selectSorting,
  selectSelectedRows,
} from './src/store/selectors/employeeSelectors.js';
import './src/components/index.js';
import './src/components/data-table.js';
import './src/components/custom-pagination.js';

/**
 * Employee List Page Component
 *
 * @fires employee-action - Dispatched when employee action is performed
 */
export class EmployeeList extends ReduxConnectedLitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          display: block;
          font-family: var(--font-family-base);
          background-color: var(--bg-secondary);
          min-height: 100vh;
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
          font-size: var(--font-size-lg);
          color: var(--color-primary);
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
          font-size: var(--font-size-md);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        .employee-count {
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--spacing-lg);
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-lg);
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .page-title h1 {
          margin: 0;
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--text-brand);
        }

        .view-toggle {
          display: flex;
          gap: var(--spacing-xs);
          background-color: var(--bg-primary);
          border-radius: var(--radius-medium);
          padding: var(--spacing-xs);
          border: 1px solid var(--border-color-light);
        }

        .view-button {
          padding: var(--spacing-sm) var(--spacing-md);
          border: none;
          background: none;
          border-radius: var(--radius-small);
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          font-size: var(--font-size-sm);
        }

        .view-button.active {
          background-color: var(--color-primary);
          color: var(--text-white);
        }

        .view-button:hover:not(.active) {
          background-color: var(--bg-secondary);
        }

        .page-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .search-input {
          width: 250px;
        }

        .actions-toolbar {
          background-color: var(--bg-primary);
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-large);
          margin-bottom: var(--spacing-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: var(--shadow-light);
        }

        .selected-info {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }

        .selected-count {
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
        }

        .table-container {
          background-color: var(--bg-primary);
          border-radius: var(--radius-large);
          overflow: hidden;
          box-shadow: var(--shadow-light);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: var(--spacing-md);
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .header {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .container {
            padding: var(--spacing-md);
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-md);
          }

          .page-actions {
            width: 100%;
            justify-content: flex-end;
          }

          .search-input {
            width: 200px;
          }

          .actions-toolbar {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Selected employee rows (local state)
       * @type {Array}
       */
      selectedRows: {type: Array, state: true},

      /**
       * View mode (list or grid)
       * @type {string}
       */
      viewMode: {type: String, state: true},
    };
  }

  constructor() {
    super();
    // Local UI state only
    this.viewMode = 'list';
  }

  mapStateToProps(state) {
    const paginatedData = selectPaginatedEmployees(state);
    return {
      paginatedEmployees: paginatedData.employees,
      filteredEmployees: paginatedData.filteredEmployees,
      pagination: {
        currentPage: paginatedData.currentPage,
        totalPages: paginatedData.totalPages,
        itemsPerPage: paginatedData.itemsPerPage,
        totalItems: paginatedData.totalItems,
      },
      selectedRows: selectSelectedRows(state),
      sorting: selectSorting(state),
      filters: selectFilters(state),
      departments: selectUniqueDepartments(state),
      loading: selectEmployeeLoading(state),
      error: selectEmployeeError(state),
    };
  }

  get columns() {
    return [
      {key: 'firstName', title: this.t('first_name'), sortable: true},
      {key: 'lastName', title: this.t('last_name'), sortable: true},
      {key: 'dateOfEmployment', title: this.t('hire_date'), sortable: true},
      {
        key: 'dateOfBirth',
        title: this.t('date_of_birth'),
        sortable: true,
      },
      {key: 'phone', title: this.t('phone_label', 'Phone'), sortable: false},
      {key: 'email', title: this.t('email'), sortable: true},
      {
        key: 'department',
        title: this.t('department'),
        sortable: true,
        type: 'badge',
      },
      {
        key: 'position',
        title: this.t('position'),
        sortable: true,
        type: 'badge',
      },
    ];
  }

  render() {
    return html`
      <!-- Navigation Header -->
      <app-navbar
        current-page="employees"
        page-title="${this.t('employee_list')}"
      ></app-navbar>

      <!-- Main Content -->
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-title">
            <h1>${this.t('employee_list_title')}</h1>
          </div>
          <div class="page-actions">
            ${this._currentState.selectedRows.length > 0
              ? html`
                  <custom-button variant="primary" size="medium">
                    ${this.t('delete_selected', 'Delete Selected')}
                  </custom-button>
                `
              : ''}
            <div class="view-toggle">
              <button
                class="view-button ${this.viewMode === 'list' ? 'active' : ''}"
                @click="${() => this._setViewMode('list')}"
              >
                ☰
              </button>
              <button
                class="view-button ${this.viewMode === 'grid' ? 'active' : ''}"
                @click="${() => this._setViewMode('grid')}"
              >
                ⊞
              </button>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="table-container">
          <data-table
            .data="${this._currentState.paginatedEmployees}"
            .columns="${this.columns}"
            .loading="${this._currentState.loading}"
            @row-select="${this._handleRowSelect}"
            @row-action="${this._handleRowAction}"
            @sort-change="${this._handleSort}"
          ></data-table>
        </div>

        <!-- Pagination -->
        <custom-pagination
          .currentPage="${this._currentState.pagination.currentPage}"
          .totalPages="${this._currentState.pagination.totalPages}"
          .totalItems="${this._currentState.filteredEmployees.length}"
          .itemsPerPage="${this._currentState.pagination.itemsPerPage}"
          @page-change="${this._handlePageChange}"
        ></custom-pagination>
      </div>
    `;
  }

  _setViewMode(mode) {
    this.viewMode = mode;
  }

  _handleSearch(event) {
    this.dispatchAction(setSearchFilter(event.detail.value));
  }

  _handleRowSelect(event) {
    this.dispatchAction(setSelectedRows(event.detail.selectedRows));
  }

  _handleRowAction(event) {
    const {action, row, index} = event.detail;

    if (action === 'edit') {
      // Navigate to edit page
      window.history.pushState({}, '', `/employees/edit/${row.id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (action === 'delete') {
      if (
        confirm(
          this.t(
            'confirm_delete_employee',
            'Are you sure you want to delete this employee?'
          )
        )
      ) {
        this.dispatchAction(deleteEmployee(row.id));
      }
    }

    this.dispatchEvent(
      new CustomEvent('employee-action', {
        detail: {action, employee: row, index},
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleSort(event) {
    const {column} = event.detail;
    this.dispatchAction(toggleSortDirection(column));
  }

  _handlePageChange(event) {
    this.dispatchAction(setCurrentPage(event.detail.currentPage));
    this.dispatchAction(clearSelectedRows()); // Clear selection when changing pages
  }

  _handleAddNew() {
    // Navigate to add employee page
    window.history.pushState({}, '', '/add');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

customElements.define('employee-list', EmployeeList);
