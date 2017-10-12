//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.product_roads_weight_unit.value.length ) {

	// 	this.setState({
	// 		product_roads_weight_unit: {
	// 			...this.state.product_roads_weight_unit,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: `${ translate("Bạn vui lòng chọn đơn vị tính") }.`
	// 		}
	// 	});
	// } else {

		this.state.product_roads_weight_unit.modalVisible && this.setState({
			product_roads_weight_unit: {
				...this.state.product_roads_weight_unit,
				modalVisible: false,
				// messageType: "success",
				// message: ""
			}
		});
	//}
};