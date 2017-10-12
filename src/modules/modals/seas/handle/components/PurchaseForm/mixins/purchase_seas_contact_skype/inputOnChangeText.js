export default function onChangeText( value: String = "" ) {

	this.setState({
		purchase_seas_contact_skype: {
			...this.state.purchase_seas_contact_skype,
			//messageType: null,
			//message: "",
			value
		}
	});
};