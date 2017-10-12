export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_roads_type: {
			...this.state.vehicle_roads_type,
			label,
			value 
		}
	});
};