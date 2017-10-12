export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_roads_vehicle_type: {
			...this.state.purchase_roads_vehicle_type,
			label,
			value 
		}
	});
};