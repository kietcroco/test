//import { translate } from '~/utilities/language';
export default function onCancel() {

	this.setState({
		product_seas_loading_time_earliest: {
			...this.state.product_seas_loading_time_earliest,
			modalVisible: false,
			//messageType: !this.state.product_seas_loading_time_earliest.label ? "error" : "success",
			//message: !this.state.product_seas_loading_time_earliest.label ? `${ translate("Bạn vui lòng nhập thời gian xếp hàng") }.` : ""
		}
	});
};