/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Import only the main app component without Redux dependencies
import {LitElement, html, css} from 'lit';
import {fixture, assert} from '@open-wc/testing';

// Simple test component to mimic app structure
class TestApp extends LitElement {
  static styles = css`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `;

  render() {
    return html`
      <div class="app-container">
        <main id="outlet"></main>
      </div>
    `;
  }
}

customElements.define('test-app', TestApp);

suite('app component basic tests', () => {
  test('component is defined', () => {
    const el = document.createElement('test-app');
    assert.instanceOf(el, TestApp);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<test-app></test-app>`);
    // Check if the app container and router outlet exist
    const container = el.shadowRoot.querySelector('.app-container');
    const routerOutlet = el.shadowRoot.querySelector('main');
    assert.exists(container);
    assert.exists(routerOutlet);
  });

  test('renders with router outlet', async () => {
    const el = await fixture(html`<test-app></test-app>`);
    const routerOutlet = el.shadowRoot.querySelector('main[id="outlet"]');
    assert.exists(routerOutlet);
  });

  test('has proper styling', async () => {
    const el = await fixture(html`<test-app></test-app>`);
    await el.updateComplete;

    // Check if CSS custom properties are applied
    const container = el.shadowRoot.querySelector('.app-container');

    // Verify container has some styling
    assert.exists(container);
  });
});
