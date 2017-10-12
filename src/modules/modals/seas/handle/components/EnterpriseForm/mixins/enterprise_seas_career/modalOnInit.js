
export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		enterprise_seas_career: {
			...this.state.enterprise_seas_career,
			label,
			value
		}
	});
};