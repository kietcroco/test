//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		product_rivers_weight_unit: {
			...this.state.product_rivers_weight_unit,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? `${ translate("Bạn vui lòng chọn đơn vị tính") }.` : ""
		}
	});
};