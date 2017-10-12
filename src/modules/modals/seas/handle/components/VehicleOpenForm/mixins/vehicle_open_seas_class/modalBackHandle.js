//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.vehicle_open_seas_class.value.length ) {

	// 	return this.setState({
	// 		vehicle_open_seas_class: {
	// 			...this.state.vehicle_open_seas_class,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập đăng kiểm")
	// 		}
	// 	});
	// } 
	
	this.setState({
		vehicle_open_seas_class: {
			...this.state.vehicle_open_seas_class,
			modalVisible: false,
			messageType: "success",
			message: ""
		}
	});
};