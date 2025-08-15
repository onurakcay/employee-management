/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@open-wc/testing';

suite('Browser Environment Test', () => {
  test('should have browser localStorage', () => {
    assert.exists(window.localStorage);
    assert.isFunction(window.localStorage.getItem);
    assert.isFunction(window.localStorage.setItem);
    assert.isFunction(window.localStorage.removeItem);
    assert.isFunction(window.localStorage.clear);
  });

  test('should be able to use localStorage', () => {
    window.localStorage.setItem('test-key', 'test-value');
    const value = window.localStorage.getItem('test-key');
    assert.equal(value, 'test-value');

    window.localStorage.removeItem('test-key');
    const removedValue = window.localStorage.getItem('test-key');
    assert.isNull(removedValue);
  });

  test('should have browser globals', () => {
    assert.exists(window);
    assert.exists(document);
    assert.exists(navigator);
  });
});
