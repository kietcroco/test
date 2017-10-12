//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.container_seas_discharge_port.value.length ) {

	// 	this.setState({
	// 		container_seas_discharge_port: {
	// 			...this.state.container_seas_discharge_port,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: `${ translate("Bạn vui lòng nhập nơi giao") }.`
	// 		}
	// 	});
	// } else {

		this.state.container_seas_discharge_port.modalVisible && this.setState({
			container_seas_discharge_port: {
				...this.state.container_seas_discharge_port,
				modalVisible: false,
				//messageType: "success",
				//message: ""
			}
		});
	//}
};