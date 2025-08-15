/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {fixture, assert} from '@open-wc/testing';

// Mock pagination component for testing
class MockPagination extends LitElement {
  static properties = {
    currentPage: {type: Number},
    totalPages: {type: Number},
    itemsPerPage: {type: Number},
    totalItems: {type: Number},
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.itemsPerPage = 10;
    this.totalItems = 0;
  }

  static styles = css`
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin: 2rem 0;
    }
    .pagination-info {
      margin: 0 1rem;
      font-size: 0.9rem;
      color: #666;
    }
    .pagination-button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }
    .pagination-button:hover {
      background: #f5f5f5;
    }
    .pagination-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .pagination-button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
  `;

  render() {
    return html`
      <div class="pagination">
        <button
          class="pagination-button"
          ?disabled=${this.currentPage <= 1}
          @click=${() => this._changePage(this.currentPage - 1)}
        >
          Previous
        </button>

        ${this._renderPageNumbers()}

        <button
          class="pagination-button"
          ?disabled=${this.currentPage >= this.totalPages}
          @click=${() => this._changePage(this.currentPage + 1)}
        >
          Next
        </button>

        <div class="pagination-info">${this._getPageInfo()}</div>
      </div>
    `;
  }

  _renderPageNumbers() {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(html`
        <button
          class="pagination-button ${i === this.currentPage ? 'active' : ''}"
          @click=${() => this._changePage(i)}
        >
          ${i}
        </button>
      `);
    }

    return pages;
  }

  _getPageInfo() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end} of ${this.totalItems} items`;
  }

  _changePage(page) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.dispatchEvent(
        new CustomEvent('page-change', {
          detail: {page},
          bubbles: true,
        })
      );
    }
  }
}

customElements.define('mock-pagination', MockPagination);

suite('pagination component', () => {
  test('component is defined', () => {
    const el = document.createElement('mock-pagination');
    assert.instanceOf(el, MockPagination);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<mock-pagination></mock-pagination>`);

    const buttons = el.shadowRoot.querySelectorAll('button');
    const prevButton = buttons[0];
    const nextButton = buttons[buttons.length - 1];

    // With default values (totalPages = 1), both should be disabled
    assert.isTrue(prevButton.disabled);
    assert.isTrue(nextButton.disabled);
  });

  test('renders pagination with multiple pages', async () => {
    const el = await fixture(html`
      <mock-pagination
        currentPage="2"
        totalPages="5"
        totalItems="50"
        itemsPerPage="10"
      ></mock-pagination>
    `);

    const buttons = el.shadowRoot.querySelectorAll('.pagination-button');
    const pageButtons = Array.from(buttons).slice(1, -1); // Exclude prev/next

    assert.isTrue(pageButtons.length > 0);

    // Check if current page is highlighted
    const activeButton = el.shadowRoot.querySelector(
      '.pagination-button.active'
    );
    assert.exists(activeButton);
    assert.include(activeButton.textContent, '2');
  });

  test('previous button is disabled on first page', async () => {
    const el = await fixture(html`
      <mock-pagination currentPage="1" totalPages="5"></mock-pagination>
    `);

    const prevButton = el.shadowRoot.querySelector('button');
    assert.isTrue(prevButton.disabled);
  });

  test('next button is disabled on last page', async () => {
    const el = await fixture(html`
      <mock-pagination currentPage="5" totalPages="5"></mock-pagination>
    `);

    const buttons = el.shadowRoot.querySelectorAll('button');
    const nextButton = buttons[buttons.length - 1];
    assert.isTrue(nextButton.disabled);
  });

  test('displays correct page info', async () => {
    const el = await fixture(html`
      <mock-pagination
        currentPage="2"
        totalPages="5"
        totalItems="47"
        itemsPerPage="10"
      ></mock-pagination>
    `);

    const pageInfo = el.shadowRoot.querySelector('.pagination-info');
    assert.include(pageInfo.textContent, '11-20 of 47 items');
  });

  test('dispatches page-change event when page number clicked', async () => {
    const el = await fixture(html`
      <mock-pagination currentPage="1" totalPages="5"></mock-pagination>
    `);

    let pageChangeEvent = null;
    el.addEventListener('page-change', (e) => {
      pageChangeEvent = e.detail;
    });

    // Find and click page 3 button
    const pageButtons = el.shadowRoot.querySelectorAll('.pagination-button');
    const page3Button = Array.from(pageButtons).find(
      (btn) =>
        btn.textContent.trim() === '3' &&
        !btn.textContent.includes('Previous') &&
        !btn.textContent.includes('Next')
    );

    if (page3Button) {
      page3Button.click();

      assert.exists(pageChangeEvent);
      assert.equal(pageChangeEvent.page, 3);
    }
  });

  test('dispatches page-change event when next button clicked', async () => {
    const el = await fixture(html`
      <mock-pagination currentPage="2" totalPages="5"></mock-pagination>
    `);

    let pageChangeEvent = null;
    el.addEventListener('page-change', (e) => {
      pageChangeEvent = e.detail;
    });

    const buttons = el.shadowRoot.querySelectorAll('button');
    const nextButton = buttons[buttons.length - 1];
    nextButton.click();

    assert.exists(pageChangeEvent);
    assert.equal(pageChangeEvent.page, 3);
  });

  test('dispatches page-change event when previous button clicked', async () => {
    const el = await fixture(html`
      <mock-pagination currentPage="3" totalPages="5"></mock-pagination>
    `);

    let pageChangeEvent = null;
    el.addEventListener('page-change', (e) => {
      pageChangeEvent = e.detail;
    });

    const prevButton = el.shadowRoot.querySelector('button');
    prevButton.click();

    assert.exists(pageChangeEvent);
    assert.equal(pageChangeEvent.page, 2);
  });

  test('does not dispatch event when clicking current page', async () => {
    const el = await fixture(html`
      <mock-pagination currentPage="2" totalPages="5"></mock-pagination>
    `);

    let pageChangeEvent = null;
    el.addEventListener('page-change', (e) => {
      pageChangeEvent = e.detail;
    });

    const activeButton = el.shadowRoot.querySelector(
      '.pagination-button.active'
    );
    activeButton.click();

    assert.isNull(pageChangeEvent);
  });
});
