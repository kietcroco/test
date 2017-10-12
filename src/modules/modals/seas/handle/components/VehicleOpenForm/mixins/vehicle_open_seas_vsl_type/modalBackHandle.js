//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.vehicle_open_seas_vsl_type.value.length ) {

	// 	this.setState({
	// 		vehicle_open_seas_vsl_type: {
	// 			...this.state.vehicle_open_seas_vsl_type,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng chọn loại tàu")
	// 		}
	// 	});
	// } else {

		this.setState({
			vehicle_open_seas_vsl_type: {
				...this.state.vehicle_open_seas_vsl_type,
				modalVisible: false,
				//messageType: "success",
				//message: ""
			}
		});
	//}
};