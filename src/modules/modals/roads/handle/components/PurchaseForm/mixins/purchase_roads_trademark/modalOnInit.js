export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_roads_trademark: {
			...this.state.purchase_roads_trademark,
			label,
			value 
		}
	});
};