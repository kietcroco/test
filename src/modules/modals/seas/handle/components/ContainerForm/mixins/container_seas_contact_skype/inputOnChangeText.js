export default function onChangeText( value: String = "" ) {

	this.setState({
		container_seas_contact_skype: {
			...this.state.container_seas_contact_skype,
			//messageType: null,
			//message: "",
			value
		}
	});
};