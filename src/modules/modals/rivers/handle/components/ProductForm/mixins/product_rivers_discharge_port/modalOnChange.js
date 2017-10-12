//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		product_rivers_discharge_port: {
			...this.state.product_rivers_discharge_port,
			value,
			label,
			modalVisible: false,
			// messageType: !value.length ? "error" : "success",
			// message: !value.length ? `${ translate("Bạn vui lòng nhập nơi giao") }.` : ""
		}
	});
};