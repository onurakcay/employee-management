/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {fixture, assert} from '@open-wc/testing';

class SimpleEmployeeListPage extends LitElement {
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
    .page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .add-button {
      padding: 0.75rem 1.5rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .loading {
      text-align: center;
      padding: 3rem;
      font-size: 1.2rem;
      color: #6c757d;
    }
  `;

  render() {
    return html`
      <div class="page">
        <div class="page-header">
          <h1>Employee Management</h1>
          <a href="/employees/add" class="add-button">Add New Employee</a>
        </div>
        
        ${this.loading ? 
          html`<div class="loading">Loading employees...</div>` :
          html`<div>Employee list content would go here</div>`
        }
      </div>
    `;
  }
}

customElements.define('simple-employee-list-page', SimpleEmployeeListPage);

suite('employee-list-page', () => {
  test('renders page title', async () => {
    const el = await fixture(html`<simple-employee-list-page></simple-employee-list-page>`);
    const title = el.shadowRoot.querySelector('h1');
    assert.include(title.textContent, 'Employee Management');
  });

  test('has add employee button', async () => {
    const el = await fixture(html`<simple-employee-list-page></simple-employee-list-page>`);
    const addButton = el.shadowRoot.querySelector('.add-button');
    assert.exists(addButton);
    assert.include(addButton.textContent, 'Add New Employee');
  });

  test('shows loading state', async () => {
    const el = await fixture(html`<simple-employee-list-page loading></simple-employee-list-page>`);
    const loading = el.shadowRoot.querySelector('.loading');
    assert.exists(loading);
    assert.include(loading.textContent, 'Loading');
  });

  test('add button links to correct URL', async () => {
    const el = await fixture(html`<simple-employee-list-page></simple-employee-list-page>`);
    const addButton = el.shadowRoot.querySelector('.add-button');
    assert.equal(addButton.getAttribute('href'), '/employees/add');
  });
});
