"use strict";
import React from 'react';
import MainView from '../components/MainView';

class Seas extends React.Component {

	static displayName = "@ListSeas";

	render() {

		return (
			<MainView
				{...this.props}
				exchange="seas"
			/>
		);
	}
}

export default Seas;