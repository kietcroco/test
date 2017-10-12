//import { translate } from '~/utilities/language';
export default function onCancel() {

	this.setState({
		vehicle_open_seas_open_time_from: {
			...this.state.vehicle_open_seas_open_time_from,
			modalVisible: false,
			//messageType: !this.state.vehicle_open_seas_open_time_from.label ? "error" : "success",
			//message: !this.state.vehicle_open_seas_open_time_from.label ? translate("Bạn vui lòng nhập thời gian open") : ""
		}
	});
};