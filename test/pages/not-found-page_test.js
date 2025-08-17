/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {fixture, assert} from '@open-wc/testing';

class SimpleNotFoundPage extends LitElement {
  static styles = css`
    .not-found {
      text-align: center;
      padding: 4rem 2rem;
      max-width: 600px;
      margin: 0 auto;
    }
    .error-code {
      font-size: 6rem;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 1rem;
      line-height: 1;
    }
    .error-message {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 1rem;
    }
    .error-description {
      color: #6c757d;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    .home-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    .home-link:hover {
      background-color: #0056b3;
    }
  `;

  render() {
    return html`
      <div class="not-found">
        <div class="error-code">404</div>
        <h1 class="error-message">Page Not Found</h1>
        <p class="error-description">
          The page you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        <a href="/employees" class="home-link">Go to Employee List</a>
      </div>
    `;
  }
}

customElements.define('simple-not-found-page', SimpleNotFoundPage);

suite('not-found-page', () => {
  test('renders 404 error code', async () => {
    const el = await fixture(html`<simple-not-found-page></simple-not-found-page>`);
    const errorCode = el.shadowRoot.querySelector('.error-code');
    assert.include(errorCode.textContent, '404');
  });

  test('renders error message', async () => {
    const el = await fixture(html`<simple-not-found-page></simple-not-found-page>`);
    const message = el.shadowRoot.querySelector('.error-message');
    assert.include(message.textContent, 'Page Not Found');
  });

  test('has description text', async () => {
    const el = await fixture(html`<simple-not-found-page></simple-not-found-page>`);
    const description = el.shadowRoot.querySelector('.error-description');
    assert.exists(description);
    assert.include(description.textContent, 'page you are looking for');
  });

  test('has link to employee list', async () => {
    const el = await fixture(html`<simple-not-found-page></simple-not-found-page>`);
    const homeLink = el.shadowRoot.querySelector('.home-link');
    assert.exists(homeLink);
    assert.equal(homeLink.getAttribute('href'), '/employees');
    assert.include(homeLink.textContent, 'Go to Employee List');
  });

  test('has proper styling classes', async () => {
    const el = await fixture(html`<simple-not-found-page></simple-not-found-page>`);
    const container = el.shadowRoot.querySelector('.not-found');
    const errorCode = el.shadowRoot.querySelector('.error-code');
    const message = el.shadowRoot.querySelector('.error-message');
    
    assert.exists(container);
    assert.exists(errorCode);
    assert.exists(message);
  });
});
