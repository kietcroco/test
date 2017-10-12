//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.product_seas_load_port.value.length ) {

	// 	this.setState({
	// 		product_seas_load_port: {
	// 			...this.state.product_seas_load_port,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: `${ translate("Bạn vui lòng nhập nơi nhận") }.`
	// 		}
	// 	});
	// } else {

		this.state.product_seas_load_port.modalVisible && this.setState({
			product_seas_load_port: {
				...this.state.product_seas_load_port,
				modalVisible: false,
				//messageType: "success",
				//message: ""
			}
		});
	//}
};