//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.vehicle_hollow_seas_vsl_type.value.length ) {

	// 	return this.setState({
	// 		vehicle_hollow_seas_vsl_type: {
	// 			...this.state.vehicle_hollow_seas_vsl_type,
	// 			modalVisible: false,
	// 			//messageType: "error",
	// 			//message: translate("Bạn vui lòng chọn loại tàu")
	// 		}
	// 	});
	// }
	this.setState({
		vehicle_hollow_seas_vsl_type: {
			...this.state.vehicle_hollow_seas_vsl_type,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};