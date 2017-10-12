//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.vehicle_hollow_roads_open_place.value.length ) {

	// 	return this.setState({
	// 		vehicle_hollow_roads_open_place: {
	// 			...this.state.vehicle_hollow_roads_open_place,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng chọn nơi xuất phát")
	// 		}
	// 	});
	// }
	this.setState({
		vehicle_hollow_roads_open_place: {
			...this.state.vehicle_hollow_roads_open_place,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};