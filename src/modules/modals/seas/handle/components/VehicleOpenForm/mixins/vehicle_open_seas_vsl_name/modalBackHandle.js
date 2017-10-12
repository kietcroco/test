import { translate } from '~/utilities/language';

export default function backHandle() {
	if( !this.state.vehicle_open_seas_vsl_name.value.length ) {

		this.setState({
			vehicle_open_seas_vsl_name: {
				...this.state.vehicle_open_seas_vsl_name,
				modalVisible: false,
				messageType: "error",
				message: translate("#$seas$#Bạn vui lòng nhập tên tàu")
			}
		});
	} else {

		this.setState({
			vehicle_open_seas_vsl_name: {
				...this.state.vehicle_open_seas_vsl_name,
				modalVisible: false,
				messageType: "success",
				message: ""
			}
		});
	}
};