//import { translate } from '~/utilities/language';

export default function onCancel() {

	this.setState({
		product_rivers_loading_time_latest: {
			...this.state.product_rivers_loading_time_latest,
			modalVisible: false,
			//messageType: !this.state.product_rivers_loading_time_latest.label ? "error" : "success",
			//message: !this.state.product_rivers_loading_time_latest.label ? `${ translate("Bạn vui lòng nhập thời gian dỡ hàng") }.` : ""
		}
	});
};