import productService from '~/services/rivers/product';
import vehicleHollow from '~/services/rivers/vehicle-hollow';
import vehicleOpen from '~/services/rivers/vehicle-open';
import purchase from '~/services/rivers/purchase';
import bidding from '~/services/rivers/bidding';
import enterprise from '~/services/rivers/enterprise';
import homeRivers from '~/services/rivers/home';

export default Exchange => {
	switch (Exchange) {

		case "":
			return homeRivers;
		case "RIVERS_VEHICLE_HOLLOW":
			return vehicleHollow;

		case "RIVERS_PRODUCT_OFFER":
			return productService;

		case "RIVERS_VEHICLE_OPEN":
			return vehicleOpen;

		case "RIVERS_PURCHASE":
			return purchase;

		case "RIVERS_BIDDING":
			return bidding;

		case "RIVERS_ENTERPRISE":
			return enterprise;
	}

	return {};
};