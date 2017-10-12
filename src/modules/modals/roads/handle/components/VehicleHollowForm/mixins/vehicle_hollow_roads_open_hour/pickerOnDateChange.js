//import { translate } from '~/utilities/language';
import dateTimeFormat from '~/utilities/dateTimeFormat';

export default function onDateChange( value: Date ) {

	let label = dateTimeFormat(value,"HH:mm");

	this.setState({
		vehicle_hollow_roads_open_hour: {
			...this.state.vehicle_hollow_roads_open_hour,
			modalVisible: false,
			value,
			label,
			//messageType: !label ? "error" : "success",
			//message: !label ? translate("Bạn vui lòng chọn giờ xuất phát") : ""
		}
	});
};