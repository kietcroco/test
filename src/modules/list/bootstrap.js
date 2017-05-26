import React from 'react';
import { TabRouter, createNavigator } from 'react-navigation';
import SlideTransitioner from '~/components/SlideTransitioner';
import { namespace } from './constants';

import MenutButton from './components/MenutButton';
import Notification from './components/Notification';

import Rivers from './scenes/Rivers.scene';
import Roads from './scenes/Roads.scene';

// đăng ký router
const routeConfiguration = {
	
	[ namespace + "/rivers" ]: { screen: Rivers },
	[ namespace + "/roads" ]: { screen: Roads }
};

// router config
const navigatorConfiguration = {

	initialRouteName: namespace + "/rivers",
	headerMode: "float",
	lazy: true,
	navigationOptions: {
		headerLeft: MenutButton,
		headerRight: Notification
	}
};

const router = TabRouter( routeConfiguration, navigatorConfiguration );

const Navigator = createNavigator( router )( SlideTransitioner );

export {
	router,
	Navigator
};