export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_hollow_rivers_want_discharge_place: {
			...this.state.vehicle_hollow_rivers_want_discharge_place,
			label,
			value 
		}
	});
};