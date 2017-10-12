import productService from '~/services/seas/product';
import vehicleHollow from '~/services/seas/vehicleHollow';
import vehicleOpen from '~/services/seas/vehicleOpen';
import purchase from '~/services/seas/purchase';
import container from '~/services/seas/container';
import enterprise from '~/services/seas/enterprise';
import homeRivers from '~/services/seas/home';

export default Exchange => {
	switch (Exchange) {

		case "":
			return homeRivers;
		case "SEAS_VEHICLE_HOLLOW":
			return vehicleHollow;

		case "SEAS_PRODUCT_OFFER":
			return productService;

		case "SEAS_VEHICLE_OPEN":
			return vehicleOpen;

		case "SEAS_PURCHASE":
			return purchase;

		case "SEAS_CONTAINER":
			return container;

		case "SEAS_ENTERPRISE":
			return enterprise;
	}

	return {};
};