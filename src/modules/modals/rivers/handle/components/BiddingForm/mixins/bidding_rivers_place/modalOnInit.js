export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		bidding_rivers_place: {
			...this.state.bidding_rivers_place,
			label,
			value 
		}
	});
};