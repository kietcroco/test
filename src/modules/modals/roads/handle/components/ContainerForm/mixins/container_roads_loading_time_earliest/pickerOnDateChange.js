//import { translate } from '~/utilities/language';
import dateTimeFormat from '~/utilities/dateTimeFormat';

export default function onDateChange( value: Date ) {

	let label = dateTimeFormat( value );

	this.setState({
		container_roads_loading_time_earliest: {
			...this.state.container_roads_loading_time_earliest,
			modalVisible: false,
			value,
			label,
			//messageType: !label ? "error" : "success",
			//message: !label ? `${ translate("Bạn vui lòng nhập thời gian xếp hàng") }.` : ""
		}
	});
};