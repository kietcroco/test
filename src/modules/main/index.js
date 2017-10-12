/**
 * @flow
*/
import React from 'react';
import { namespace } from './constants';
import TabNavigator from '~/library/navigation/TabNavigator';
import SlideTransitioner from '~/library/navigation/components/SlideTransitioner';
import MenutButton from './components/MenutButton';
import FooterContent from './components/FooterContent';
import HeaderRight from './components/HeaderRight';

import Rivers from './containers/Rivers.container';
import Roads from './containers/Roads.container';
import Seas from './containers/Seas.container';

// đăng ký router
const routeConfiguration = {
	[ "/rivers" + namespace ]: { screen: Rivers },
	[ "/roads" + namespace ]: { screen: Roads },
	[ "/seas" + namespace ]: { screen: Seas },
};

// config router
const navigatorConfiguration = {
	//initialRouteName: "/seas" + namespace,
	//initialRouteName: "/roads" + namespace,
	initialRouteName: "/rivers" + namespace,
	initialRouteParams: {
		Exchange: "",
		//Exchange: "RIVERS_PRODUCT_OFFER"
	},
	navigationOptions: {
		headerLeft: MenutButton,
		headerRight: HeaderRight,
		footerContent: FooterContent
	},
	headerMode: "none",
	footerMode: "none",
	lazy: true
};

export default TabNavigator( routeConfiguration, navigatorConfiguration, SlideTransitioner );