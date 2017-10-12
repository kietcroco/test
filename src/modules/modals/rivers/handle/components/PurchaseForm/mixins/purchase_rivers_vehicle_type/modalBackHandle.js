//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_rivers_vehicle_type.value.length ) {

	// 	return this.setState({
	// 		purchase_rivers_vehicle_type: {
	// 			...this.state.purchase_rivers_vehicle_type,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng chọn loại phương tiện")
	// 		}
	// 	});
	// } 
	this.setState({
		purchase_rivers_vehicle_type: {
			...this.state.purchase_rivers_vehicle_type,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};