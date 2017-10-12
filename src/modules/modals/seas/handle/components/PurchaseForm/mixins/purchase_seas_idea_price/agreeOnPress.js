export default function onPress() {
	
	this.refs.purchase_seas_idea_price.focus();
	this.setState({
		purchase_seas_idea_price: {
			...this.state.purchase_seas_idea_price,
			value: "0",
			//messageType: "success",
			//message: ""
		}
	});
};