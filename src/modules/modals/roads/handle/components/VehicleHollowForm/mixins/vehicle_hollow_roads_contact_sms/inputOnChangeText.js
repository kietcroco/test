export default function onChangeText( value: String = "" ) {

	this.setState({
		vehicle_hollow_roads_contact_sms: {
			...this.state.vehicle_hollow_roads_contact_sms,
			messageType: null,
			message: "",
			value
		},
		vehicle_hollow_roads_contact_phone: {
			...this.state.vehicle_hollow_roads_contact_phone,
			value,
			messageType: null,
			message: "",
		},
		contact_message: ""
	});
};