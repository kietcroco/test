//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		container_seas_load_port: {
			...this.state.container_seas_load_port,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? `${ translate("Bạn vui lòng nhập nơi nhận") }.` : ""
		}
	});
};