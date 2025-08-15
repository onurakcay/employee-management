/**
 * @license
 * Copyright 2  ],
  // SPA configuration - redirect all routes to index.html
  historyApiFallback: true,
  // Middleware to handle SPA routing
  middleware: [
    function servePublic(context, next) {
      // Serve files from public directory when requested without /public prefix
      if (
        context.url.startsWith('/images/') ||
        context.url.startsWith('/assets/')
      ) {
        context.url = '/public' + context.url;
      }
      return next();
    },
    function spaFallback(context, next) {
      // If it's not a file request (no extension or .js/.css etc) and not API
      if (
        !context.url.includes('.') && 
        !context.url.startsWith('/api/') &&
        context.method === 'GET'
      ) {
        // Serve index.html for client-side routing
        context.url = '/index.html';
      }
      return next();
    },
  ],* SPDX-License-Identifier: BSD-3-Clause
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
  // SPA fallback configuration
  appIndex: 'index.html',
  historyApiFallback: true,
  // Serve static files from public directory
  middleware: [
    function servePublic(context, next) {
      // Serve files from public directory when requested without /public prefix
      if (
        context.url.startsWith('/images/') ||
        context.url.startsWith('/assets/')
      ) {
        context.url = '/public' + context.url;
      }
      return next();
    },
  ],
  // SPA configuration - redirect all routes to index.html
  historyApiFallback: {
    index: '/index.html',
    disableDotRule: true,
    rewrites: [
      // Static files should not be rewritten
      {
        from: /^\/public\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        },
      },
      {from: /^\/my-element\.js$/, to: '/my-element.js'},
      {from: /^\/my-element\.bundled\.js$/, to: '/my-element.bundled.js'},
      // All other routes should go to index.html
      {from: /^\/.*$/, to: '/index.html'},
    ],
  },
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};
