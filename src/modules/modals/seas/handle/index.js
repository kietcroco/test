import { namespace } from './constants';

import Product from './containers/Product.container';
import Container from './containers/Container.container';
import VehicleHollow from './containers/VehicleHollow.container';
import VehicleOpen from './containers/VehicleOpen.container';
import Purchase from './containers/Purchase.container';
import Enterprise from './containers/Enterprise.container';

// đăng ký router
const routeConfiguration = {
	[ namespace + "/product" ]: { screen: Product },
	[ namespace + "/container" ]: { screen: Container },
	[ namespace + "/vehicle-hollow" ]: { screen: VehicleHollow },
	[ namespace + "/vehicle-open" ]: { screen: VehicleOpen },
	[ namespace + "/purchase" ]: { screen: Purchase },
	[ namespace + "/enterprise" ]: { screen: Enterprise }
};

export default routeConfiguration;