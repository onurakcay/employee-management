/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {fixture, assert} from '@open-wc/testing';

class SimpleEmployeeFormPage extends LitElement {
  static properties = {
    mode: {type: String},
    employeeId: {type: String},
  };

  constructor() {
    super();
    this.mode = 'add';
    this.employeeId = null;
  }

  static styles = css`
    .page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .page-header {
      margin-bottom: 2rem;
    }
    .back-link {
      color: #007bff;
      text-decoration: none;
      margin-bottom: 1rem;
      display: inline-block;
    }
    .back-link:hover {
      text-decoration: underline;
    }
  `;

  render() {
    const title = this.mode === 'edit' ? 'Edit Employee' : 'Add New Employee';
    
    return html`
      <div class="page">
        <div class="page-header">
          <a href="/employees" class="back-link">← Back to Employee List</a>
          <h1>${title}</h1>
        </div>
        
        <div>Employee form would go here</div>
      </div>
    `;
  }
}

customElements.define('simple-employee-form-page', SimpleEmployeeFormPage);

suite('employee-form-page', () => {
  test('renders page with add title by default', async () => {
    const el = await fixture(html`<simple-employee-form-page></simple-employee-form-page>`);
    const title = el.shadowRoot.querySelector('h1');
    assert.include(title.textContent, 'Add New Employee');
  });

  test('renders page with edit title in edit mode', async () => {
    const el = await fixture(html`<simple-employee-form-page mode="edit"></simple-employee-form-page>`);
    const title = el.shadowRoot.querySelector('h1');
    assert.include(title.textContent, 'Edit Employee');
  });

  test('has back link to employee list', async () => {
    const el = await fixture(html`<simple-employee-form-page></simple-employee-form-page>`);
    const backLink = el.shadowRoot.querySelector('.back-link');
    assert.exists(backLink);
    assert.equal(backLink.getAttribute('href'), '/employees');
    assert.include(backLink.textContent, 'Back to Employee List');
  });

  test('shows correct content based on mode', async () => {
    const el = await fixture(html`<simple-employee-form-page mode="edit" employeeId="123"></simple-employee-form-page>`);
    assert.equal(el.mode, 'edit');
    assert.equal(el.employeeId, '123');
  });
});
