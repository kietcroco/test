//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		vehicle_hollow_rivers_open_place: {
			...this.state.vehicle_hollow_rivers_open_place,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng chọn nơi xuất phát") : ""
		}
	});
};