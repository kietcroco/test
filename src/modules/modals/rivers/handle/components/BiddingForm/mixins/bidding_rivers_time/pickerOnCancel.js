//import { translate } from '~/utilities/language';
export default function onCancel() {

	this.setState({
		bidding_rivers_time: {
			...this.state.bidding_rivers_time,
			modalVisible: false,
			//messageType: !this.state.bidding_rivers_time.label ? "error" : "success",
			//message: !this.state.bidding_rivers_time.label ? translate("Bạn vui lòng nhập thời gian đấu thầu") : ""
		}
	});
};