import DrawerNavigator from '~/library/navigation/DrawerNavigator';
import Screen from '../modules';
import DrawerContent from '~/components/DrawerContent';

const accordionRouteConfiguration = {
	"": {screen: Screen}
};

const accordionNavigatorConfiguration = {
	initialRouteName: "",
	lazy: true,
	contentComponent: DrawerContent,
	drawerPosition: "left"
};

export default DrawerNavigator( accordionRouteConfiguration, accordionNavigatorConfiguration );