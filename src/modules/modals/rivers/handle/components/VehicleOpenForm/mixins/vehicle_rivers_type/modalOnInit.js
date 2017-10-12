export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_rivers_type: {
			...this.state.vehicle_rivers_type,
			label,
			value 
		}
	});
};