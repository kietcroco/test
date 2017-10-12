export default function onPress() {

	!this.state.bidding_rivers_time.modalVisible && this.setState({
		bidding_rivers_time: {
			...this.state.bidding_rivers_time,
			modalVisible: true
		}
	});
};