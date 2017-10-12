//import { translate } from '~/utilities/language';
import dateTimeFormat from '~/utilities/dateTimeFormat';

export default function onDateChange( value: Date ) {

	let label = dateTimeFormat(value);

	this.setState({
		vehicle_hollow_seas_open_time: {
			...this.state.vehicle_hollow_seas_open_time,
			modalVisible: false,
			value,
			label,
			//messageType: !label ? "error" : "success",
			//message: !label ? translate("Bạn vui lòng nhập thời gian xuất phát") : ""
		}
	});
};