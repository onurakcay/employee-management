/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {Router} from '@vaadin/router';
import {ReduxConnectedLitElement} from './src/utils/redux-connected-lit-element.js';
import {globalStyles} from './src/styles/global-styles.js';
import {t, getPositionDisplayName} from './src/utils/localization.js';
import {
  setSearchFilter,
  toggleSortDirection,
  setCurrentPage,
  setItemsPerPage,
  deleteEmployee,
  setSelectedRows,
} from './src/store/slices/employeeSlice.js';
import {
  selectPaginatedEmployees,
  selectFilters,
  selectUniqueDepartments,
  selectEmployeeLoading,
  selectEmployeeError,
  selectSorting,
  selectSelectedRows,
  selectAllFilteredEmployeeIds,
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
          gap: 2px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-medium);
          padding: 4px;
        }

        .view-button {
          padding: var(--spacing-sm);
          border: none;
          background: transparent;
          border-radius: var(--radius-small);
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .view-button svg {
          transition: all 0.2s ease;
        }

        .view-button.active {
          color: var(--color-primary);
          box-shadow: var(--shadow-small);
        }

        .view-button:hover:not(.active) {
          background-color: var(--bg-light);
          color: var(--text-primary);
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

          .view-toggle {
            display: none; /* Mobilde view toggle gizle */
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

      /**
       * Modal visibility state
       * @type {boolean}
       */
      showDeleteModal: {type: Boolean, state: true},

      /**
       * Employee to be deleted
       * @type {Object}
       */
      employeeToDelete: {type: Object, state: true},

      /**
       * Bulk delete modal visibility state
       * @type {boolean}
       */
      showBulkDeleteModal: {type: Boolean, state: true},

      /**
       * Selected employees for bulk delete
       * @type {Array}
       */
      selectedEmployeesForDelete: {type: Array, state: true},
    };
  }

  constructor() {
    super();
    // Load view mode from localStorage or default to 'list'
    this.viewMode = this._loadViewMode();
    this.showDeleteModal = false;
    this.employeeToDelete = null;
    this.showBulkDeleteModal = false;
    this.selectedEmployeesForDelete = [];

    // Mobile responsive handler
    this._handleResize = this._handleResize.bind(this);
  }

  /**
   * Load view mode from localStorage
   * @returns {string} The saved view mode or 'list' as default
   */
  _loadViewMode() {
    try {
      const savedViewMode = localStorage.getItem('employee-view-mode');
      return savedViewMode && ['list', 'grid'].includes(savedViewMode)
        ? savedViewMode
        : 'list';
    } catch (error) {
      console.warn('Error loading view mode from localStorage:', error);
      return 'list';
    }
  }

  /**
   * Save view mode to localStorage
   * @param {string} mode The view mode to save
   */
  _saveViewMode(mode) {
    try {
      localStorage.setItem('employee-view-mode', mode);
    } catch (error) {
      console.warn('Error saving view mode to localStorage:', error);
    }
  }

  /**
   * Helper method for getting translations
   */
  t(key, fallback) {
    return t(key, fallback);
  }

  connectedCallback() {
    super.connectedCallback();

    // Check if mobile and set viewMode accordingly
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.viewMode = 'grid';
      localStorage.setItem('employee-view-mode', 'grid');
    }

    // Set items per page based on the loaded view mode
    const itemsPerPage = this.viewMode === 'grid' ? 4 : 10;
    this.dispatchAction(setItemsPerPage(itemsPerPage));

    // Add resize listener
    window.addEventListener('resize', this._handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove resize listener
    window.removeEventListener('resize', this._handleResize);
  }

  _handleResize() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && this.viewMode !== 'grid') {
      this.viewMode = 'grid';
      localStorage.setItem('employee-view-mode', 'grid');
      const itemsPerPage = 4;
      this.dispatchAction(setItemsPerPage(itemsPerPage));
      this.requestUpdate();
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Check if we need to adjust current page after state changes
    if (this._currentState) {
      this._checkAndAdjustCurrentPage();
    }
  }

  mapStateToProps(state) {
    const paginatedData = selectPaginatedEmployees(state);
    return {
      paginatedEmployees: paginatedData.employees,
      filteredEmployees: paginatedData.filteredEmployees,
      allFilteredEmployeeIds: selectAllFilteredEmployeeIds(state),
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
        render: (value) => getPositionDisplayName(value),
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
                  <custom-button
                    variant="primary"
                    size="medium"
                    @button-click="${this._handleBulkDelete}"
                  >
                    ${this.t('delete_selected', 'Delete Selected')}
                  </custom-button>
                `
              : ''}
            <div class="view-toggle">
              <button
                class="view-button ${this.viewMode === 'list' ? 'active' : ''}"
                @click="${() => this._setViewMode('list')}"
                title="${this.t('list_view', 'List View')}"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 28 28"
                  fill="currentColor"
                >
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
              </button>
              <button
                class="view-button ${this.viewMode === 'grid' ? 'active' : ''}"
                @click="${() => this._setViewMode('grid')}"
                title="${this.t('card_view', 'Card View')}"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="currentColor"
                >
                  <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Data Display -->
        ${this.viewMode === 'list'
          ? html`
              <div class="table-container">
                <data-table
                  .data="${this._currentState.paginatedEmployees}"
                  .columns="${this.columns}"
                  .loading="${this._currentState.loading}"
                  .selectedRows="${this._currentState.selectedRows}"
                  .totalItemCount="${this._currentState.filteredEmployees
                    .length}"
                  .allFilteredEmployeeIds="${this._currentState
                    .allFilteredEmployeeIds}"
                  row-id-field="id"
                  @row-select="${this._handleRowSelect}"
                  @row-action="${this._handleTableAction}"
                  @sort-change="${this._handleSort}"
                ></data-table>
              </div>
            `
          : html`
              <employee-card-grid
                .employees="${this._currentState.paginatedEmployees}"
                .selectedRows="${this._currentState.selectedRows}"
                .loading="${this._currentState.loading}"
                .totalEmployees="${this._currentState.filteredEmployees.length}"
                .currentPage="${this._currentState.pagination.currentPage}"
                .itemsPerPage="${this._currentState.pagination.itemsPerPage}"
                .showSelectAll="${true}"
                .allFilteredSelected="${this._currentState.selectedRows.length >
                  0 &&
                this._currentState.allFilteredEmployeeIds.every((id) =>
                  this._currentState.selectedRows.includes(id)
                )}"
                .t="${this.t.bind(this)}"
                @card-action="${this._handleCardAction}"
                @card-select="${this._handleCardSelect}"
                @select-all="${this._handleSelectAll}"
              ></employee-card-grid>
            `}

        <!-- Pagination -->
        <custom-pagination
          .currentPage="${this._currentState.pagination.currentPage}"
          .totalPages="${this._currentState.pagination.totalPages}"
          .totalItems="${this._currentState.filteredEmployees.length}"
          .itemsPerPage="${this._currentState.pagination.itemsPerPage}"
          @page-change="${this._handlePageChange}"
        ></custom-pagination>
      </div>

      <!-- Delete Confirmation Modal -->
      <custom-modal
        ?open="${this.showDeleteModal}"
        title="${this.t('delete_employee_title', 'Are you sure?')}"
        confirm-text="${this.t('proceed', 'Proceed')}"
        cancel-text="${this.t('cancel', 'Cancel')}"
        confirm-variant="primary"
        size="medium"
        full-width-actions
        show-cancel
        @modal-confirm="${this._handleDeleteConfirm}"
        @modal-cancel="${this._handleDeleteCancel}"
        @modal-close="${this._handleDeleteCancel}"
      >
        ${this.employeeToDelete
          ? html`
              ${this.t('delete_employee_message', 'Selected Employee record')}
              ${this.employeeToDelete.firstName}
              ${this.employeeToDelete.lastName}
              ${this.t('will_be_deleted', 'will be deleted')}
            `
          : html`
              ${this.t(
                'delete_employee_message',
                'Selected Employee record will be deleted'
              )}
            `}
      </custom-modal>

      <!-- Bulk Delete Confirmation Modal -->
      <custom-modal
        ?open="${this.showBulkDeleteModal}"
        title="${this.t(
          'delete_selected_employees_title',
          'Delete Selected Employees'
        )}"
        confirm-text="${this.t('delete_all', 'Delete All')}"
        cancel-text="${this.t('cancel', 'Cancel')}"
        confirm-variant="danger"
        size="medium"
        full-width-actions
        show-cancel
        @modal-confirm="${this._handleBulkDeleteConfirm}"
        @modal-cancel="${this._handleBulkDeleteCancel}"
        @modal-close="${this._handleBulkDeleteCancel}"
      >
        <div>
          ${this.t(
            'delete_selected_employees_message',
            'The following employees will be deleted:'
          )}
        </div>
        <ul
          style="text-align: left; margin: var(--spacing-md) 0; padding-left: var(--spacing-lg);"
        >
          ${this.selectedEmployeesForDelete.map(
            (emp) => html`
              <li style="margin-bottom: var(--spacing-xs);">
                <strong>${emp.firstName} ${emp.lastName}</strong> -
                ${emp.department}
              </li>
            `
          )}
        </ul>
        <div
          style="color: var(--color-danger); font-weight: var(--font-weight-semibold);"
        >
          ${this.t('bulk_delete_warning', 'This action cannot be undone!')}
        </div>
      </custom-modal>
    `;
  }

  _setViewMode(mode) {
    this.viewMode = mode;

    // Save view mode to localStorage
    this._saveViewMode(mode);

    // Set items per page based on view mode
    const itemsPerPage = mode === 'grid' ? 4 : 10;
    this.dispatchAction(setItemsPerPage(itemsPerPage));
  }

  _handleSearch(event) {
    this.dispatchAction(setSearchFilter(event.detail.value));
  }

  _handleRowSelect(event) {
    this.dispatchAction(setSelectedRows(event.detail.selectedRows));
  }

  _handleCardAction(event) {
    // Card actions use same handler as table actions
    this._handleTableAction(event);
  }

  _handleCardSelect(event) {
    // Card selection event comes with {employee, selected} format
    // Convert it to the same format as table row selection
    const {employee, selected} = event.detail;

    let newSelectedRows;
    if (selected) {
      newSelectedRows = [...this._currentState.selectedRows, employee.id];
    } else {
      newSelectedRows = this._currentState.selectedRows.filter(
        (id) => id !== employee.id
      );
    }

    this.dispatchAction(setSelectedRows(newSelectedRows));
  }

  _handleSelectAll(event) {
    if (event.detail.checked) {
      // Select all filtered employees
      this.dispatchAction(
        setSelectedRows(this._currentState.allFilteredEmployeeIds)
      );
    } else {
      // Deselect all
      this.dispatchAction(setSelectedRows([]));
    }
  }

  _handleTableAction(event) {
    const {action, row, employee, index} = event.detail;

    // Use row for table actions, employee for card actions
    const targetEmployee = row || employee;

    if (action === 'delete') {
      // Show delete confirmation modal instead of alert
      this.employeeToDelete = targetEmployee;
      this.showDeleteModal = true;
    } else if (action === 'edit') {
      // Navigate to edit page with employee ID using Vaadin Router
      Router.go(`/employees/edit/${targetEmployee.id}`);
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
    // Note: Not clearing selection anymore since we use ID-based selection
  }

  _handleAddNew() {
    // Navigate to add employee page using Vaadin Router
    Router.go('/add');
  }

  _handleDeleteConfirm() {
    if (this.employeeToDelete) {
      this.dispatchAction(deleteEmployee(this.employeeToDelete.id));
      this._hideDeleteModal();
    }
  }

  _handleDeleteCancel() {
    this._hideDeleteModal();
  }

  _handleBulkDelete() {
    // Get selected employee data
    const selectedIds = this._currentState.selectedRows;
    const selectedEmployees = this._currentState.filteredEmployees.filter(
      (emp) => selectedIds.includes(emp.id)
    );

    this.selectedEmployeesForDelete = selectedEmployees;
    this.showBulkDeleteModal = true;
  }

  _handleBulkDeleteConfirm() {
    // Delete all selected employees
    const selectedIds = this._currentState.selectedRows;
    selectedIds.forEach((id) => {
      this.dispatchAction(deleteEmployee(id));
    });
    this._hideBulkDeleteModal();
  }

  _handleBulkDeleteCancel() {
    this._hideBulkDeleteModal();
  }

  _hideBulkDeleteModal() {
    this.showBulkDeleteModal = false;
    this.selectedEmployeesForDelete = [];
  }

  /**
   * Check if current page is empty after deletion and navigate to previous page if needed
   */
  _checkAndAdjustCurrentPage() {
    if (!this._currentState || !this._currentState.pagination) return;

    const currentPage = this._currentState.pagination.currentPage;
    const totalItems = this._currentState.filteredEmployees.length;
    const itemsPerPage = this._currentState.pagination.itemsPerPage;

    // Calculate what the total pages should be after deletion
    const newTotalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    // If current page is now beyond the total pages, go to the last valid page
    if (currentPage > newTotalPages && currentPage > 1) {
      const newPage = Math.max(1, newTotalPages);
      this.dispatchAction(setCurrentPage(newPage));
    }
  }

  _hideDeleteModal() {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }
}

customElements.define('employee-list', EmployeeList);
