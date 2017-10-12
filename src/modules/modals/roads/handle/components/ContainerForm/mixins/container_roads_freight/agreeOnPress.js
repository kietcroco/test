export default function onPress() {
	
	this.state.container_roads_freight.value != "0" && this.setState({
		container_roads_freight: {
			...this.state.container_roads_freight,
			value: "0",
			//messageType: "success",
			//message: ""
		}
	}, () => this.refs.container_roads_freight.focus());
};