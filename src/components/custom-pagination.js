/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css} from 'lit';
import {LocalizedLitElement} from '../utils/localized-lit-element.js';
import {baseStyles} from '../styles/base-styles.js';

/**
 * A custom pagination component
 *
 * @fires page-change - Dispatched when page changes
 * @csspart pagination - The pagination container
 * @csspart button - Pagination buttons
 */
export class CustomPagination extends LocalizedLitElement {
  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: block;
          margin-top: 20px;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .pagination-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid #dee2e6;
          background-color: white;
          color: #495057;
          text-decoration: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .pagination-button:hover:not(:disabled) {
          background-color: #e9ecef;
          border-color: #adb5bd;
        }

        .pagination-button:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }

        .pagination-button:disabled {
          background-color: #f8f9fa;
          color: #6c757d;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .pagination-button.active {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }

        .pagination-button.active:hover {
          background-color: var(--primary-dark);
          border-color: var(--primary-dark);
        }

        .pagination-button.prev,
        .pagination-button.next {
          width: auto;
          padding: 0 12px;
          font-size: 13px;
        }

        .pagination-info {
          margin: 0 16px;
          font-size: 14px;
          color: #6c757d;
          white-space: nowrap;
        }

        .ellipsis {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: #6c757d;
          font-weight: bold;
        }

        @media (max-width: 576px) {
          .pagination {
            gap: 2px;
          }

          .pagination-button {
            width: 32px;
            height: 32px;
            font-size: 13px;
          }

          .pagination-info {
            margin: 0 8px;
            font-size: 13px;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Current page (1-based)
       * @type {number}
       */
      currentPage: {type: Number, attribute: 'current-page'},

      /**
       * Total number of pages
       * @type {number}
       */
      totalPages: {type: Number, attribute: 'total-pages'},

      /**
       * Number of page buttons to show around current page
       * @type {number}
       */
      siblingCount: {type: Number, attribute: 'sibling-count'},

      /**
       * Whether to show previous/next buttons
       * @type {boolean}
       */
      showPrevNext: {type: Boolean, attribute: 'show-prev-next'},

      /**
       * Whether to show page info
       * @type {boolean}
       */
      showInfo: {type: Boolean, attribute: 'show-info'},

      /**
       * Total number of items
       * @type {number}
       */
      totalItems: {type: Number, attribute: 'total-items'},

      /**
       * Items per page
       * @type {number}
       */
      itemsPerPage: {type: Number, attribute: 'items-per-page'},
    };
  }

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.siblingCount = 1;
    this.showPrevNext = true;
    this.showInfo = true;
    this.totalItems = 0;
    this.itemsPerPage = 10;
  }

  render() {
    if (this.totalPages <= 1) {
      return html``;
    }

    const pages = this._generatePageNumbers();

    return html`
      <div part="pagination" class="pagination">
        ${this.showPrevNext
          ? html`
              <button
                class="pagination-button prev"
                ?disabled="${this.currentPage === 1}"
                @click="${() => this._changePage(this.currentPage - 1)}"
                part="button"
              >
                ← ${this.t('previous')}
              </button>
            `
          : ''}
        ${pages.map((page) => {
          if (page === '...') {
            return html`<span class="ellipsis">...</span>`;
          }

          return html`
            <button
              class="pagination-button ${page === this.currentPage
                ? 'active'
                : ''}"
              @click="${() => this._changePage(page)}"
              part="button"
            >
              ${page}
            </button>
          `;
        })}
        ${this.showPrevNext
          ? html`
              <button
                class="pagination-button next"
                ?disabled="${this.currentPage === this.totalPages}"
                @click="${() => this._changePage(this.currentPage + 1)}"
                part="button"
              >
                ${this.t('next')} →
              </button>
            `
          : ''}
        ${this.showInfo
          ? html` <div class="pagination-info">${this._getPageInfo()}</div> `
          : ''}
      </div>
    `;
  }

  _generatePageNumbers() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const siblingCount = this.siblingCount;

    // If total pages is less than or equal to 7, show all pages
    if (totalPages <= 7) {
      return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSibling > 2;
    const shouldShowRightDots = rightSibling < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({length: leftItemCount}, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        {length: rightItemCount},
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        {length: rightSibling - leftSibling + 1},
        (_, i) => leftSibling + i
      );
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  }

  _getPageInfo() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${this.formatNumber(start)}-${this.formatNumber(end)} ${this.t(
      'of'
    )} ${this.formatNumber(this.totalItems)}`;
  }

  _changePage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;

    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {
          currentPage: this.currentPage,
          totalPages: this.totalPages,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('custom-pagination', CustomPagination);
