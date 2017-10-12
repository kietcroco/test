//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		vehicle_open_seas_class: {
			...this.state.vehicle_open_seas_class,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng nhập đăng kiểm") : ""
		}
	});
};