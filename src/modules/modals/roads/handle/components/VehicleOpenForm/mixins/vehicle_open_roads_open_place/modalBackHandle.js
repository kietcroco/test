//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.vehicle_open_roads_open_place.value.length ) {

	// 	this.setState({
	// 		vehicle_open_roads_open_place: {
	// 			...this.state.vehicle_open_roads_open_place,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập nơi open")
	// 		}
	// 	});
	// } else {

		this.setState({
			vehicle_open_roads_open_place: {
				...this.state.vehicle_open_roads_open_place,
				modalVisible: false,
				// messageType: "success",
				// message: ""
			}
		});
	//}
};