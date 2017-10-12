export default function onChangeText( value: String = "" ) {

	this.setState({
		container_roads_contact_sms: {
			...this.state.container_roads_contact_sms,
			messageType: null,
			message: "",
			value
		},
		container_roads_contact_phone: {
			...this.state.container_roads_contact_phone,
			value,
			messageType: null,
			message: "",
		},
		contact_message: ""
	});
};