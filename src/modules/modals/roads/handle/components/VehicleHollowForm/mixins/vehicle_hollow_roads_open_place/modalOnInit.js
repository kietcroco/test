export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_hollow_roads_open_place: {
			...this.state.vehicle_hollow_roads_open_place,
			label,
			value 
		}
	});
};