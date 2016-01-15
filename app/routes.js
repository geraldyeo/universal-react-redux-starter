import React from 'react';
import Route from 'react-router';

import App from './containers/App';
import List from './containers/List';

export default (
	<Route path="/" component={App}>
		<Route path="list" component={List}/>
	</Route>
);
