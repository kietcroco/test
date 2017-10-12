export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_roads_year_built: {
			...this.state.purchase_roads_year_built,
			label,
			value 
		}
	});
};