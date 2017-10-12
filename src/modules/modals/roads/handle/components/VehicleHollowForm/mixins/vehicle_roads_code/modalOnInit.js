export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_roads_code: {
			...this.state.vehicle_roads_code,
			label,
			value 
		}
	});
};