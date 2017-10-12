export default function onPress() {
	
	this.state.product_seas_freight.value != "0" && this.setState({
		product_seas_freight: {
			...this.state.product_seas_freight,
			value: "0",
			//messageType: "success",
			//message: ""
		}
	}, () => this.refs.product_seas_freight.focus());
};