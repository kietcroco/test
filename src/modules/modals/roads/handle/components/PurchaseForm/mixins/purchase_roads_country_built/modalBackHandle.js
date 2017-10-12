//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_roads_country_built.value.length ) {

	// 	return this.setState({
	// 		purchase_roads_country_built: {
	// 			...this.state.purchase_roads_country_built,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng chọn hãng sản xuất")
	// 		}
	// 	});
	// } 
	this.setState({
		purchase_roads_country_built: {
			...this.state.purchase_roads_country_built,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};