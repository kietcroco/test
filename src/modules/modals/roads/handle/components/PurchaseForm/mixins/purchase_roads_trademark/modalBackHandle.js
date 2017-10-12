//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_roads_trademark.value.length ) {

	// 	return this.setState({
	// 		purchase_roads_trademark: {
	// 			...this.state.purchase_roads_trademark,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng chọn hãng xe")
	// 		}
	// 	});
	// } 
	this.setState({
		purchase_roads_trademark: {
			...this.state.purchase_roads_trademark,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};