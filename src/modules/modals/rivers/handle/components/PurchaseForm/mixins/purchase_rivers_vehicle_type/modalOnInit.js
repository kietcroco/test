export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_rivers_vehicle_type: {
			...this.state.purchase_rivers_vehicle_type,
			label,
			value 
		}
	});
};