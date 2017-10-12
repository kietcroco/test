export default function onPress() {
	
	this.state.container_seas_freight.value != "0" && this.setState({
		container_seas_freight: {
			...this.state.container_seas_freight,
			value: "0",
			//messageType: "success",
			//message: ""
		}
	}, () => this.refs.container_seas_freight.focus());
};