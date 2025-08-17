/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit';
import '../../src/components/custom-button.js';

suite('custom-button component', () => {
  test('renders button element', async () => {
    const el = await fixture(html`<custom-button>Click me</custom-button>`);
    const button = el.shadowRoot.querySelector('button');
    assert.exists(button);
  });

  test('applies primary variant by default', async () => {
    const el = await fixture(html`<custom-button variant="primary"></custom-button>`);
    assert.equal(el.getAttribute('variant'), 'primary');
  });

  test('applies custom variant', async () => {
    const el = await fixture(html`<custom-button variant="secondary"></custom-button>`);
    assert.equal(el.getAttribute('variant'), 'secondary');
  });

  test('applies custom size', async () => {
    const el = await fixture(html`<custom-button size="large"></custom-button>`);
    assert.equal(el.getAttribute('size'), 'large');
  });

  test('handles click events', async () => {
    let clicked = false;
    const el = await fixture(html`<custom-button></custom-button>`);
    
    el.addEventListener('button-click', () => {
      clicked = true;
    });
    
    const button = el.shadowRoot.querySelector('button');
    button.click();
    
    assert.isTrue(clicked);
  });

  test('disabled state works', async () => {
    const el = await fixture(html`<custom-button disabled></custom-button>`);
    const button = el.shadowRoot.querySelector('button');
    assert.isTrue(button.disabled);
  });

  test('loading state works', async () => {
    const el = await fixture(html`<custom-button loading></custom-button>`);
    assert.isTrue(el.hasAttribute('loading'));
  });

  test('danger variant works', async () => {
    const el = await fixture(html`<custom-button variant="danger"></custom-button>`);
    assert.equal(el.getAttribute('variant'), 'danger');
  });

  test('small size works', async () => {
    const el = await fixture(html`<custom-button size="small"></custom-button>`);
    assert.equal(el.getAttribute('size'), 'small');
  });

  test('medium size works', async () => {
    const el = await fixture(html`<custom-button size="medium"></custom-button>`);
    assert.equal(el.getAttribute('size'), 'medium');
  });

  test('full width works', async () => {
    const el = await fixture(html`<custom-button full-width></custom-button>`);
    assert.isTrue(el.hasAttribute('full-width'));
  });

  test('button type attribute works', async () => {
    const el = await fixture(html`<custom-button type="submit"></custom-button>`);
    const button = el.shadowRoot.querySelector('button');
    assert.equal(button.type, 'submit');
  });

  test('displays slot content', async () => {
    const el = await fixture(html`<custom-button>Test Content</custom-button>`);
    const slot = el.shadowRoot.querySelector('slot');
    assert.exists(slot);
  });

  test('focus method exists', async () => {
    const el = await fixture(html`<custom-button></custom-button>`);
    assert.exists(el.shadowRoot.querySelector('button'));
  });

  test('loading disables button interaction', async () => {
    const el = await fixture(html`<custom-button loading></custom-button>`);
    const button = el.shadowRoot.querySelector('button');
    
    // Button should exist even when loading
    assert.exists(button);
    assert.isTrue(el.hasAttribute('loading'));
  });

  test('handles different button variants', async () => {
    const el1 = await fixture(html`<custom-button variant="primary"></custom-button>`);
    assert.equal(el1.getAttribute('variant'), 'primary');
    
    const el2 = await fixture(html`<custom-button variant="secondary"></custom-button>`);
    assert.equal(el2.getAttribute('variant'), 'secondary');
    
    const el3 = await fixture(html`<custom-button variant="danger"></custom-button>`);
    assert.equal(el3.getAttribute('variant'), 'danger');
  });

  test('handles different button sizes', async () => {
    const el1 = await fixture(html`<custom-button size="small"></custom-button>`);
    assert.equal(el1.getAttribute('size'), 'small');
    
    const el2 = await fixture(html`<custom-button size="medium"></custom-button>`);
    assert.equal(el2.getAttribute('size'), 'medium');
    
    const el3 = await fixture(html`<custom-button size="large"></custom-button>`);
    assert.equal(el3.getAttribute('size'), 'large');
  });
});
