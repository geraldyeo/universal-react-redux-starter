#!/usr/bin/env node
require('babel-register'); // babel registration (runtime transpilation for node)
require('babel-polyfill');

if (process.env.NODE_ENV !== 'production') {
	if (!require('piping')({
			hook: true,
			ignore: /(\/\.|~$|\.json$)/i
		})) {
		return;
	}
}

require('../server/api');
