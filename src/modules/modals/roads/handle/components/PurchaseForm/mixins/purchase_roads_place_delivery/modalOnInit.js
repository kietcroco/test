export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_roads_place_delivery: {
			...this.state.purchase_roads_place_delivery,
			label,
			value 
		}
	});
};