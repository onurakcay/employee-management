/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {LocalizedLitElement} from './src/utils/localized-lit-element.js';
import {globalStyles} from './src/styles/global-styles.js';
import './src/components/index.js';
import './src/components/data-table.js';
import './src/components/custom-pagination.js';

/**
 * Employee List Page Component
 *
 * @fires employee-action - Dispatched when employee action is performed
 */
export class EmployeeList extends LocalizedLitElement {
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
       * Employee data
       * @type {Array}
       */
      employees: {type: Array, state: true},

      /**
       * Filtered employees
       * @type {Array}
       */
      filteredEmployees: {type: Array, state: true},

      /**
       * Selected employee rows
       * @type {Array}
       */
      selectedRows: {type: Array, state: true},

      /**
       * Current page
       * @type {number}
       */
      currentPage: {type: Number, state: true},

      /**
       * Items per page
       * @type {number}
       */
      itemsPerPage: {type: Number, state: true},

      /**
       * Search query
       * @type {string}
       */
      searchQuery: {type: String, state: true},

      /**
       * View mode (list or grid)
       * @type {string}
       */
      viewMode: {type: String, state: true},

      /**
       * Loading state
       * @type {boolean}
       */
      loading: {type: Boolean, state: true},
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.filteredEmployees = [];
    this.selectedRows = [];
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.searchQuery = '';
    this.viewMode = 'list';
    this.loading = false;

    this._initializeData();
  }

  _initializeData() {
    // Sample employee data based on the image
    this.employees = [
      {
        firstName: 'Ahmet',
        lastName: 'Sourtimes',
        dateOfEmployment: '23/09/2022',
        dateOfBirth: '23/09/2022',
        phone: '+(90) 532 123 45 67',
        email: 'ahmet@sourtimes.org',
        department: 'Analytics',
        position: 'Junior',
      },
      {
        firstName: 'Mehmet',
        lastName: 'Yılmaz',
        dateOfEmployment: '15/03/2021',
        dateOfBirth: '12/05/1995',
        phone: '+(90) 541 987 65 43',
        email: 'mehmet.yilmaz@ing.com',
        department: 'Engineering',
        position: 'Senior',
      },
      {
        firstName: 'Ayşe',
        lastName: 'Kaya',
        dateOfEmployment: '08/11/2020',
        dateOfBirth: '20/08/1988',
        phone: '+(90) 555 123 45 67',
        email: 'ayse.kaya@ing.com',
        department: 'Design',
        position: 'Lead',
      },
      {
        firstName: 'Fatma',
        lastName: 'Demir',
        dateOfEmployment: '03/07/2022',
        dateOfBirth: '14/12/1992',
        phone: '+(90) 533 456 78 90',
        email: 'fatma.demir@ing.com',
        department: 'Analytics',
        position: 'Junior',
      },
      {
        firstName: 'Ali',
        lastName: 'Özkan',
        dateOfEmployment: '29/01/2021',
        dateOfBirth: '07/03/1985',
        phone: '+(90) 542 765 43 21',
        email: 'ali.ozkan@ing.com',
        department: 'Product',
        position: 'Senior',
      },
      {
        firstName: 'Zeynep',
        lastName: 'Aksoy',
        dateOfEmployment: '17/09/2022',
        dateOfBirth: '25/11/1990',
        phone: '+(90) 534 654 32 10',
        email: 'zeynep.aksoy@ing.com',
        department: 'Marketing',
        position: 'Junior',
      },
      {
        firstName: 'Burak',
        lastName: 'Şahin',
        dateOfEmployment: '12/04/2020',
        dateOfBirth: '18/06/1987',
        phone: '+(90) 536 321 54 87',
        email: 'burak.sahin@ing.com',
        department: 'Engineering',
        position: 'Lead',
      },
      {
        firstName: 'Seda',
        lastName: 'Çelik',
        dateOfEmployment: '05/12/2021',
        dateOfBirth: '09/01/1993',
        phone: '+(90) 537 147 25 83',
        email: 'seda.celik@ing.com',
        department: 'Analytics',
        position: 'Senior',
      },
      {
        firstName: 'Emre',
        lastName: 'Koç',
        dateOfEmployment: '21/06/2022',
        dateOfBirth: '03/10/1989',
        phone: '+(90) 538 963 74 15',
        email: 'emre.koc@ing.com',
        department: 'Design',
        position: 'Junior',
      },
    ];

    this.filteredEmployees = [...this.employees];
  }

  get columns() {
    return [
      {key: 'firstName', title: this.t('first_name'), sortable: true},
      {key: 'lastName', title: this.t('last_name'), sortable: true},
      {key: 'dateOfEmployment', title: this.t('hire_date'), sortable: true},
      {
        key: 'dateOfBirth',
        title: this.t('date_of_birth', 'Date of Birth'),
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

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEmployees.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
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
            ${this.selectedRows.length > 0
              ? html`
                  <custom-button variant="danger" size="small">
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
            .data="${this.paginatedEmployees}"
            .columns="${this.columns}"
            .loading="${this.loading}"
            @row-select="${this._handleRowSelect}"
            @row-action="${this._handleRowAction}"
            @sort-change="${this._handleSort}"
          ></data-table>
        </div>

        <!-- Pagination -->
        <custom-pagination
          .currentPage="${this.currentPage}"
          .totalPages="${this.totalPages}"
          .totalItems="${this.filteredEmployees.length}"
          .itemsPerPage="${this.itemsPerPage}"
          @page-change="${this._handlePageChange}"
        ></custom-pagination>
      </div>
    `;
  }

  _setViewMode(mode) {
    this.viewMode = mode;
  }

  _handleSearch(event) {
    this.searchQuery = event.detail.value.toLowerCase();
    this.currentPage = 1;

    if (!this.searchQuery) {
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employees.filter((employee) =>
        Object.values(employee).some((value) =>
          value.toString().toLowerCase().includes(this.searchQuery)
        )
      );
    }
  }

  _handleRowSelect(event) {
    this.selectedRows = event.detail.selectedRows;
  }

  _handleRowAction(event) {
    const {action, row, index} = event.detail;

    this.dispatchEvent(
      new CustomEvent('employee-action', {
        detail: {action, employee: row, index},
        bubbles: true,
        composed: true,
      })
    );

    // Handle actions
    if (action === 'edit') {
      console.log('Edit employee:', row);
    } else if (action === 'delete') {
      console.log('Delete employee:', row);
    }
  }

  _handleSort(event) {
    const {column, direction} = event.detail;

    this.filteredEmployees.sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];

      // Handle date sorting
      if (column.includes('date') || column.includes('Date')) {
        aVal = new Date(aVal.split('/').reverse().join('-'));
        bVal = new Date(bVal.split('/').reverse().join('-'));
      }

      if (direction === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    this.requestUpdate();
  }

  _handlePageChange(event) {
    this.currentPage = event.detail.currentPage;
    this.selectedRows = []; // Clear selection when changing pages
  }

  _handleAddNew() {
    // Navigate to add employee page
    window.history.pushState({}, '', '/employees/add');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

customElements.define('employee-list', EmployeeList);
