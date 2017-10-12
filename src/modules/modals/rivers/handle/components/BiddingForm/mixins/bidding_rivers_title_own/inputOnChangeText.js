export default function onChangeText( value: String = "" ) {

	this.setState({
		bidding_rivers_title_own: {
			...this.state.bidding_rivers_title_own,
			value
		}
	});
};