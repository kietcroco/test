//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.vehicle_hollow_roads_want_discharge_place.value.length ) {

	// 	this.setState({
	// 		vehicle_hollow_roads_want_discharge_place: {
	// 			...this.state.vehicle_hollow_roads_want_discharge_place,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập đích đến")
	// 		}
	// 	});
	// } 
	this.setState({
		vehicle_hollow_roads_want_discharge_place: {
			...this.state.vehicle_hollow_roads_want_discharge_place,
			modalVisible: false,
			// messageType: "success",
			// message: ""
		}
	});
};