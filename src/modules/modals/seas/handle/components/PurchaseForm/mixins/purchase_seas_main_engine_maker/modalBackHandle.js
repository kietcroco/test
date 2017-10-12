//import { translate } from '~/utilities/language';

export default function backHandle() {

	// if( !this.state.purchase_seas_main_engine_maker.value.length ) {

	// 	return this.setState({
	// 		purchase_seas_main_engine_maker: {
	// 			...this.state.purchase_seas_main_engine_maker,
	// 			modalVisible: false,
	// 			messageType: "error",
	// 			message: translate("Bạn vui lòng nhập nơi open")
	// 		}
	// 	});
	// } 
	
	this.setState({
		purchase_seas_main_engine_maker: {
			...this.state.purchase_seas_main_engine_maker,
			modalVisible: false,
			//messageType: "success",
			//message: ""
		}
	});
};