export default function onChangeText( value: String = "" ) {

	this.setState({
		vehicle_hollow_seas_contact_skype: {
			...this.state.vehicle_hollow_seas_contact_skype,
			//messageType: null,
			//message: "",
			value
		}
	});
};