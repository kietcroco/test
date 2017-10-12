//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		purchase_rivers_vehicle_type: {
			...this.state.purchase_rivers_vehicle_type,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng chọn loại phương tiện") : ""
		}
	});
};