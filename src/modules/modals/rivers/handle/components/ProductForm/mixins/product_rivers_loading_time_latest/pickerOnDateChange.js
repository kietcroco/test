//import { translate } from '~/utilities/language';
import dateTimeFormat from '~/utilities/dateTimeFormat';

export default function onDateChange( value: Date ) {

	let label = dateTimeFormat( value );
	
	this.setState({
		product_rivers_loading_time_latest: {
			...this.state.product_rivers_loading_time_latest,
			modalVisible: false,
			value,
			label,
			//messageType: !label ? "error" : "success",
			//message: !label ? `${ translate("Bạn vui lòng nhập thời gian dỡ hàng") }.` : ""
		}
	});
};