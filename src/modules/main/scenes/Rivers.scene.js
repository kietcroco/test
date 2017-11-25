"use strict";
import React from 'react';
import MainView from '../components/MainView';

class Rivers extends React.Component {

	static displayName = "@ListRivers";
	
	render() {

		return (
			<MainView 
				{...this.props} 
				exchange = "rivers"
			/>
		);
	}
}

export default Rivers;