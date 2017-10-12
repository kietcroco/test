export default function onCancel(e) {

	this.setState({
		bidding_rivers_time: {
			...this.state.bidding_rivers_time,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};