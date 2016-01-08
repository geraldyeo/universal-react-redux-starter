import serialize from 'serialize-javascript';
import React, {Component, PropTypes} from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';

export default class HTML extends Component {
	static propTypes = {
		assets: PropTypes.object,
		component: PropTypes.node,
		store: PropTypes.object
	}

	render () {
		const {assets, component, store} = this.props;
    	const content = component ? renderToString(component) : '';
    	const head = Helmet.rewind();

    	return (
    		<html>
    			<head>
    			</head>
    			<body>
    				<div id="root" dangerouslySetInnerHTML={{__html: content}}/>
    				
    				<script src={assets.javascript.main} charSet="UTF-8"/>
    			</body>
    		</html>
    	);
	}
}
