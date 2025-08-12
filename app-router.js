/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';

/**
 * Main application component with routing
 */
export class AppRouter extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Arial, sans-serif;
      }

      #outlet {
        display: block;
        width: 100%;
        min-height: 100vh;
      }
    `;
  }

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet);

    router.setRoutes([
      {
        path: '/',
        component: 'employee-list',
      },
      {
        path: '/employees',
        component: 'employee-list',
      },
      {
        path: '/add',
        component: 'add-employee',
      },
      {
        path: '/employees/edit/:id',
        component: 'edit-employee',
      },
      {
        path: '(.*)',
        component: 'not-found-view',
      },
    ]);
  }

  render() {
    return html` <div id="outlet"></div> `;
  }
}

customElements.define('app-router', AppRouter);
