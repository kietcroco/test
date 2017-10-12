export default function onChangeText( value: String = "" ) {

	this.setState({
		account_mobile: {
			...this.state.account_mobile,
			value,
			messageType: null,
			message: "",
			isDuplicate: false
		}
	});
};