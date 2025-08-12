/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Initialize Redux store first
import './src/store/index.js';

// Import the main app component
import './src/app.js';

// Import pages
import './employee-list.js';
import './add-employee.js';

// Export the main app component as default
export {App as default} from './src/app.js';
