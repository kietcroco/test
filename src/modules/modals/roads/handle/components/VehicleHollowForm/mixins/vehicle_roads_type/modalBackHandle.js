//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.vehicle_roads_type.value.length ) {

	// 	return this.setState({
	// 		vehicle_roads_type: {
	// 			...this.state.vehicle_roads_type,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng chọn loại PT")
	// 		}
	// 	});
	// } 
	this.setState({
		vehicle_roads_type: {
			...this.state.vehicle_roads_type,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};