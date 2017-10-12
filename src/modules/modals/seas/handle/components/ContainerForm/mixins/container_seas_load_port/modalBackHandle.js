import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.container_seas_load_port.value.length ) {

	// 	this.setState({
	// 		container_seas_load_port: {
	// 			...this.state.container_seas_load_port,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: `${ translate("Bạn vui lòng nhập nơi nhận") }.`
	// 		}
	// 	});
	// } else {

		this.state.container_seas_load_port.modalVisible && this.setState({
			container_seas_load_port: {
				...this.state.container_seas_load_port,
				modalVisible: false,
				//messageType: "success",
				//message: ""
			}
		});
	//}
};