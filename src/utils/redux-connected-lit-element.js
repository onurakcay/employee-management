/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LocalizedLitElement} from '../utils/localized-lit-element.js';

/**
 * Get the Redux store from global window object
 */
function getStore() {
  if (typeof window !== 'undefined' && window.__REDUX_STORE__) {
    return window.__REDUX_STORE__;
  }
  throw new Error('Redux store not found. Make sure the store is initialized.');
}

/**
 * Base class for Lit elements that need Redux state management
 * Extends LocalizedLitElement to maintain localization functionality
 */
export class ReduxConnectedLitElement extends LocalizedLitElement {
  constructor() {
    super();
    this._unsubscribe = null;
    this._currentState = null;
  }

  connectedCallback() {
    super.connectedCallback();

    const store = getStore();

    // Subscribe to store changes
    this._unsubscribe = store.subscribe(() => {
      const newState = this.mapStateToProps(store.getState());

      // Only trigger update if the mapped state has actually changed
      if (this._stateHasChanged(this._currentState, newState)) {
        this._currentState = newState;
        this.requestUpdate();
      }
    });

    // Initialize current state
    this._currentState = this.mapStateToProps(store.getState());
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Clean up subscription
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  /**
   * Override this method to map Redux state to component props
   * @param {Object} state - Redux state
   * @returns {Object} - Mapped state
   */
  mapStateToProps(state) {
    // eslint-disable-line no-unused-vars
    return {};
  }

  /**
   * Get the dispatch function for dispatching actions
   * @returns {Function} - Redux dispatch function
   */
  get dispatch() {
    return getStore().dispatch;
  }

  /**
   * Get the current Redux state
   * @returns {Object} - Current Redux state
   */
  get reduxState() {
    return getStore().getState();
  }

  /**
   * Check if the state has actually changed (shallow comparison)
   * @param {Object} oldState
   * @param {Object} newState
   * @returns {boolean}
   */
  _stateHasChanged(oldState, newState) {
    if (!oldState && !newState) return false;
    if (!oldState || !newState) return true;

    const oldKeys = Object.keys(oldState);
    const newKeys = Object.keys(newState);

    if (oldKeys.length !== newKeys.length) return true;

    return oldKeys.some((key) => oldState[key] !== newState[key]);
  }

  /**
   * Utility method to dispatch actions
   * @param {Object} action - Redux action
   */
  dispatchAction(action) {
    this.dispatch(action);
  }
}
