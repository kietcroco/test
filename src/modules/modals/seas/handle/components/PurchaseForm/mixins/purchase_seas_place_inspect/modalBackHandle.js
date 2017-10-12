//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_seas_place_inspect.value.length ) {

	// 	return this.setState({
	// 		purchase_seas_place_inspect: {
	// 			...this.state.purchase_seas_place_inspect,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập khảo sát tàu")
	// 		}
	// 	});
	// } 
	
	this.setState({
		purchase_seas_place_inspect: {
			...this.state.purchase_seas_place_inspect,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};