import React from 'react';
import PropTypes from 'prop-types';
import VehicleHollow from './VehicleHollow';
import Product from './Product';
import VehicleOpen from './VehicleOpen';
import Purchase from './Purchase';
import Container from './Container';
import Enterprise from './Enterprise';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';

// hàm lấy component row content theo sàn
const getContentComponent = (Exchange: String = "") => {

	switch (Exchange) {

		case "SEAS_VEHICLE_HOLLOW":
			return VehicleHollow;

		case "SEAS_PRODUCT_OFFER":
			return Product;

		case "SEAS_VEHICLE_OPEN":
			return VehicleOpen;

		case "SEAS_PURCHASE":
			return Purchase;

		case "SEAS_CONTAINER":
			return Container;

		case "SEAS_ENTERPRISE":
			return Enterprise;
	}

	return null;

};

class RowContent extends React.Component {

	static displayName = "@RowContent";

	static propTypes = {
		source: PropTypes.object.isRequired
	};

	shouldComponentUpdate(nextProps) {

		return (
			!recursiveShallowEqual(this.props.source, nextProps.source)
		);
	}

	render() {

		const { source: {
			exchanges
		} = {} } = this.props;

		const Component = getContentComponent(exchanges);

		if (!Component) return null;

		return (

			<Component {...this.props} />
		);
	}
}

export default RowContent;