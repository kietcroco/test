export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_rivers_place_built: {
			...this.state.purchase_rivers_place_built,
			label,
			value 
		}
	});
};