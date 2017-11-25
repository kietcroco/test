"use strict";
import React from 'react';
import MainView from '../components/MainView';

class Roads extends React.Component {

	static displayName = "@ListRoads";

	render() {

		return (
			<MainView
				{...this.props}
				exchange = "roads"
			/>
		);
	}
}

export default Roads;