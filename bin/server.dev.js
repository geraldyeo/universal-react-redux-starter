#!/usr/bin/env node
require('babel-register'); // babel registration (runtime transpilation for node)
require('babel-polyfill');
require('../webpack/server.dev.js');
