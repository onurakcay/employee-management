/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {LocalizedLitElement} from './src/utils/localized-lit-element.js';
import './src/components/index.js';

/**
 * Add Employee page component
 *
 * @fires employee-save - Dispatched when employee is saved
 * @fires employee-cancel - Dispatched when action is cancelled
 */
export class AddEmployee extends LocalizedLitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Arial, sans-serif;
        background-color: #f5f5f5;
        min-height: 100vh;
        padding: 0;
      }

      .content {
        padding: 24px;
        max-width: 800px;
        margin: 0 auto;
      }

      .page-title {
        font-size: 24px;
        font-weight: 600;
        color: #e60026;
        margin: 0 0 32px 0;
      }

      .form-container {
        background-color: white;
        border-radius: 8px;
        padding: 32px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 24px;
        margin-bottom: 32px;
      }

      .form-row {
        display: contents;
      }

      .form-actions {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 32px;
      }

      .date-input-wrapper {
        position: relative;
      }

      .date-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #e60026;
        font-size: 16px;
        pointer-events: none;
        z-index: 1;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .form-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .content {
          padding: 16px;
        }

        .form-container {
          padding: 24px 16px;
        }

        .header {
          padding: 12px 16px;
        }

        .header-left,
        .header-right {
          gap: 12px;
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
    `;
  }

  static get properties() {
    return {
      /**
       * Employee form data
       * @type {Object}
       */
      employeeData: {type: Object, state: true},

      /**
       * Loading state
       * @type {boolean}
       */
      loading: {type: Boolean, state: true},
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
          <form @submit="${this._handleSubmit}">
            <div class="form-grid">
              <!-- Row 1 -->
              <div class="form-row">
                <custom-input
                  label="${this.t('first_name_label')}"
                  .value="${this.employeeData.firstName}"
                  @input="${this._handleFirstNameChange}"
                  required
                ></custom-input>

                <custom-input
                  label="${this.t('last_name_label')}"
                  .value="${this.employeeData.lastName}"
                  @input="${this._handleLastNameChange}"
                  required
                ></custom-input>

                <div class="date-input-wrapper">
                  <custom-input
                    label="${this.t('hire_date_label')}"
                    type="date"
                    .value="${this.employeeData.dateOfEmployment}"
                    @input="${this._handleEmploymentDateChange}"
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
                    required
                  ></custom-input>
                  <div class="date-icon">📅</div>
                </div>

                <custom-input
                  label="${this.t('phone_label')}"
                  type="tel"
                  .value="${this.employeeData.phone}"
                  @input="${this._handlePhoneChange}"
                  required
                ></custom-input>

                <custom-input
                  label="${this.t('email_label')}"
                  type="email"
                  .value="${this.employeeData.email}"
                  @input="${this._handleEmailChange}"
                  required
                ></custom-input>
              </div>

              <!-- Row 3 -->
              <div class="form-row">
                <custom-input
                  label="${this.t('department_label')}"
                  .value="${this.employeeData.department}"
                  @input="${this._handleDepartmentChange}"
                  required
                ></custom-input>

                <custom-select
                  label="${this.t('position_label')}"
                  placeholder="${this.t('select_status', 'Please Select')}"
                  .value="${this.employeeData.position}"
                  @change="${this._handlePositionChange}"
                  required
                >
                  <option value="">
                    ${this.t('select_status', 'Please Select')}
                  </option>
                  <option value="junior">${this.t('junior', 'Junior')}</option>
                  <option value="mid">
                    ${this.t('mid_level', 'Mid-Level')}
                  </option>
                  <option value="senior">${this.t('senior', 'Senior')}</option>
                  <option value="lead">${this.t('lead', 'Lead')}</option>
                  <option value="manager">
                    ${this.t('manager', 'Manager')}
                  </option>
                  <option value="director">
                    ${this.t('director', 'Director')}
                  </option>
                </custom-select>

                <div></div>
                <!-- Empty cell for grid alignment -->
              </div>
            </div>

            <div class="form-actions">
              <custom-button
                variant="primary"
                type="submit"
                .loading="${this.loading}"
                style="min-width: 120px;"
              >
                ${this.t('save')}
              </custom-button>

              <custom-button
                variant="outline"
                type="button"
                @button-click="${this._handleCancel}"
                style="min-width: 120px;"
              >
                ${this.t('cancel')}
              </custom-button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  _handleFirstNameChange(event) {
    this.employeeData = {
      ...this.employeeData,
      firstName: event.detail.value,
    };
  }

  _handleLastNameChange(event) {
    this.employeeData = {
      ...this.employeeData,
      lastName: event.detail.value,
    };
  }

  _handleEmploymentDateChange(event) {
    this.employeeData = {
      ...this.employeeData,
      dateOfEmployment: event.detail.value,
    };
  }

  _handleBirthDateChange(event) {
    this.employeeData = {
      ...this.employeeData,
      dateOfBirth: event.detail.value,
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
    this.employeeData = {
      ...this.employeeData,
      position: event.detail.value,
    };
  }

  _handleSubmit(event) {
    event.preventDefault();

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'dateOfEmployment',
      'dateOfBirth',
      'phone',
      'email',
      'department',
      'position',
    ];
    const missingFields = requiredFields.filter(
      (field) => !this.employeeData[field]
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    this.loading = true;

    // Simulate API call
    setTimeout(() => {
      this.loading = false;

      this.dispatchEvent(
        new CustomEvent('employee-save', {
          detail: this.employeeData,
          bubbles: true,
          composed: true,
        })
      );

      // Show success message
      alert('Employee saved successfully!');

      // Reset form
      this._resetForm();

      // Navigate back to employee list
      this._navigateToEmployeeList();
    }, 1000);
  }

  _handleCancel() {
    if (this._hasUnsavedChanges()) {
      if (
        confirm('You have unsaved changes. Are you sure you want to cancel?')
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

  _navigateToEmployeeList() {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
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
  }
}

customElements.define('add-employee', AddEmployee);
