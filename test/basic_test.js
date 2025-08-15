/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {expect} from '@open-wc/testing';

suite('basic test', () => {
  test('should pass', () => {
    expect(true).to.be.true;
  });

  test('should do math', () => {
    expect(2 + 2).to.equal(4);
  });

  test('should handle strings', () => {
    const text = 'Hello World';
    expect(text).to.include('World');
  });
});
