/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {Router} from '@vaadin/router';
import {ReduxConnectedLitElement} from './src/utils/redux-connected-lit-element.js';
import {addEmployee, setCurrentPage} from './src/store/slices/employeeSlice.js';
import {t} from './src/utils/localization.js';
import {globalStyles} from './src/styles/global-styles.js';
import './src/components/index.js';

/**
 * Add Employee page component
 *
 * @fires employee-save - Dispatched when employee is saved
 * @fires employee-cancel - Dispatched when action is cancelled
 */
export class AddEmployee extends ReduxConnectedLitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          display: block;
          font-family: var(--font-family);
          background-color: var(--bg-secondary);
          min-height: 100vh;
          padding: 0;
        }

        .content {
          padding: var(--spacing-lg);
          max-width: 800px;
          margin: 0 auto;
        }

        .page-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          margin: 0 0 var(--spacing-xl) 0;
        }

        .form-container {
          background-color: var(--bg-primary);
          border-radius: var(--radius-large);
          padding: var(--spacing-xl);
          box-shadow: var(--shadow-medium);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }

        .form-row {
          display: contents;
        }

        .form-actions {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
          margin-top: var(--spacing-xl);
        }

        .date-input-wrapper {
          position: relative;
        }

        .date-icon {
          position: absolute;
          right: var(--spacing-sm);
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-primary);
          font-size: var(--font-size-md);
          pointer-events: none;
          z-index: 1;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .content {
            padding: var(--spacing-md);
          }

          .form-container {
            padding: var(--spacing-lg) var(--spacing-md);
          }

          .header {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .header-left,
          .header-right {
            gap: var(--spacing-sm);
          }

          .user-info span {
            display: none;
          }
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Employee data for the form
       * @type {Object}
       */
      employeeData: {type: Object, state: true},

      /**
       * Loading state
       * @type {boolean}
       */
      loading: {type: Boolean},

      /**
       * Form validation errors
       * @type {Object}
       */
      errors: {type: Object, state: true},

      /**
       * Modal visibility state
       * @type {boolean}
       */
      showModal: {type: Boolean, state: true},

      /**
       * Modal type (success, error, etc.)
       * @type {string}
       */
      modalType: {type: String, state: true},

      /**
       * Modal message
       * @type {string}
       */
      modalMessage: {type: String, state: true},

      /**
       * Edit mode - true if editing existing employee
       * @type {boolean}
       */
      isEditMode: {type: Boolean, state: true},

      /**
       * Employee ID being edited
       * @type {string|number}
       */
      editEmployeeId: {type: String, state: true},

      /**
       * Employee being edited (for display name)
       * @type {Object}
       */
      editingEmployee: {type: Object, state: true},
    };
  }

  constructor() {
    super();
    this.employeeData = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.loading = false;
    this.errors = {};
    this.showModal = false;
    this.modalType = '';
    this.modalMessage = '';
    this.isEditMode = false;
    this.editEmployeeId = null;
    this.editingEmployee = null;
  }

  /**
   * Helper method for getting translations in components
   * @param {string} key - Translation key
   * @param {string} fallback - Fallback text
   * @returns {string} Translated string
   */
  t(key, fallback) {
    return t(key, fallback);
  }

  mapStateToProps(state) {
    return {
      loading: state.employees.loading,
      error: state.employees.error,
      totalEmployees: state.employees.employees.length,
      itemsPerPage: state.employees.pagination.itemsPerPage || 10,
    };
  }

  render() {
    return html`
      <!-- Navigation Header -->
      <app-navbar
        current-page="add"
        page-title="${this.t('add_employee')}"
      ></app-navbar>

      <!-- Content -->
      <div class="content">
        <h1 class="page-title">${this.t('add_employee_title')}</h1>

        <div class="form-container">
          <form>
            <div class="form-grid">
              <!-- Row 1 -->
              <div class="form-row">
                <custom-input
                  label="${this.t('first_name_label', 'First Name')}"
                  .value="${this.employeeData.firstName}"
                  @input="${this._handleFirstNameChange}"
                  ?error="${!!this.errors.firstName}"
                  help-text="${this.errors.firstName || ''}"
                  required
                ></custom-input>

                <custom-input
                  label="${this.t('last_name_label', 'Last Name')}"
                  .value="${this.employeeData.lastName}"
                  @input="${this._handleLastNameChange}"
                  ?error="${!!this.errors.lastName}"
                  help-text="${this.errors.lastName || ''}"
                  required
                ></custom-input>

                <div class="date-input-wrapper">
                  <custom-input
                    label="${this.t('hire_date_label', 'Employment Date')}"
                    type="date"
                    .value="${this.employeeData.dateOfEmployment}"
                    @input="${this._handleEmploymentDateChange}"
                    ?error="${!!this.errors.dateOfEmployment}"
                    help-text="${this.errors.dateOfEmployment || ''}"
                    required
                  ></custom-input>
                  <div class="date-icon">📅</div>
                </div>
              </div>

              <!-- Row 2 -->
              <div class="form-row">
                <div class="date-input-wrapper">
                  <custom-input
                    label="${this.t('date_of_birth', 'Date of Birth')}"
                    type="date"
                    .value="${this.employeeData.dateOfBirth}"
                    @input="${this._handleBirthDateChange}"
                    ?error="${!!this.errors.dateOfBirth}"
                    help-text="${this.errors.dateOfBirth || ''}"
                    required
                  ></custom-input>
                  <div class="date-icon">📅</div>
                </div>

                <custom-input
                  label="${this.t('phone_label', 'Phone')}"
                  type="tel"
                  .value="${this.employeeData.phone}"
                  @input="${this._handlePhoneChange}"
                  ?error="${!!this.errors.phone}"
                  help-text="${this.errors.phone || ''}"
                  required
                ></custom-input>

                <custom-input
                  label="${this.t('email_label', 'Email')}"
                  type="email"
                  .value="${this.employeeData.email}"
                  @input="${this._handleEmailChange}"
                  ?error="${!!this.errors.email}"
                  help-text="${this.errors.email || ''}"
                  required
                ></custom-input>
              </div>

              <!-- Row 3 -->
              <div class="form-row">
                <custom-input
                  label="${this.t('department_label', 'Department')}"
                  .value="${this.employeeData.department}"
                  @input="${this._handleDepartmentChange}"
                  ?error="${!!this.errors.department}"
                  help-text="${this.errors.department || ''}"
                  required
                ></custom-input>

                <div>
                  <custom-select
                    label="${this.t('position_label', 'Position')}"
                    .value="${this.employeeData.position}"
                    @change="${this._handlePositionChange}"
                    required
                    ?error="${!!this.errors.position}"
                    help-text="${this.errors.position || ''}"
                    placeholder="${this.t('select_position', 'Please Select')}"
                    .options="${[
                      {
                        value: 'junior-developer',
                        label: this.t('junior_developer', 'Junior Developer'),
                      },
                      {
                        value: 'senior-developer',
                        label: this.t('senior_developer', 'Senior Developer'),
                      },
                      {
                        value: 'product-manager',
                        label: this.t('product_manager', 'Product Manager'),
                      },
                      {
                        value: 'ux-designer',
                        label: this.t('ux_designer', 'UX Designer'),
                      },
                      {
                        value: 'data-analyst',
                        label: this.t('data_analyst', 'Data Analyst'),
                      },
                    ]}"
                  ></custom-select>
                </div>

                <div></div>
                <!-- Empty cell for grid alignment -->
              </div>
            </div>

            <div class="form-actions">
              <custom-button
                variant="primary"
                type="button"
                .loading="${this.loading}"
                @click="${this._handleSubmit}"
                style="min-width: 120px;"
              >
                ${this.t('save_employee', 'Save Employee')}
              </custom-button>

              <custom-button
                variant="outline"
                type="button"
                @click="${this._handleCancel}"
                style="min-width: 120px;"
              >
                ${this.t('cancel', 'Cancel')}
              </custom-button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal -->
      <custom-modal
        ?open="${this.showModal}"
        title="${this.modalType === 'success'
          ? this.t('success', 'Success')
          : this.modalType === 'error'
          ? this.t('error', 'Error')
          : this.t('confirm', 'Confirm')}"
        confirm-text="${this.modalType === 'success' ||
        this.modalType === 'error'
          ? this.t('close', 'Close')
          : this.t('proceed', 'Proceed')}"
        cancel-text="${this.t('cancel', 'Cancel')}"
        confirm-variant="${this.modalType === 'error' ? 'danger' : 'primary'}"
        ?show-actions="${true}"
        full-width-actions
        @modal-confirm="${this._handleModalConfirm}"
        @modal-cancel="${this._handleModalCancel}"
        @modal-close="${this._handleModalClose}"
      >
        ${this.modalMessage}
      </custom-modal>
    `;
  }

  _handleFirstNameChange(event) {
    if (event.detail.value === undefined || event.detail.value === null) {
      return;
    }

    this.employeeData = {
      ...this.employeeData,
      firstName: event.detail.value,
    };

    // Clear error when user types
    if (this.errors.firstName) {
      this.errors = {
        ...this.errors,
        firstName: '',
      };
    }
  }

  _handleLastNameChange(event) {
    if (event.detail.value === undefined || event.detail.value === null) {
      return;
    }

    this.employeeData = {
      ...this.employeeData,
      lastName: event.detail.value,
    };

    // Clear error when user types
    if (this.errors.lastName) {
      this.errors = {
        ...this.errors,
        lastName: '',
      };
    }
  }

  _handleEmploymentDateChange(event) {
    const value = event.detail?.value || event.target?.value;
    if (value === undefined || value === null) {
      return;
    }

    this.employeeData = {
      ...this.employeeData,
      dateOfEmployment: value,
    };
  }

  _handleBirthDateChange(event) {
    const value = event.detail?.value || event.target?.value;
    if (value === undefined || value === null) {
      return;
    }

    this.employeeData = {
      ...this.employeeData,
      dateOfBirth: value,
    };
  }

  _handlePhoneChange(event) {
    if (event.detail.value === undefined || event.detail.value === null) {
      return;
    }

    this.employeeData = {
      ...this.employeeData,
      phone: event.detail.value,
    };
  }

  _handleEmailChange(event) {
    if (event.detail.value === undefined || event.detail.value === null) {
      return;
    }

    this.employeeData = {
      ...this.employeeData,
      email: event.detail.value,
    };
  }

  _handleDepartmentChange(event) {
    if (event.detail.value === undefined || event.detail.value === null) {
      return;
    }

    this.employeeData = {
      ...this.employeeData,
      department: event.detail.value,
    };
  }

  _handlePositionChange(event) {
    // Handle both native select events and custom-select events
    const value = event.detail ? event.detail.value : event.target.value;

    this.employeeData = {
      ...this.employeeData,
      position: value,
    };

    // Clear position error when user selects a value
    if (value && this.errors.position) {
      this.errors = {
        ...this.errors,
        position: '',
      };
    }
  }
  _validateForm() {
    const errors = {};

    // Required field validation
    if (
      !this.employeeData.firstName ||
      this.employeeData.firstName.trim() === ''
    ) {
      errors.firstName = this.t('required_field', 'This field is required');
    }

    if (
      !this.employeeData.lastName ||
      this.employeeData.lastName.trim() === ''
    ) {
      errors.lastName = this.t('required_field', 'This field is required');
    }

    if (
      !this.employeeData.dateOfEmployment ||
      this.employeeData.dateOfEmployment.trim() === ''
    ) {
      errors.dateOfEmployment = this.t(
        'required_field',
        'This field is required'
      );
    }

    if (
      !this.employeeData.dateOfBirth ||
      this.employeeData.dateOfBirth.trim() === ''
    ) {
      errors.dateOfBirth = this.t('required_field', 'This field is required');
    }

    if (!this.employeeData.phone || this.employeeData.phone.trim() === '') {
      errors.phone = this.t('required_field', 'This field is required');
    } else {
      // Phone validation
      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!phoneRegex.test(this.employeeData.phone)) {
        errors.phone = this.t(
          'invalid_phone',
          'Please enter a valid phone number'
        );
      }
    }

    if (!this.employeeData.email || this.employeeData.email.trim() === '') {
      errors.email = this.t('required_field', 'This field is required');
    } else {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.employeeData.email)) {
        errors.email = this.t(
          'invalid_email',
          'Please enter a valid email address'
        );
      }
    }

    if (
      !this.employeeData.department ||
      this.employeeData.department.trim() === ''
    ) {
      errors.department = this.t('required_field', 'This field is required');
    }

    if (
      !this.employeeData.position ||
      this.employeeData.position.trim() === ''
    ) {
      errors.position = this.t('required_field', 'This field is required');
    }

    // Date validation
    if (this.employeeData.dateOfBirth && this.employeeData.dateOfEmployment) {
      const birthDate = new Date(this.employeeData.dateOfBirth);
      const employmentDate = new Date(this.employeeData.dateOfEmployment);

      if (birthDate >= employmentDate) {
        errors.dateOfBirth = this.t(
          'date_birth_before_employment',
          'Date of birth must be before employment date'
        );
      }

      // Age validation (must be at least 18)
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        age < 18 ||
        (age === 18 && monthDiff < 0) ||
        (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        errors.dateOfBirth = this.t(
          'employee_min_age',
          'Employee must be at least 18 years old'
        );
      }
    }

    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  _handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    // Validate form
    if (!this._validateForm()) {
      return;
    }

    this.loading = true;

    try {
      // Generate unique ID
      const newEmployee = {
        id: Date.now(),
        ...this.employeeData,
      };

      // Dispatch Redux action to add employee
      this.dispatchAction(addEmployee(newEmployee));

      // Wait for next render cycle to ensure state is updated, then navigate
      requestAnimationFrame(() => {
        this._navigateToEmployeeListLastPage();
      });

      // Reset form
      this._resetForm();
      this.loading = false;
    } catch (error) {
      console.error('Employee save error:', error);
      // Show error modal on failure
      this._showModal(
        'error',
        this.t('employee_add_error', 'Error occurred while adding employee')
      );
      this.loading = false;
    }
  }

  _handleCancel() {
    if (this._hasUnsavedChanges()) {
      if (
        confirm(
          this.t(
            'unsaved_changes_warning',
            'You have unsaved changes. Are you sure you want to cancel?'
          )
        )
      ) {
        this._resetForm();
        this._navigateToEmployeeList();
        this.dispatchEvent(
          new CustomEvent('employee-cancel', {
            bubbles: true,
            composed: true,
          })
        );
      }
    } else {
      this._navigateToEmployeeList();
      this.dispatchEvent(
        new CustomEvent('employee-cancel', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _navigateToEmployeeListLastPage() {
    // Calculate the last page number based on current employees count
    // Use state from mapStateToProps
    if (!this._currentState) {
      console.error('State not available');
      // Fallback to normal navigation
      this._navigateToEmployeeList();
      return;
    }

    const totalEmployees = this._currentState.totalEmployees;
    const itemsPerPage = this._currentState.itemsPerPage;
    const totalPages = Math.ceil(totalEmployees / itemsPerPage);
    const lastPage = Math.max(1, totalPages);

    // Set the current page to the last page before navigating
    this.dispatchAction(setCurrentPage(lastPage));

    // Navigate to employee list using Vaadin Router
    Router.go('/');
  }

  _navigateToEmployeeList() {
    Router.go('/');
  }

  _hasUnsavedChanges() {
    return Object.values(this.employeeData).some(
      (value) => value.trim() !== ''
    );
  }

  _resetForm() {
    this.employeeData = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.errors = {};
  }

  _showModal(type, message) {
    this.modalType = type;
    this.modalMessage = message;
    this.showModal = true;
  }

  _hideModal() {
    this.showModal = false;
    this.modalType = '';
    this.modalMessage = '';
  }

  _handleModalConfirm() {
    if (this.modalType === 'success') {
      this._hideModal();
      this._navigateToEmployeeList();
    } else if (this.modalType === 'error') {
      this._hideModal();
    }
  }

  _handleModalCancel() {
    this._hideModal();
  }

  _handleModalClose() {
    this._hideModal();
    if (this.modalType === 'success') {
      this._navigateToEmployeeList();
    }
  }
}

customElements.define('add-employee', AddEmployee);
