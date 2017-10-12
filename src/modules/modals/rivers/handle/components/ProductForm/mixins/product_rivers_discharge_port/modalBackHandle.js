//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.product_rivers_discharge_port.value.length ) {

	// 	this.setState({
	// 		product_rivers_discharge_port: {
	// 			...this.state.product_rivers_discharge_port,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: `${ translate("Bạn vui lòng nhập nơi giao") }.`
	// 		}
	// 	});
	// } else {

		this.state.product_rivers_discharge_port.modalVisible && this.setState({
			product_rivers_discharge_port: {
				...this.state.product_rivers_discharge_port,
				modalVisible: false,
				//messageType: "success",
				//message: ""
			}
		});
	//}
};