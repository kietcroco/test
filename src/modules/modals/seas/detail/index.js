import { namespace } from './constants';

import Product from './containers/Product.container';
import VehicleHollow from './containers/VehicleHollow.container';
import VehicleOpen from './containers/VehicleOpen.container';
import Purchase from './containers/Purchase.container';
import Enterprise from './containers/Enterprise.container';
import Container from './containers/Container.container';

// đăng ký router
const routeConfiguration = {
	[ namespace + "/product" ]: { screen: Product },
	[ namespace + "/vehicle-hollow" ]: { screen: VehicleHollow },
	[ namespace + "/vehicle-open" ]: { screen: VehicleOpen },
	[ namespace + "/purchase" ]: { screen: Purchase },
	[ namespace + "/enterprise" ]: { screen: Enterprise },
	[ namespace + "/container" ]: { screen: Container }
};

export default routeConfiguration;