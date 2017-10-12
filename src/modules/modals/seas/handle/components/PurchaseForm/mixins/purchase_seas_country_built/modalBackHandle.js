//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_seas_country_built.value.length ) {

	// 	return this.setState({
	// 		purchase_seas_country_built: {
	// 			...this.state.purchase_seas_country_built,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập khảo sát tàu")
	// 		}
	// 	});
	// } 
	this.setState({
		purchase_seas_country_built: {
			...this.state.purchase_seas_country_built,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};