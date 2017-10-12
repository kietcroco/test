//import { translate } from '~/utilities/language';
export default function onCancel() {

	this.setState({
		container_seas_loading_time_earliest: {
			...this.state.container_seas_loading_time_earliest,
			modalVisible: false,
			//messageType: !this.state.container_seas_loading_time_earliest.label ? "error" : "success",
			//message: !this.state.container_seas_loading_time_earliest.label ? `${ translate("Bạn vui lòng nhập thời gian xếp hàng") }.` : ""
		}
	});
};