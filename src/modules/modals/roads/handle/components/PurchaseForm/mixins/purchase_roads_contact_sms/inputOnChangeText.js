export default function onChangeText( value: String = "" ) {

	this.setState({
		purchase_roads_contact_sms: {
			...this.state.purchase_roads_contact_sms,
			messageType: null,
			message: "",
			value
		},
		purchase_roads_contact_phone: {
			...this.state.purchase_roads_contact_phone,
			value,
			messageType: null,
			message: "",
		},
		contact_message: ""
	});
};