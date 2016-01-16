#!/usr/bin/env node
if (process.env.NODE_ENV !== 'production') {
	if (!require('piping')({
			hook: true,
			ignore: /(\/\.|~$|\.json$)/i
		})) {
		return;
	}
}
require('../server/server.babel'); // babel registration (runtime transpilation for node)
require('../server/api');
