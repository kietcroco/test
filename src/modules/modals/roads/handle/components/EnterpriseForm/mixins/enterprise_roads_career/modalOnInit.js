export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		enterprise_roads_career: {
			...this.state.enterprise_roads_career,
			label,
			value
		}
	});
};