export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_seas_place_inspect: {
			...this.state.purchase_seas_place_inspect,
			label,
			value 
		}
	});
};