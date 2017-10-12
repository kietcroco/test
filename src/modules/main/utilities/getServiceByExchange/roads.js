import productService from '~/services/roads/product';
import vehicleHollow from '~/services/roads/vehicle-hollow';
import vehicleOpen from '~/services/roads/vehicle-open';
import purchase from '~/services/roads/purchase';
import container from '~/services/roads/container';
import enterprise from '~/services/roads/enterprise';
import homeRoads from '~/services/roads/home';

export default Exchange => {
	switch (Exchange) {

		case "":
			return homeRoads;
		case "ROADS_VEHICLE_HOLLOW":
			return vehicleHollow;

		case "ROADS_PRODUCT_OFFER":
			return productService;

		case "ROADS_VEHICLE_OPEN":
			return vehicleOpen;

		case "ROADS_PURCHASE":
			return purchase;

		case "ROADS_CONTAINER":
			return container;

		case "ROADS_ENTERPRISE":
			return enterprise;
	}

	return {};
};