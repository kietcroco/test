//import { translate } from '~/utilities/language';

export default function modalOnChange(label: String = "", value: Array = []) {

	this.setState({
		bidding_rivers_place: {
			...this.state.bidding_rivers_place,
			value,
			label,
			modalVisible: false,
			//messageType: !value.length ? "error" : "success",
			//message: !value.length ? translate("Bạn vui lòng nhập vị trí đấu thầu") : ""
		}
	});
};