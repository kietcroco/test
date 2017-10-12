import { namespace } from './constants';

import Product from './containers/Product.container';
import VehicleHollow from './containers/VehicleHollow.container';
import VehicleOpen from './containers/VehicleOpen.container';
import Bidding from './containers/Bidding.container';
import Purchase from './containers/Purchase.container';
import Enterprise from './containers/Enterprise.container';

// đăng ký router
const routeConfiguration = {
	[ namespace + "/product" ]: { screen: Product },
	[ namespace + "/vehicle-hollow" ]: { screen: VehicleHollow },
	[ namespace + "/vehicle-open" ]: { screen: VehicleOpen },
	[ namespace + "/purchase" ]: { screen: Purchase },
	[ namespace + "/bidding" ]: { screen: Bidding },
	[ namespace + "/enterprise" ]: { screen: Enterprise }
};

export default routeConfiguration;