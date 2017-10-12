//import { translate } from '~/utilities/language';
export default function onCancel() {

	this.setState({
		vehicle_open_rivers_open_time: {
			...this.state.vehicle_open_rivers_open_time,
			modalVisible: false,
			//messageType: !this.state.vehicle_open_rivers_open_time.label ? "error" : "success",
			//message: !this.state.vehicle_open_rivers_open_time.label ? translate("Bạn vui lòng nhập ngày open") : ""
		}
	});
};