import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		container_seas_type_name: {
			...this.state.container_seas_type_name,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? `${ translate("Bạn vui lòng chọn loại hàng") }.` : ""
		}
	});
};