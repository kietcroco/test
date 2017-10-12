//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.vehicle_open_rivers_want_discharge_place.value.length ) {

	// 	return this.setState({
	// 		vehicle_open_rivers_want_discharge_place: {
	// 			...this.state.vehicle_open_rivers_want_discharge_place,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập nơi trả hàng mong muốn")
	// 		}
	// 	});
	// } 
	this.setState({
		vehicle_open_rivers_want_discharge_place: {
			...this.state.vehicle_open_rivers_want_discharge_place,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};