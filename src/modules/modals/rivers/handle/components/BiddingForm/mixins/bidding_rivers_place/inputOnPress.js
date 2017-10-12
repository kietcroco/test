export default function onPress() {

	!this.state.bidding_rivers_place.modalVisible && this.setState({
		bidding_rivers_place: {
			...this.state.bidding_rivers_place,
			modalVisible: true
		}
	});
};