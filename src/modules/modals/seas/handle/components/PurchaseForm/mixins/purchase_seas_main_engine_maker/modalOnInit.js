export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_seas_main_engine_maker: {
			...this.state.purchase_seas_main_engine_maker,
			label,
			value 
		}
	});
};