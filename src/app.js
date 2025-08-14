/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';
import {store} from './store/index.js'; // Initialize Redux store
import '../src/components/index.js';

/**
 * Main Application Component
 * Handles routing and global app state
 */
export class App extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .main-content {
        flex: 1;
      }
    `;
  }

  constructor() {
    super();
    // Make store globally available
    window.__REDUX_STORE__ = store;
  }

  firstUpdated() {
    // Initialize router
    const router = new Router(this.shadowRoot.querySelector('#outlet'));
    router.setRoutes([
      {path: '/', component: 'employee-list'},
      {path: '/employees', component: 'employee-list'},
      {path: '/add', component: 'add-employee'},
      {path: '/edit', component: 'edit-employee'},
      {path: '/employees/edit/:id', component: 'add-employee'},
      {path: '(.*)', redirect: '/'},
    ]);
  }

  render() {
    return html`
      <div class="app-container">
        <main class="main-content">
          <div id="outlet"></div>
        </main>
      </div>
    `;
  }
}

customElements.define('ing-app', App);
