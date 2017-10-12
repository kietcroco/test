//import { translate } from '~/utilities/language';
import dateTimeFormat from '~/utilities/dateTimeFormat';

export default function onDateChange( value: Date ) {

	let label = dateTimeFormat(value);

	this.setState({
		bidding_rivers_time: {
			...this.state.bidding_rivers_time,
			modalVisible: false,
			value,
			label,
			//messageType: !label ? "error" : "success",
			//message: !label ? translate("Bạn vui lòng nhập thời gian đấu thầu") : ""
		}
	});
};