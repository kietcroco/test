export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		container_roads_type_name: {
			...this.state.container_roads_type_name,
			label,
			value 
		}
	});
};