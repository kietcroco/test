export default function onChangeText( value: String = "" ) {

	this.setState({
		vehicle_open_roads_contact_sms: {
			...this.state.vehicle_open_roads_contact_sms,
			messageType: null,
			message: "",
			value
		},
		vehicle_open_roads_contact_phone: {
			...this.state.vehicle_open_roads_contact_phone,
			value,
			messageType: null,
			message: "",
		},
		contact_message: ""
	});
};