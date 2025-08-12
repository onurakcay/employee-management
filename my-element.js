/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Initialize Redux store first
import './src/store/index.js';

// Import pages before the main app
import './employee-list.js';
import './add-employee.js';

// Import the main app component (this will register 'ing-app')
import './src/app.js';

// Export the main app component as default
export {App as default} from './src/app.js';
