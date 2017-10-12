//import { translate } from '~/utilities/language';
import dateTimeFormat from '~/utilities/dateTimeFormat';

export default function onDateChange( value: Date ) {

	let label = dateTimeFormat(value);

	this.setState({
		vehicle_open_seas_open_time_from: {
			...this.state.vehicle_open_seas_open_time_from,
			modalVisible: false,
			value,
			label,
			//messageType: !label ? "error" : "success",
			//message: !label ? translate("Bạn vui lòng nhập thời gian open") : ""
		}
	});
};