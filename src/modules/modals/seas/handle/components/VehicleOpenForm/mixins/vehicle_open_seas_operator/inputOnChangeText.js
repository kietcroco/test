export default function onChangeText( value: String = "" ) {


	this.setState({
		vehicle_open_seas_operator: {
			...this.state.vehicle_open_seas_operator,
			value
		}
	});
};