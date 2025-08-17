/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit';
import '../../src/components/custom-input.js';

suite('custom-input component', () => {
  test('renders input element', async () => {
    const el = await fixture(html`<custom-input></custom-input>`);
    const input = el.shadowRoot.querySelector('.input-control');
    assert.exists(input);
  });

  test('shows label when provided', async () => {
    const el = await fixture(
      html`<custom-input label="First Name"></custom-input>`
    );
    const label = el.shadowRoot.querySelector('.input-label');
    assert.exists(label);
    assert.include(label.textContent, 'First Name');
  });

  test('shows required indicator', async () => {
    const el = await fixture(
      html`<custom-input label="First Name" required></custom-input>`
    );
    const label = el.shadowRoot.querySelector('.input-label.required');
    assert.exists(label);
    assert.include(label.className, 'required');
  });

  test('handles input events', async () => {
    let inputFired = false;
    const el = await fixture(html`<custom-input></custom-input>`);

    el.addEventListener('input', () => {
      inputFired = true;
    });

    const input = el.shadowRoot.querySelector('.input-control');
    input.value = 'test';
    input.dispatchEvent(new Event('input', {bubbles: true}));

    assert.isTrue(inputFired);
  });

  test('handles different input types', async () => {
    const el = await fixture(html`<custom-input type="email"></custom-input>`);
    const input = el.shadowRoot.querySelector('.input-control');
    assert.equal(input.type, 'email');
  });

  test('shows placeholder when provided', async () => {
    const el = await fixture(
      html`<custom-input placeholder="Enter your name"></custom-input>`
    );
    const input = el.shadowRoot.querySelector('.input-control');
    assert.equal(input.placeholder, 'Enter your name');
  });

  test('disabled state works', async () => {
    const el = await fixture(html`<custom-input disabled></custom-input>`);
    const input = el.shadowRoot.querySelector('.input-control');
    assert.isTrue(input.disabled);
  });

  test('readonly state works', async () => {
    const el = await fixture(html`<custom-input readonly></custom-input>`);
    const input = el.shadowRoot.querySelector('.input-control');
    assert.isTrue(input.readOnly);
  });

  test('shows help text when provided', async () => {
    const el = await fixture(
      html`<custom-input help-text="Enter your first name"></custom-input>`
    );
    const helpText = el.shadowRoot.querySelector('.help-text');
    assert.exists(helpText);
    assert.include(helpText.textContent, 'Enter your first name');
  });

  test('sets value property', async () => {
    const el = await fixture(html`<custom-input value="test value"></custom-input>`);
    const input = el.shadowRoot.querySelector('.input-control');
    assert.equal(input.value, 'test value');
  });

  test('has input wrapper', async () => {
    const el = await fixture(html`<custom-input></custom-input>`);
    const wrapper = el.shadowRoot.querySelector('.input-wrapper');
    assert.exists(wrapper);
  });

  test('error state works', async () => {
    const el = await fixture(html`<custom-input error></custom-input>`);
    assert.isTrue(el.hasAttribute('error'));
  });

  test('success state works', async () => {
    const el = await fixture(html`<custom-input success></custom-input>`);
    assert.isTrue(el.hasAttribute('success'));
  });

  test('handles focus and blur events', async () => {
    let focused = false;
    let blurred = false;
    const el = await fixture(html`<custom-input></custom-input>`);

    el.addEventListener('focus', () => {
      focused = true;
    });

    el.addEventListener('blur', () => {
      blurred = true;
    });

    const input = el.shadowRoot.querySelector('.input-control');
    input.dispatchEvent(new Event('focus', {bubbles: true}));
    input.dispatchEvent(new Event('blur', {bubbles: true}));

    assert.isTrue(focused);
    assert.isTrue(blurred);
  });

  test('sets name attribute', async () => {
    const el = await fixture(html`<custom-input name="testField"></custom-input>`);
    const input = el.shadowRoot.querySelector('.input-control');
    assert.equal(input.name, 'testField');
  });
});
