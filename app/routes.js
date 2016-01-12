import React from 'react';
import Route from 'react-router';

import App from './containers/App';
import List from './containers/List';

export default (
	<Route component={App}>
		<Route path="/" component={List} />
	</Route>
);
