export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		enterprise_rivers_career: {
			...this.state.enterprise_rivers_career,
			label,
			value
		}
	});
};