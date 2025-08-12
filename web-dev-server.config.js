/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  // Static files configuration
  rootDir: '.',
  // Serve static files from public directory
  middleware: [
    function servePublic(context, next) {
      if (context.url.startsWith('/public/')) {
        // Remove /public prefix to serve files from public directory
        context.url = context.url.replace('/public', '');
      }
      return next();
    },
  ],
  // SPA configuration - redirect all routes to index.html
  historyApiFallback: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};
