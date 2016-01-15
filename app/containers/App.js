import React, { Component, PropTypes } from 'react';

export default class App extends Component {
	render () {
		return (
			<div>
				<p>Hello, world!</p>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object
};
