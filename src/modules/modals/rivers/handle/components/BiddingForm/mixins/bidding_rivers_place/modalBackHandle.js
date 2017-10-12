//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.bidding_rivers_place.value.length ) {

	// 	return this.setState({
	// 		bidding_rivers_place: {
	// 			...this.state.bidding_rivers_place,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập vị trí đấu thầu")
	// 		}
	// 	});
	// } 
	this.setState({
		bidding_rivers_place: {
			...this.state.bidding_rivers_place,
			modalVisible: false,
			messageType: "success",
			message: ""
		}
	});
};