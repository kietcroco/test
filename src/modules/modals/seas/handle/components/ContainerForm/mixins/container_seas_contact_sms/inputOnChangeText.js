export default function onChangeText( value: String = "" ) {

	this.setState({
		container_seas_contact_sms: {
			...this.state.container_seas_contact_sms,
			messageType: null,
			message: "",
			value
		},
		container_seas_contact_phone: {
			...this.state.container_seas_contact_phone,
			value,
			messageType: null,
			message: "",
		},
		contact_message: ""
	});
};