//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.enterprise_seas_career.value.length ) {

	// 	return this.setState({
	// 		enterprise_seas_career: {
	// 			...this.state.enterprise_seas_career,
	// 			modalVisible: false,
	// 			//messageType: "error",
	// 			//message: translate("Bạn vui lòng chọn ngành nghề chính")
	// 		}
	// 	});
	// } 

	this.setState({
		enterprise_seas_career: {
			...this.state.enterprise_seas_career,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};