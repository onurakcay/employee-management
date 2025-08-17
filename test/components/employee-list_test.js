/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {fixture, assert} from '@open-wc/testing';

class SimpleEmployeeList extends LitElement {
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
    .container {
      padding: 1rem;
    }
    .loading {
      text-align: center;
      padding: 2rem;
    }
    .employee-table {
      width: 100%;
      border-collapse: collapse;
    }
    .employee-table th,
    .employee-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .employee-table th {
      background-color: #f8f9fa;
      font-weight: 500;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    button {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .btn-edit {
      background-color: #007bff;
      color: white;
    }
    .btn-delete {
      background-color: #dc3545;
      color: white;
    }
  `;

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading employees...</div>`;
    }

    return html`
      <div class="container">
        <h2>Employee List</h2>
        ${this.employees.length === 0 ? 
          html`<p>No employees found.</p>` :
          html`
            <table class="employee-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${this.employees.map(employee => html`
                  <tr>
                    <td>${employee.firstName} ${employee.lastName}</td>
                    <td>${employee.email}</td>
                    <td>${employee.position}</td>
                    <td>
                      <div class="actions">
                        <button class="btn-edit" @click=${() => this._handleEdit(employee.id)}>
                          Edit
                        </button>
                        <button class="btn-delete" @click=${() => this._handleDelete(employee.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          `
        }
      </div>
    `;
  }

  _handleEdit(id) {
    this.dispatchEvent(new CustomEvent('employee-edit', {
      detail: { id },
      bubbles: true,
      composed: true
    }));
  }

  _handleDelete(id) {
    this.dispatchEvent(new CustomEvent('employee-delete', {
      detail: { id },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('simple-employee-list', SimpleEmployeeList);

suite('employee-list component', () => {
  test('renders with title', async () => {
    const el = await fixture(html`<simple-employee-list></simple-employee-list>`);
    const title = el.shadowRoot.querySelector('h2');
    assert.include(title.textContent, 'Employee List');
  });

  test('shows loading state', async () => {
    const el = await fixture(html`<simple-employee-list loading></simple-employee-list>`);
    const loading = el.shadowRoot.querySelector('.loading');
    assert.exists(loading);
    assert.include(loading.textContent, 'Loading');
  });

  test('shows empty state when no employees', async () => {
    const el = await fixture(html`<simple-employee-list></simple-employee-list>`);
    const emptyMessage = el.shadowRoot.querySelector('p');
    assert.include(emptyMessage.textContent, 'No employees found');
  });

  test('renders employee table with data', async () => {
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', position: 'Developer' }
    ];
    const el = await fixture(html`<simple-employee-list .employees=${employees}></simple-employee-list>`);
    
    const table = el.shadowRoot.querySelector('.employee-table');
    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    
    assert.exists(table);
    assert.equal(rows.length, 1);
  });

  test('has edit and delete buttons for each employee', async () => {
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', position: 'Developer' }
    ];
    const el = await fixture(html`<simple-employee-list .employees=${employees}></simple-employee-list>`);
    
    const editBtn = el.shadowRoot.querySelector('.btn-edit');
    const deleteBtn = el.shadowRoot.querySelector('.btn-delete');
    
    assert.exists(editBtn);
    assert.exists(deleteBtn);
  });

  test('emits edit event when edit button clicked', async () => {
    let editEventFired = false;
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', position: 'Developer' }
    ];
    const el = await fixture(html`<simple-employee-list .employees=${employees}></simple-employee-list>`);
    
    el.addEventListener('employee-edit', () => {
      editEventFired = true;
    });
    
    const editBtn = el.shadowRoot.querySelector('.btn-edit');
    editBtn.click();
    
    assert.isTrue(editEventFired);
  });

  test('emits delete event when delete button clicked', async () => {
    let deleteEventFired = false;
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', position: 'Developer' }
    ];
    const el = await fixture(html`<simple-employee-list .employees=${employees}></simple-employee-list>`);
    
    el.addEventListener('employee-delete', () => {
      deleteEventFired = true;
    });
    
    const deleteBtn = el.shadowRoot.querySelector('.btn-delete');
    deleteBtn.click();
    
    assert.isTrue(deleteEventFired);
  });
});
