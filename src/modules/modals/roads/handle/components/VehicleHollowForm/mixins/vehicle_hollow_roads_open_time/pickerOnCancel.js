//import { translate } from '~/utilities/language';
export default function onCancel() {

	this.setState({
		vehicle_hollow_roads_open_time: {
			...this.state.vehicle_hollow_roads_open_time,
			modalVisible: false,
			//messageType: !this.state.vehicle_hollow_roads_open_time.label ? "error" : "success",
			//message: !this.state.vehicle_hollow_roads_open_time.label ? translate("Bạn vui lòng nhập thời gian xuất phát") : ""
		}
	});
};