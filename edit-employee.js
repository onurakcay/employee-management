/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {Router} from '@vaadin/router';
import {ReduxConnectedLitElement} from './src/utils/redux-connected-lit-element.js';
import {updateEmployee} from './src/store/slices/employeeSlice.js';
import {t} from './src/utils/localization.js';
import {globalStyles} from './src/styles/global-styles.js';
import './src/components/index.js';

/**
 * Edit Employee page component
 *
 * @fires employee-update - Dispatched when employee is updated
 * @fires employee-cancel - Dispatched when action is cancelled
 */
export class EditEmployee extends ReduxConnectedLitElement {
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
          margin: 0 0 var(--spacing-md) 0;
        }

        .edit-info {
          background-color: var(--bg-info);
          border: 1px solid var(--border-info);
          border-radius: var(--radius-medium);
          margin-bottom: var(--spacing-lg);
          color: var(--text-info);
          font-weight: var(--font-weight-medium);
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
       * Employee ID being edited
       * @type {string}
       */
      employeeId: {type: String, state: true},

      /**
       * Employee data for the form
       * @type {Object}
       */
      employeeData: {type: Object, state: true},

      /**
       * Original employee data for comparison
       * @type {Object}
       */
      originalEmployeeData: {type: Object, state: true},

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
       * Employee not found state
       * @type {boolean}
       */
      employeeNotFound: {type: Boolean, state: true},
    };
  }

  constructor() {
    super();
    this.employeeId = '';
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
    this.originalEmployeeData = {};
    this.loading = false;
    this.errors = {};
    this.showModal = false;
    this.modalType = '';
    this.modalMessage = '';
    this.employeeNotFound = false;
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

  connectedCallback() {
    super.connectedCallback();
    this._parseUrlParams();
    this._loadEmployeeData();
  }

  mapStateToProps(state) {
    return {
      loading: state.employees.loading,
      error: state.employees.error,
      employees: state.employees.employees,
    };
  }

  _parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    this.employeeId = urlParams.get('id');
  }

  _loadEmployeeData() {
    if (!this.employeeId) {
      this.employeeNotFound = true;
      return;
    }

    if (this._currentState && this._currentState.employees) {
      const employee = this._currentState.employees.find(
        (emp) => emp.id.toString() === this.employeeId
      );
      if (employee) {
        this.employeeData = {
          ...employee,
          // Convert DD/MM/YYYY to YYYY-MM-DD for HTML date inputs
          dateOfEmployment: this._convertDateForInput(
            employee.dateOfEmployment
          ),
          dateOfBirth: this._convertDateForInput(employee.dateOfBirth),
        };
        this.originalEmployeeData = {...employee};
        this.employeeNotFound = false;
      } else {
        this.employeeNotFound = true;
      }
    }
  }

  /**
   * Convert DD/MM/YYYY date format to YYYY-MM-DD for HTML date inputs
   * @param {string} dateStr - Date in DD/MM/YYYY format
   * @returns {string} Date in YYYY-MM-DD format
   */
  _convertDateForInput(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return '';

    const parts = dateStr.split('/');
    if (parts.length !== 3) return '';

    const [day, month, year] = parts;
    // Ensure proper padding
    const paddedDay = day.padStart(2, '0');
    const paddedMonth = month.padStart(2, '0');

    return `${year}-${paddedMonth}-${paddedDay}`;
  }

  /**
   * Convert YYYY-MM-DD date format to DD/MM/YYYY for storage
   * @param {string} dateStr - Date in YYYY-MM-DD format
   * @returns {string} Date in DD/MM/YYYY format
   */
  _convertDateForStorage(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return '';

    const parts = dateStr.split('-');
    if (parts.length !== 3) return '';

    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Re-load employee data when state changes
    if (changedProperties.has('_currentState') && this._currentState) {
      this._loadEmployeeData();
    }
  }

  render() {
    if (this.employeeNotFound) {
      return html`
        <!-- Navigation Header -->
        <app-navbar
          current-page="edit"
          page-title="${this.t('edit_employee', 'Edit Employee')}"
        ></app-navbar>

        <!-- Content -->
        <div class="content">
          <h1 class="page-title">
            ${this.t('employee_not_found', 'Employee Not Found')}
          </h1>
          <div class="form-container">
            <p>
              ${this.t(
                'employee_not_found_message',
                'The employee you are trying to edit could not be found.'
              )}
            </p>
            <custom-button
              variant="primary"
              @click="${this._navigateToEmployeeList}"
            >
              ${this.t('back_to_list', 'Back to Employee List')}
            </custom-button>
          </div>
        </div>
      `;
    }

    return html`
      <!-- Navigation Header -->
      <app-navbar
        current-page="edit"
        page-title="${this.t('edit_employee', 'Edit Employee')}"
      ></app-navbar>

      <!-- Content -->
      <div class="content">
        <h1 class="page-title">
          ${this.t('edit_employee_title', 'Edit Employee')}
        </h1>

        ${this.employeeData.firstName
          ? html`
              <div class="edit-info">
                ${this.t('editing_employee_info', 'You are editing')}
                <strong
                  >${this.employeeData.firstName}
                  ${this.employeeData.lastName}</strong
                >
              </div>
            `
          : ''}

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
                ${this.t('update_employee', 'Update Employee')}
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
    this.employeeData = {
      ...this.employeeData,
      firstName: event.detail.value,
    };

    if (this.errors.firstName) {
      this.errors = {...this.errors, firstName: ''};
    }
  }

  _handleLastNameChange(event) {
    this.employeeData = {
      ...this.employeeData,
      lastName: event.detail.value,
    };

    if (this.errors.lastName) {
      this.errors = {...this.errors, lastName: ''};
    }
  }

  _handleEmploymentDateChange(event) {
    const value = event.detail?.value || event.target?.value;
    this.employeeData = {
      ...this.employeeData,
      dateOfEmployment: value,
    };
  }

  _handleBirthDateChange(event) {
    const value = event.detail?.value || event.target?.value;
    this.employeeData = {
      ...this.employeeData,
      dateOfBirth: value,
    };
  }

  _handlePhoneChange(event) {
    this.employeeData = {
      ...this.employeeData,
      phone: event.detail.value,
    };
  }

  _handleEmailChange(event) {
    this.employeeData = {
      ...this.employeeData,
      email: event.detail.value,
    };
  }

  _handleDepartmentChange(event) {
    this.employeeData = {
      ...this.employeeData,
      department: event.detail.value,
    };
  }

  _handlePositionChange(event) {
    const value = event.detail ? event.detail.value : event.target.value;
    this.employeeData = {
      ...this.employeeData,
      position: value,
    };

    if (value && this.errors.position) {
      this.errors = {...this.errors, position: ''};
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

    if (!this._validateForm()) {
      return;
    }

    this.loading = true;

    try {
      // Prepare employee data with proper date format for storage
      const employeeDataForSubmit = {
        ...this.employeeData,
        dateOfEmployment: this._convertDateForStorage(
          this.employeeData.dateOfEmployment
        ),
        dateOfBirth: this._convertDateForStorage(this.employeeData.dateOfBirth),
      };

      // Dispatch Redux action to update employee
      this.dispatchAction(
        updateEmployee({
          id: this.employeeData.id,
          updates: employeeDataForSubmit,
        })
      );

      // Show success modal
      this._showModal(
        'success',
        this.t('employee_updated', 'Employee updated successfully')
      );

      this.loading = false;
    } catch (error) {
      console.error('Employee update error:', error);
      this._showModal(
        'error',
        this.t(
          'employee_update_error',
          'Error occurred while updating employee'
        )
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
        this._navigateToEmployeeList();
      }
    } else {
      this._navigateToEmployeeList();
    }
  }

  _navigateToEmployeeList() {
    Router.go('/');
  }

  _hasUnsavedChanges() {
    return (
      JSON.stringify(this.employeeData) !==
      JSON.stringify(this.originalEmployeeData)
    );
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

customElements.define('edit-employee', EditEmployee);
