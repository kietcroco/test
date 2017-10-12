export default function onChangeText( value: String = "" ) {

	this.setState({
		product_seas_contact_sms: {
			...this.state.product_seas_contact_sms,
			messageType: null,
			message: "",
			value
		},
		product_seas_contact_phone: {
			...this.state.product_seas_contact_phone,
			value,
			messageType: null,
			message: "",
		},
		contact_message: ""
	});
};