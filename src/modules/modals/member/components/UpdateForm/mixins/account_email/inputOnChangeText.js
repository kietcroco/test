export default function onChangeText( value: String = "" ) {

	this.setState({
		account_email: {
			...this.state.account_email,
			value,
			messageType: null,
			message: "",
			isDuplicate: false
		}
	});
};