export default function onPress() {
	
	this.state.product_roads_freight.value != "0" && this.setState({
		product_roads_freight: {
			...this.state.product_roads_freight,
			value: "0",
			//messageType: "success",
			//message: ""
		}
	}, () => this.refs.product_roads_freight.focus());
};