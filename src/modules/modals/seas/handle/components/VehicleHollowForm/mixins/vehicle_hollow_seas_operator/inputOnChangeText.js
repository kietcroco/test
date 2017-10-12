export default function onChangeText( value: String = "" ) {

	this.setState({
		vehicle_hollow_seas_operator: {
			...this.state.vehicle_hollow_seas_operator,
			value
		}
	});
};