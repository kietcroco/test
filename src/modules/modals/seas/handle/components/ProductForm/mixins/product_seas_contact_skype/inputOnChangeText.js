export default function onChangeText( value: String = "" ) {

	this.setState({
		product_seas_contact_skype: {
			...this.state.product_seas_contact_skype,
			//messageType: null,
			//message: "",
			value
		}
	});
};