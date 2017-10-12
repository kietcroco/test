export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_seas_place_built: {
			...this.state.purchase_seas_place_built,
			label,
			value 
		}
	});
};