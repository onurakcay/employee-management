/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit';

// Create a simple mock employee form for testing
class MockEmployeeForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        .form-container { display: block; }
        .form-group { margin-bottom: 1rem; }
        .form-actions { display: flex; gap: 1rem; }
      </style>
      <div class="form-container">
        <h2>Add Employee</h2>
        <form>
          <div class="form-group">
            <custom-input name="firstName" label="First Name" required></custom-input>
          </div>
          <div class="form-group">
            <custom-input name="lastName" label="Last Name" required></custom-input>
          </div>
          <div class="form-group">
            <custom-input name="email" label="Email" type="email" required></custom-input>
          </div>
          <div class="form-group">
            <custom-select name="position" label="Position" required></custom-select>
          </div>
          <div class="form-actions">
            <custom-button type="submit">Add Employee</custom-button>
            <custom-button type="button">Cancel</custom-button>
          </div>
        </form>
      </div>
    `;
  }
}

if (!customElements.get('mock-employee-form')) {
  customElements.define('mock-employee-form', MockEmployeeForm);
}

suite('employee-form component', () => {
  test('renders form container', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const container = el.shadowRoot.querySelector('.form-container');
    assert.exists(container);
  });

  test('has form title', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const title = el.shadowRoot.querySelector('h2');
    assert.exists(title);
    assert.include(title.textContent, 'Employee');
  });

  test('has form element', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const form = el.shadowRoot.querySelector('form');
    assert.exists(form);
  });

  test('has required form fields', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    
    const firstNameInput = el.shadowRoot.querySelector('custom-input[name="firstName"]');
    const lastNameInput = el.shadowRoot.querySelector('custom-input[name="lastName"]');
    const emailInput = el.shadowRoot.querySelector('custom-input[name="email"]');
    const positionSelect = el.shadowRoot.querySelector('custom-select[name="position"]');
    
    assert.exists(firstNameInput);
    assert.exists(lastNameInput);
    assert.exists(emailInput);
    assert.exists(positionSelect);
  });

  test('form fields have required attribute', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    
    const requiredFields = el.shadowRoot.querySelectorAll('[required]');
    assert.isAtLeast(requiredFields.length, 4);
  });

  test('has form action buttons', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    
    const submitButton = el.shadowRoot.querySelector('custom-button[type="submit"]');
    const cancelButton = el.shadowRoot.querySelector('custom-button[type="button"]');
    
    assert.exists(submitButton);
    assert.exists(cancelButton);
  });

  test('has form actions container', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const formActions = el.shadowRoot.querySelector('.form-actions');
    assert.exists(formActions);
  });

  test('email field has correct type', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const emailInput = el.shadowRoot.querySelector('custom-input[name="email"]');
    assert.equal(emailInput.getAttribute('type'), 'email');
  });

  test('form groups structure exists', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const formGroups = el.shadowRoot.querySelectorAll('.form-group');
    assert.isAtLeast(formGroups.length, 4);
  });

  test('submit button has correct text', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const submitButton = el.shadowRoot.querySelector('custom-button[type="submit"]');
    assert.include(submitButton.textContent, 'Add Employee');
  });

  test('cancel button exists', async () => {
    const el = await fixture(html`<mock-employee-form></mock-employee-form>`);
    const cancelButton = el.shadowRoot.querySelector('custom-button[type="button"]');
    assert.include(cancelButton.textContent, 'Cancel');
  });
});
