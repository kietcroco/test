//import { translate } from '~/utilities/language';
export default function onCancel() {

	this.setState({
		vehicle_hollow_roads_open_hour: {
			...this.state.vehicle_hollow_roads_open_hour,
			modalVisible: false,
			//messageType: !this.state.vehicle_hollow_roads_open_hour.label ? "error" : "success",
			//message: !this.state.vehicle_hollow_roads_open_hour.label ? translate("Bạn vui lòng chọn giờ xuất phát") : ""
		}
	});
};