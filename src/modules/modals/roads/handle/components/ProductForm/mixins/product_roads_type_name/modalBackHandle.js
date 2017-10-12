//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.product_roads_type_name.value.length ) {

	// 	this.setState({
	// 		product_roads_type_name: {
	// 			...this.state.product_roads_type_name,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: `${ translate("Bạn vui lòng chọn loại hàng") }.`
	// 		}
	// 	});
	// } else {

		this.state.product_roads_type_name.modalVisible && this.setState({
			product_roads_type_name: {
				...this.state.product_roads_type_name,
				modalVisible: false,
				// messageType: "success",
				// message: ""
			}
		});
	//}
};