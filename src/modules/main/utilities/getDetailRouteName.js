export default (exchange = "", defaultName = "/") => {

	switch (exchange) {

		case "RIVERS_PRODUCT_OFFER":

			return "/detail/product";

		case "RIVERS_VEHICLE_HOLLOW":

			return "/detail/vehicle-hollow";

		case "RIVERS_VEHICLE_OPEN":

			return "/detail/vehicle-open";

		case "RIVERS_PURCHASE":

			return "/detail/purchase";

		case "RIVERS_BIDDING":

			return "/detail/bidding";

		case "RIVERS_ENTERPRISE":

			return "/detail/enterprise";


		/**
		 * ĐƯỜNG BỘ
		 */

		case "ROADS_PRODUCT_OFFER":

			return "/detail/product";

		case "ROADS_VEHICLE_HOLLOW":

			return "/detail/vehicle-hollow";

		case "ROADS_VEHICLE_OPEN":

			return "/detail/vehicle-open";

		case "ROADS_PURCHASE":

			return "/detail/purchase";

		case "ROADS_CONTAINER":

			return "/detail/container";

		case "ROADS_ENTERPRISE":

			return "/detail/enterprise";

		/**
		 * ĐƯỜNG BIỂN
		 */
		case "SEAS_PRODUCT_OFFER":

			return "/detail/product";

		case "SEAS_VEHICLE_HOLLOW":

			return "/detail/vehicle-hollow";

		case "SEAS_VEHICLE_OPEN":

			return "/detail/vehicle-open";

		case "SEAS_PURCHASE":

			return "/detail/purchase";

		case "SEAS_CONTAINER":

			return "/detail/container";

		case "SEAS_ENTERPRISE":

			return "/detail/enterprise";
	}

	return defaultName;
};