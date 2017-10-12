import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.container_seas_type_name.value.length ) {

	// 	this.setState({
	// 		container_seas_type_name: {
	// 			...this.state.container_seas_type_name,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: `${ translate("Bạn vui lòng chọn loại hàng") }.`
	// 		}
	// 	});
	// } else {

		this.state.container_seas_type_name.modalVisible && this.setState({
			container_seas_type_name: {
				...this.state.container_seas_type_name,
				modalVisible: false,
				// messageType: "success",
				// message: ""
			}
		});
	//}
};