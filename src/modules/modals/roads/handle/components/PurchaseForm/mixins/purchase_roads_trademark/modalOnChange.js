//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		purchase_roads_trademark: {
			...this.state.purchase_roads_trademark,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng chọn hãng xe") : ""
		}
	});
};