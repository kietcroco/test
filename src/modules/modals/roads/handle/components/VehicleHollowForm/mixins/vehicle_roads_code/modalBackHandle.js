//import { translate } from '~/utilities/language';

export default function backHandle() {
	// if( !this.state.vehicle_roads_code.value.length ) {

	// 	return this.setState({
	// 		vehicle_roads_code: {
	// 			...this.state.vehicle_roads_code,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập số đăng ký PT")
	// 		}
	// 	});
	// }
	this.setState({
		vehicle_roads_code: {
			...this.state.vehicle_roads_code,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};