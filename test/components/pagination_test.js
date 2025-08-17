/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit';
import '../../src/components/custom-pagination.js';

suite('pagination component', () => {
  test('renders pagination controls', async () => {
    const el = await fixture(
      html`<custom-pagination .totalPages=${5}></custom-pagination>`
    );
    const pagination = el.shadowRoot.querySelector('.pagination');
    assert.exists(pagination);
  });

  test('renders nothing when totalPages is 1 or less', async () => {
    const el = await fixture(
      html`<custom-pagination .totalPages=${1}></custom-pagination>`
    );
    const pagination = el.shadowRoot.querySelector('.pagination');
    assert.isNull(pagination);
  });

  test('has previous and next buttons', async () => {
    const el = await fixture(
      html`<custom-pagination .totalPages=${5}></custom-pagination>`
    );
    const prevButton = el.shadowRoot.querySelector('.pagination-button.prev');
    const nextButton = el.shadowRoot.querySelector('.pagination-button.next');
    assert.exists(prevButton);
    assert.exists(nextButton);
  });

  test('disables previous button on first page', async () => {
    const el = await fixture(
      html`<custom-pagination 
        .currentPage=${1}
        .totalPages=${5}
      ></custom-pagination>`
    );
    const prevButton = el.shadowRoot.querySelector('.pagination-button.prev');
    assert.isTrue(prevButton.disabled);
  });

  test('disables next button on last page', async () => {
    const el = await fixture(
      html`<custom-pagination 
        .currentPage=${5}
        .totalPages=${5}
      ></custom-pagination>`
    );
    const nextButton = el.shadowRoot.querySelector('.pagination-button.next');
    assert.isTrue(nextButton.disabled);
  });

  test('shows page numbers', async () => {
    const el = await fixture(
      html`<custom-pagination .totalPages=${5}></custom-pagination>`
    );
    const pageButtons = el.shadowRoot.querySelectorAll('.pagination-button:not(.prev):not(.next)');
    assert.isAtLeast(pageButtons.length, 1);
  });

  test('highlights current page', async () => {
    const el = await fixture(
      html`<custom-pagination 
        .currentPage=${3}
        .totalPages=${5}
      ></custom-pagination>`
    );
    const activeButton = el.shadowRoot.querySelector('.pagination-button.active');
    assert.exists(activeButton);
    assert.equal(activeButton.textContent.trim(), '3');
  });

  test('emits page-change event', async () => {
    let pageChangeEventFired = false;
    const el = await fixture(
      html`<custom-pagination 
        .currentPage=${1}
        .totalPages=${5}
      ></custom-pagination>`
    );

    el.addEventListener('page-change', () => {
      pageChangeEventFired = true;
    });

    // Click the next button
    const nextButton = el.shadowRoot.querySelector('.pagination-button.next');
    nextButton.click();
    
    assert.isTrue(pageChangeEventFired);
  });

  test('can hide prev/next buttons', async () => {
    const el = await fixture(
      html`<custom-pagination 
        .totalPages=${5}
        .showPrevNext=${false}
      ></custom-pagination>`
    );
    const prevButton = el.shadowRoot.querySelector('.pagination-button.prev');
    const nextButton = el.shadowRoot.querySelector('.pagination-button.next');
    assert.isNull(prevButton);
    assert.isNull(nextButton);
  });
});
