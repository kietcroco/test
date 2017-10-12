/**
 * @flow
*/
import React from 'react';
import StackNavigator from '~/library/navigation/StackNavigator';
import SlideTransitioner from '~/library/navigation/components/SlideTransitioner';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

import Main from './main';
import modals from './modals';

// đăng ký router
const routeConfiguration = {
	[ "/" ]: { screen: Main },
	...modals
};

// config router
const navigatorConfiguration = {

	// [HOME] --
	initialRouteName: "/",
	
	// [MEMBER] --
	//initialRouteName: "/member/contact",
	//initialRouteName: "/member/register",
	//initialRouteName: "/member/active",
	//initialRouteName: "/member/forget-password",
	//initialRouteName: "/member/forgot-password",
	//initialRouteName: "/member/change-password",
	//initialRouteName: "/member/login",
	//initialRouteName: "/member/profile",
	//initialRouteName: "/member/update-profile",

	// [ĐƯỜNG SÔNG] -- 
	//initialRouteName: "/rivers/handle/vehicle-hollow",
	//initialRouteName: "/rivers/handle/product",
	//initialRouteName: "/rivers/handle/vehicle-open",
	//initialRouteName: "/rivers/handle/purchase",
	//initialRouteName: "/rivers/handle/bidding",
	//initialRouteName: "/rivers/handle/enterprise",

	// [ĐƯỜNG BỘ] -- 
	//initialRouteName: "/roads/handle/vehicle-hollow",
	//initialRouteName: "/roads/handle/vehicle-open",
	//initialRouteName: "/roads/handle/purchase",
	//initialRouteName: "/roads/handle/container",
	//initialRouteName: "/roads/handle/product",
	//initialRouteName: "/roads/handle/enterprise",

	// [ĐƯỜNG BIỂN] --
	//initialRouteName: "/seas/handle/product",
	//initialRouteName: "/seas/handle/container",
	//initialRouteName: "/seas/handle/vehicle-open",
	//initialRouteName: "/seas/handle/vehicle-hollow",
	//initialRouteName: "/seas/handle/purchase",
	//initialRouteName: "/seas/handle/enterprise",
	initialRouteParams: {
		Exchange: "",
	//	id: 6781,
		//source: {},
		//account_mobile: "0965544750"
	},
	navigationOptions: {
		header: Header,
		footer: Footer
	},
	headerMode: "float",
	footerMode: "float",
	lazy: true
};

export default StackNavigator( routeConfiguration, navigatorConfiguration, SlideTransitioner );