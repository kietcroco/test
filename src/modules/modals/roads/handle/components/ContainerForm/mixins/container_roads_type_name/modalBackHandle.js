//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.container_roads_type_name.value.length ) {

	// 	return this.setState({
	// 		container_roads_type_name: {
	// 			...this.state.container_roads_type_name,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: `${ translate("Bạn vui lòng chọn loại cont") }.`
	// 		}
	// 	});
	// }
	
	this.setState({
		container_roads_type_name: {
			...this.state.container_roads_type_name,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};