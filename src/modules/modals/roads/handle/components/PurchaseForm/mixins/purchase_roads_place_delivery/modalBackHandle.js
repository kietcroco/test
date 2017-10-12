//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_roads_place_delivery.value.length ) {

	// 	return this.setState({
	// 		purchase_roads_place_delivery: {
	// 			...this.state.purchase_roads_place_delivery,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập nơi xem")
	// 		}
	// 	});
	// } 
	this.setState({
		purchase_roads_place_delivery: {
			...this.state.purchase_roads_place_delivery,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};