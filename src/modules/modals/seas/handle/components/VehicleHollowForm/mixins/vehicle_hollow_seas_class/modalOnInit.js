export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		vehicle_hollow_seas_class: {
			...this.state.vehicle_hollow_seas_class,
			label,
			value 
		}
	});
};