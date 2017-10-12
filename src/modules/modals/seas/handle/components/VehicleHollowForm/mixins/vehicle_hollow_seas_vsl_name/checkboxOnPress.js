import { translate } from '~/utilities/language';
export default function onPress() {

	if( this.state.vehicle_hollow_seas_vsl_name.value === "TBN" ) {

		return this.setState({
			vehicle_hollow_seas_vsl_name: {
				...this.state.vehicle_hollow_seas_vsl_name,
				value: "",
				label: "",
				messageType: "error",
				message: translate("#$seas$#Bạn vui lòng nhập tên tàu")
			}
		});
	}
	
	this.setState({
		vehicle_hollow_seas_vsl_name: {
			...this.state.vehicle_hollow_seas_vsl_name,
			value: "TBN",
			label: "TBN",
			messageType: "success",
			message: ""
		}
	});
};