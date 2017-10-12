export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_rivers_place_delivery: {
			...this.state.purchase_rivers_place_delivery,
			label,
			value 
		}
	});
};