export default function onChangeText( value: String = "" ) {

	this.setState({
		bidding_rivers_contact_sms: {
			...this.state.bidding_rivers_contact_sms,
			messageType: null,
			message: "",
			value
		},
		bidding_rivers_contact_phone: {
			...this.state.bidding_rivers_contact_phone,
			value,
			messageType: null,
			message: "",
		},
		contact_message: ""
	});
};