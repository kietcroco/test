//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		enterprise_roads_career: {
			...this.state.enterprise_roads_career,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng chọn ngành nghề chính") : ""
		}
	});
};