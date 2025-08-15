/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {fixture, assert} from '@open-wc/testing';

// Mock employee form component for testing
class MockEmployeeForm extends LitElement {
  static properties = {
    mode: {type: String},
    employee: {type: Object},
    loading: {type: Boolean},
  };

  constructor() {
    super();
    this.mode = 'add';
    this.employee = null;
    this.loading = false;
  }

  static styles = css`
    .employee-form {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    input,
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .primary {
      background-color: #007bff;
      color: white;
    }
    .secondary {
      background-color: #6c757d;
      color: white;
    }
  `;

  render() {
    return html`
      <div class="employee-form">
        <h2>${this.mode === 'add' ? 'Add Employee' : 'Edit Employee'}</h2>

        <form @submit=${this._handleSubmit}>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              .value=${this.employee?.firstName || ''}
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              .value=${this.employee?.lastName || ''}
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              .value=${this.employee?.email || ''}
              required
            />
          </div>

          <div class="form-group">
            <label for="department">Department</label>
            <select
              id="department"
              name="department"
              .value=${this.employee?.department || ''}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="primary" ?disabled=${this.loading}>
              ${this.loading
                ? 'Saving...'
                : this.mode === 'add'
                ? 'Add Employee'
                : 'Update Employee'}
            </button>
            <button
              type="button"
              class="secondary"
              @click=${this._handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;
  }

  _handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employee = Object.fromEntries(formData.entries());

    this.dispatchEvent(
      new CustomEvent('employee-submit', {
        detail: {employee, mode: this.mode},
        bubbles: true,
      })
    );
  }

  _handleCancel() {
    this.dispatchEvent(
      new CustomEvent('employee-cancel', {
        bubbles: true,
      })
    );
  }
}

customElements.define('mock-employee-form', MockEmployeeForm);

suite('employee-form component', () => {
  test('component is defined', () => {
    const el = document.createElement('mock-employee-form');
    assert.instanceOf(el, MockEmployeeForm);
  });

  test('renders in add mode by default', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const heading = el.shadowRoot.querySelector('h2');
    assert.include(heading.textContent, 'Add Employee');

    const submitButton = el.shadowRoot.querySelector('button[type="submit"]');
    assert.include(submitButton.textContent, 'Add Employee');
  });

  test('renders in edit mode when specified', async () => {
    const el = await fixture(
      html`<mock-employee-form mode="edit"></mock-employee-form>`
    );
    const heading = el.shadowRoot.querySelector('h2');
    assert.include(heading.textContent, 'Edit Employee');

    const submitButton = el.shadowRoot.querySelector('button[type="submit"]');
    assert.include(submitButton.textContent, 'Update Employee');
  });

  test('populates form with employee data', async () => {
    const employee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      department: 'IT',
    };

    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    el.employee = employee;
    await el.updateComplete;

    const firstNameInput = el.shadowRoot.querySelector('#firstName');
    const lastNameInput = el.shadowRoot.querySelector('#lastName');
    const emailInput = el.shadowRoot.querySelector('#email');
    const departmentSelect = el.shadowRoot.querySelector('#department');

    assert.equal(firstNameInput.value, 'John');
    assert.equal(lastNameInput.value, 'Doe');
    assert.equal(emailInput.value, 'john@example.com');
    assert.equal(departmentSelect.value, 'IT');
  });

  test('shows loading state', async () => {
    const el = await fixture(
      html`<mock-employee-form loading></mock-employee-form>`
    );
    const submitButton = el.shadowRoot.querySelector('button[type="submit"]');

    assert.isTrue(submitButton.disabled);
    assert.include(submitButton.textContent, 'Saving...');
  });

  test('dispatches submit event with form data', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);

    // Fill out form
    const firstNameInput = el.shadowRoot.querySelector('#firstName');
    const lastNameInput = el.shadowRoot.querySelector('#lastName');
    const emailInput = el.shadowRoot.querySelector('#email');
    const departmentSelect = el.shadowRoot.querySelector('#department');

    firstNameInput.value = 'Test';
    lastNameInput.value = 'User';
    emailInput.value = 'test@example.com';
    departmentSelect.value = 'IT';

    let eventDetail = null;
    el.addEventListener('employee-submit', (e) => {
      eventDetail = e.detail;
    });

    // Submit form
    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    assert.exists(eventDetail);
    assert.equal(eventDetail.mode, 'add');
    assert.equal(eventDetail.employee.firstName, 'Test');
    assert.equal(eventDetail.employee.lastName, 'User');
    assert.equal(eventDetail.employee.email, 'test@example.com');
    assert.equal(eventDetail.employee.department, 'IT');
  });

  test('dispatches cancel event', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);

    let cancelCalled = false;
    el.addEventListener('employee-cancel', () => {
      cancelCalled = true;
    });

    const cancelButton = el.shadowRoot.querySelector('button[type="button"]');
    cancelButton.click();

    assert.isTrue(cancelCalled);
  });

  test('has all required form fields', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);

    const firstNameInput = el.shadowRoot.querySelector('#firstName');
    const lastNameInput = el.shadowRoot.querySelector('#lastName');
    const emailInput = el.shadowRoot.querySelector('#email');
    const departmentSelect = el.shadowRoot.querySelector('#department');

    assert.exists(firstNameInput);
    assert.exists(lastNameInput);
    assert.exists(emailInput);
    assert.exists(departmentSelect);

    assert.isTrue(firstNameInput.required);
    assert.isTrue(lastNameInput.required);
    assert.isTrue(emailInput.required);
  });
});
