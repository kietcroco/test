export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_roads_country_built: {
			...this.state.purchase_roads_country_built,
			label,
			value 
		}
	});
};