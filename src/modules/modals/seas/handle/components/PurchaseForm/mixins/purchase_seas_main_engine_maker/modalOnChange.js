//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		purchase_seas_main_engine_maker: {
			...this.state.purchase_seas_main_engine_maker,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng nhập nơi open") : ""
		}
	});
};