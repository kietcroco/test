//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_seas_place_built.value.length ) {

	// 	this.setState({
	// 		purchase_seas_place_built: {
	// 			...this.state.purchase_seas_place_built,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập nơi đóng")
	// 		}
	// 	});
	// } else {

		this.setState({
			purchase_seas_place_built: {
				...this.state.purchase_seas_place_built,
				modalVisible: false,
				//messageType: "success",
				//message: ""
			}
		});
	//}
};