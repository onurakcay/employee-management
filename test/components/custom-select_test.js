/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit';
import '../../src/components/custom-select.js';

suite('custom-select component', () => {
  test('renders select element', async () => {
    const el = await fixture(html`<custom-select></custom-select>`);
    const select = el.shadowRoot.querySelector('.select-control');
    assert.exists(select);
  });

  test('shows placeholder option', async () => {
    const el = await fixture(
      html`<custom-select placeholder="Choose option"></custom-select>`
    );
    const options = el.shadowRoot.querySelectorAll('option');
    assert.include(options[0].textContent, 'Choose option');
  });

  test('renders options from array', async () => {
    const options = [
      {value: '1', label: 'Option 1'},
      {value: '2', label: 'Option 2'},
    ];
    const el = await fixture(
      html`<custom-select .options=${options}></custom-select>`
    );
    const selectOptions = el.shadowRoot.querySelectorAll('option');
    assert.equal(selectOptions.length, 2); // 2 options
  });

  test('shows label when provided', async () => {
    const el = await fixture(
      html`<custom-select label="Position"></custom-select>`
    );
    const label = el.shadowRoot.querySelector('.select-label');
    assert.exists(label);
    assert.include(label.textContent, 'Position');
  });

  test('shows required indicator', async () => {
    const el = await fixture(
      html`<custom-select label="Position" required></custom-select>`
    );
    const label = el.shadowRoot.querySelector('.select-label.required');
    assert.exists(label);
    assert.include(label.className, 'required');
  });

  test('handles selection change', async () => {
    let changed = false;
    const options = [{value: '1', label: 'Option 1'}];
    const el = await fixture(
      html`<custom-select .options=${options}></custom-select>`
    );

    el.addEventListener('change', () => {
      changed = true;
    });

    const select = el.shadowRoot.querySelector('.select-control');
    select.value = '1';
    select.dispatchEvent(new Event('change', {bubbles: true}));

    assert.isTrue(changed);
  });

  test('disabled state works', async () => {
    const el = await fixture(html`<custom-select disabled></custom-select>`);
    const select = el.shadowRoot.querySelector('.select-control');
    assert.isTrue(select.disabled);
  });

  test('shows wrapper element', async () => {
    const el = await fixture(html`<custom-select></custom-select>`);
    const wrapper = el.shadowRoot.querySelector('.select-wrapper');
    assert.exists(wrapper);
  });

  test('shows help text when provided', async () => {
    const el = await fixture(
      html`<custom-select help-text="Select your position"></custom-select>`
    );
    const helpText = el.shadowRoot.querySelector('.help-text');
    assert.exists(helpText);
    assert.include(helpText.textContent, 'Select your position');
  });
});
