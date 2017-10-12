export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_seas_vehicle_type: {
			...this.state.purchase_seas_vehicle_type,
			label,
			value 
		}
	});
};