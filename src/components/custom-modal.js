/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {globalStyles} from '../styles/global-styles.js';

/**
 * A custom modal component
 *
 * @fires modal-confirm - Dispatched when confirm button is clicked
 * @fires modal-cancel - Dispatched when cancel button is clicked
 * @fires modal-close - Dispatched when modal is closed
 * @slot title - Modal title content
 * @slot - Modal body content
 * @slot actions - Modal action buttons (optional, defaults to confirm/cancel)
 * @csspart modal - The modal container
 * @csspart overlay - The modal overlay
 * @csspart header - The modal header
 * @csspart body - The modal body
 * @csspart footer - The modal footer
 */
export class CustomModal extends LitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: var(--z-modal, 1050);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-normal);
        }

        :host([open]) {
          opacity: 1;
          visibility: visible;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
        }

        .modal-container {
          position: relative;
          background-color: var(--bg-primary);
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-heavy);
          max-width: 400px;
          width: 90%;
          max-height: 90vh;
          overflow: hidden;
          transform: scale(0.9);
          transition: var(--transition-normal);
        }

        :host([open]) .modal-container {
          transform: scale(1);
        }

        .modal-header {
          padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color-light);
        }

        .modal-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          color: var(--color-primary);
          cursor: pointer;
          padding: 4px;
          border-radius: var(--radius-small);
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }

        .close-button:hover {
          background-color: var(--bg-secondary);
        }

        .modal-body {
          padding: var(--spacing-lg);
          color: var(--text-primary);
          font-size: var(--font-size-md);
          line-height: 1.5;
          min-height: 60px;
        }

        .modal-footer {
          padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          justify-content: flex-end;
        }

        .modal-footer custom-button {
          width: 100% !important;
          min-height: 48px;
          display: block !important;
        }

        .modal-footer custom-button button {
          width: 100% !important;
          display: block !important;
          box-sizing: border-box;
        }

        .modal-footer.centered {
          justify-content: center;
        }

        .modal-footer.full-width {
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .modal-footer.full-width custom-button {
          width: 100% !important;
          display: block !important;
          margin: 0 !important;
          flex: none !important;
        }

        .modal-footer.full-width custom-button button {
          width: 100% !important;
          display: block !important;
          box-sizing: border-box !important;
        }

        /* Animation variants */
        :host([variant='fade']) {
          transition: opacity var(--transition-normal);
        }

        :host([variant='slide-up']) .modal-container {
          transform: translateY(100px) scale(0.9);
        }

        :host([variant='slide-up'][open]) .modal-container {
          transform: translateY(0) scale(1);
        }

        /* Size variants */
        :host([size='small']) .modal-container {
          max-width: 320px;
        }

        :host([size='medium']) .modal-container {
          max-width: 400px;
        }

        :host([size='large']) .modal-container {
          max-width: 600px;
        }

        :host([size='full']) .modal-container {
          max-width: 90vw;
          max-height: 90vh;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .modal-container {
            margin: var(--spacing-md);
            width: calc(100% - 2 * var(--spacing-md));
          }

          .modal-footer.full-width-mobile {
            flex-direction: column;
          }

          .modal-footer.full-width-mobile custom-button {
            width: 100%;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Whether the modal is open
       * @type {boolean}
       */
      open: {type: Boolean, reflect: true},

      /**
       * Modal title
       * @type {string}
       */
      title: {type: String},

      /**
       * Modal size
       * @type {'small' | 'medium' | 'large' | 'full'}
       */
      size: {type: String, reflect: true},

      /**
       * Animation variant
       * @type {'fade' | 'slide-up'}
       */
      variant: {type: String, reflect: true},

      /**
       * Confirm button text
       * @type {string}
       */
      confirmText: {type: String, attribute: 'confirm-text'},

      /**
       * Cancel button text
       * @type {string}
       */
      cancelText: {type: String, attribute: 'cancel-text'},

      /**
       * Confirm button variant
       * @type {string}
       */
      confirmVariant: {type: String, attribute: 'confirm-variant'},

      /**
       * Whether to show default action buttons
       * @type {boolean}
       */
      showActions: {type: Boolean, attribute: 'show-actions'},

      /**
       * Whether to center action buttons
       * @type {boolean}
       */
      centerActions: {type: Boolean, attribute: 'center-actions'},

      /**
       * Whether action buttons should be full width
       * @type {boolean}
       */
      fullWidthActions: {type: Boolean, attribute: 'full-width-actions'},

      /**
       * Whether to show cancel button
       * @type {boolean}
       */
      showCancel: {type: Boolean, attribute: 'show-cancel'},

      /**
       * Whether to show close button in header
       * @type {boolean}
       */
      showCloseButton: {type: Boolean, attribute: 'show-close-button'},

      /**
       * Whether modal can be closed by clicking overlay
       * @type {boolean}
       */
      closeOnOverlay: {type: Boolean, attribute: 'close-on-overlay'},

      /**
       * Whether modal can be closed by pressing Escape
       * @type {boolean}
       */
      closeOnEscape: {type: Boolean, attribute: 'close-on-escape'},
    };
  }

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.size = 'medium';
    this.variant = 'fade';
    this.confirmText = 'Confirm';
    this.cancelText = 'Cancel';
    this.confirmVariant = 'primary';
    this.showActions = true;
    this.centerActions = false;
    this.fullWidthActions = false;
    this.showCancel = true;
    this.showCloseButton = true;
    this.closeOnOverlay = true;
    this.closeOnEscape = true;

    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this._handleKeyDown);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  render() {
    return html`
      <div class="modal-overlay" @click="${this._handleOverlayClick}"></div>
      <div class="modal-container" part="modal">
        ${this.title || this.showCloseButton
          ? html`
              <header class="modal-header" part="header">
                <h2 class="modal-title">
                  <slot name="title">${this.title}</slot>
                </h2>
                ${this.showCloseButton
                  ? html`
                      <button
                        class="close-button"
                        @click="${this._handleClose}"
                        aria-label="Close modal"
                      >
                        ×
                      </button>
                    `
                  : ''}
              </header>
            `
          : ''}

        <div class="modal-body" part="body">
          <slot></slot>
        </div>

        ${this.showActions
          ? html`
              <footer
                class="modal-footer ${this.centerActions
                  ? 'centered'
                  : ''} ${this.fullWidthActions ? 'full-width' : ''}"
                part="footer"
              >
                <slot name="actions">
                  <custom-button
                    variant="${this.confirmVariant === 'danger'
                      ? 'danger'
                      : this.confirmVariant === 'success'
                      ? 'success'
                      : this.confirmVariant === 'outline'
                      ? 'outline'
                      : this.confirmVariant === 'secondary'
                      ? 'secondary'
                      : this.confirmVariant === 'link'
                      ? 'link'
                      : 'primary'}"
                    @click="${this._handleConfirm}"
                    class="${this.fullWidthActions ? 'full-width' : ''}"
                  >
                    ${this.confirmText}
                  </custom-button>
                  ${this.showCancel
                    ? html`
                        <custom-button
                          variant="outline"
                          @click="${this._handleCancel}"
                          class="${this.fullWidthActions ? 'full-width' : ''}"
                        >
                          ${this.cancelText}
                        </custom-button>
                      `
                    : ''}
                </slot>
              </footer>
            `
          : ''}
      </div>
    `;
  }

  /**
   * Open the modal
   */
  show() {
    this.open = true;
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the modal
   */
  hide() {
    this.open = false;
    // Restore body scroll
    document.body.style.overflow = '';
  }

  /**
   * Toggle modal visibility
   */
  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  _handleOverlayClick(event) {
    if (
      this.closeOnOverlay &&
      event.target.classList.contains('modal-overlay')
    ) {
      this._handleClose();
    }
  }

  _handleKeyDown(event) {
    if (this.open && event.key === 'Escape') {
      this._handleClose();
    }
  }

  _handleClose() {
    this.hide();
    this.dispatchEvent(
      new CustomEvent('modal-close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleConfirm() {
    this.dispatchEvent(
      new CustomEvent('modal-confirm', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleCancel() {
    this.dispatchEvent(
      new CustomEvent('modal-cancel', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('custom-modal', CustomModal);
