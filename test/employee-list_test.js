/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {fixture, assert} from '@open-wc/testing';

// Mock employee list component for testing
class MockEmployeeList extends LitElement {
  static properties = {
    employees: {type: Array},
    loading: {type: Boolean},
  };

  constructor() {
    super();
    this.employees = [];
    this.loading = false;
  }

  static styles = css`
    .employee-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .employee-item {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .loading {
      text-align: center;
      padding: 2rem;
    }
  `;

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading...</div>`;
    }

    return html`
      <div class="employee-list">
        ${this.employees.map(
          (employee) => html`
            <div class="employee-item">
              <h3>${employee.firstName} ${employee.lastName}</h3>
              <p>Email: ${employee.email}</p>
              <p>Department: ${employee.department}</p>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('mock-employee-list', MockEmployeeList);

suite('employee-list component', () => {
  test('component is defined', () => {
    const el = document.createElement('mock-employee-list');
    assert.instanceOf(el, MockEmployeeList);
  });

  test('renders loading state', async () => {
    const el = await fixture(
      html`<mock-employee-list loading></mock-employee-list>`
    );
    const loadingDiv = el.shadowRoot.querySelector('.loading');
    assert.exists(loadingDiv);
    assert.include(loadingDiv.textContent, 'Loading');
  });

  test('renders empty employee list', async () => {
    const el = await fixture(html`<mock-employee-list></mock-employee-list>`);
    const listDiv = el.shadowRoot.querySelector('.employee-list');
    assert.exists(listDiv);
    const items = el.shadowRoot.querySelectorAll('.employee-item');
    assert.equal(items.length, 0);
  });

  test('renders employee list with data', async () => {
    const employees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'IT',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        department: 'HR',
      },
    ];

    const el = await fixture(html`<mock-employee-list></mock-employee-list>`);
    el.employees = employees;
    await el.updateComplete;

    const items = el.shadowRoot.querySelectorAll('.employee-item');
    assert.equal(items.length, 2);

    // Check first employee
    const firstItem = items[0];
    assert.include(firstItem.textContent, 'John Doe');
    assert.include(firstItem.textContent, 'john@example.com');
    assert.include(firstItem.textContent, 'IT');
  });

  test('updates when employees property changes', async () => {
    const el = await fixture(html`<mock-employee-list></mock-employee-list>`);

    // Initially empty
    let items = el.shadowRoot.querySelectorAll('.employee-item');
    assert.equal(items.length, 0);

    // Add employees
    el.employees = [
      {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        department: 'Test',
      },
    ];
    await el.updateComplete;

    items = el.shadowRoot.querySelectorAll('.employee-item');
    assert.equal(items.length, 1);
  });
});
