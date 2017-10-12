export default function onPress() {
	
	this.state.product_rivers_freight.value != "0" && this.setState({
		product_rivers_freight: {
			...this.state.product_rivers_freight,
			value: "0",
			//messageType: "success",
			//message: ""
		}
	}, () => this.refs.product_rivers_freight.focus());
};