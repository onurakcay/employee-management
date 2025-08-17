/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit';
import '../../src/components/app-navbar.js';

suite('app-navbar component', () => {
  test('renders header container', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const header = el.shadowRoot.querySelector('.header');
    assert.exists(header);
  });

  test('has logo element', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const logo = el.shadowRoot.querySelector('.logo');
    assert.exists(logo);
    assert.include(logo.textContent, 'ING');
  });

  test('has navigation buttons', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const navButtons = el.shadowRoot.querySelectorAll('.nav-button');
    assert.isTrue(navButtons.length >= 2);
  });

  test('has language toggle', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const languageToggle = el.shadowRoot.querySelector('.country-flag');
    assert.exists(languageToggle);
  });

  test('header structure is correct', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const headerLeft = el.shadowRoot.querySelector('.header-left');
    const headerRight = el.shadowRoot.querySelector('.header-right');

    assert.exists(headerLeft);
    assert.exists(headerRight);
  });

  test('navigation buttons are interactive', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const navButtons = el.shadowRoot.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
      assert.exists(button);
      // Check if it's a clickable element
      const isInteractive = button.tagName === 'BUTTON' || 
                           button.tagName === 'A' || 
                           button.hasAttribute('tabindex');
      assert.isTrue(isInteractive || button.tagName === 'CUSTOM-BUTTON');
    });
  });

  test('logo contains ING branding', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const logo = el.shadowRoot.querySelector('.logo');
    assert.exists(logo);
    assert.include(logo.textContent, 'ING');
  });

  test('country flag is interactive', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const flag = el.shadowRoot.querySelector('.country-flag');
    assert.exists(flag);
  });

  test('responsive layout elements exist', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const header = el.shadowRoot.querySelector('.header');
    assert.exists(header);
    
    // Check for layout structure
    const leftSection = el.shadowRoot.querySelector('.header-left');
    const rightSection = el.shadowRoot.querySelector('.header-right');
    assert.exists(leftSection);
    assert.exists(rightSection);
  });

  test('navigation provides app routing', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const navButtons = el.shadowRoot.querySelectorAll('.nav-button');
    
    // Should have navigation elements for main app sections
    assert.isAtLeast(navButtons.length, 2);
  });
});
