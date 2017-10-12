export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_rivers_code: {
			...this.state.vehicle_rivers_code,
			label,
			value 
		}
	});
};