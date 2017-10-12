export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		container_seas_type_name: {
			...this.state.container_seas_type_name,
			label,
			value 
		}
	});
};