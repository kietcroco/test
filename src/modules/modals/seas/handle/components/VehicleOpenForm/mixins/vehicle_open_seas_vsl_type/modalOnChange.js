//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		vehicle_open_seas_vsl_type: {
			...this.state.vehicle_open_seas_vsl_type,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng chọn loại tàu") : ""
		}
	});
};