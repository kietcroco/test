//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		vehicle_hollow_roads_want_discharge_place: {
			...this.state.vehicle_hollow_roads_want_discharge_place,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng nhập đích đến") : ""
		}
	});
};