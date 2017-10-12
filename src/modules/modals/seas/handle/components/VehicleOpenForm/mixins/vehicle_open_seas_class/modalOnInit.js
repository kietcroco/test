export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_open_seas_class: {
			...this.state.vehicle_open_seas_class,
			label,
			value 
		}
	});
};