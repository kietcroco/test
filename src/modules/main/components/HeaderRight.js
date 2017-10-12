"use strict";
import React from 'react';
import { View } from 'react-native';
import Notification from './Notification';
import SwitchExchange from './SwitchExchange';
import { scale } from '~/configs/styles';

const _style = {
	flexDirection: "row",
	alignItems: "center",
	width: 80 * scale,
	justifyContent: "space-between"
};

export default props => {

	return (
		<View style={ _style }>
			<SwitchExchange { ...props }/>
			<Notification { ...props }/>
		</View>
	);
};