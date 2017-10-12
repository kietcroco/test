export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_open_seas_vsl_name: {
			...this.state.vehicle_open_seas_vsl_name,
			label,
			value 
		}
	});
};