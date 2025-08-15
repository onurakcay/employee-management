// Mocha test configuration
import 'jsdom-global/register';

// Mock localStorage
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

// Mock window objects that might be needed
global.window = global.window || {};
global.document = global.document || {};
global.navigator = global.navigator || {};

// Set Mocha interface to TDD
import {setup} from 'mocha';
setup({
  ui: 'tdd',
});
