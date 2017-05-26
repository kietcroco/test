import { StackRouter, createNavigator, TabRouter, createNavigationContainer } from 'react-navigation';
import { namespace } from './constants';
import Drawer from '~/components/Drawer';
import ModuleTransitioner from '~/components/ModuleTransitioner';

import List from './list';
import Detail from './detail';

// đăng ký router
const routeConfiguration = {
	[ namespace + "/list" ]: { screen: List },
	[ namespace + "/detail" ]: { screen: Detail },
};

// config router
const navigatorConfiguration = {

	initialRouteName: namespace + "/list",
	navigationOptions: {
		
	}
};

// khởi tạo navigation main ( lớp trung gian chứa các module )
const mainRouter = StackRouter( routeConfiguration, navigatorConfiguration );
const MainNavigator = createNavigator( mainRouter )( ModuleTransitioner );

// router drawer
const router = TabRouter( 
	{
		DrawerClose: { screen: MainNavigator },
		DrawerOpen: { screen: () => null }
	},
	{
		initialRouteName: 'DrawerClose',
		lazy: true
	}
);

// navigation drawer
const Navigator = createNavigationContainer( createNavigator( router )( Drawer ) );

export {
	router,
	Navigator
};