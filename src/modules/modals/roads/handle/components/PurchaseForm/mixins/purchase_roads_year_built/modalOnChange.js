//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		purchase_roads_year_built: {
			...this.state.purchase_roads_year_built,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng nhập nơi open") : ""
		}
	});
};