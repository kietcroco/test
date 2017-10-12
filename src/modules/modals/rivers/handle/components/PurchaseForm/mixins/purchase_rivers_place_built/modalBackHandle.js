//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_rivers_place_built.value.length ) {

	// 	return this.setState({
	// 		purchase_rivers_place_built: {
	// 			...this.state.purchase_rivers_place_built,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập nơi đóng")
	// 		}
	// 	});
	// } 
	this.setState({
		purchase_rivers_place_built: {
			...this.state.purchase_rivers_place_built,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};