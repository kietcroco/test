export default function onChangeText( value: String = "" ) {

	this.setState({
		account_password: {
			...this.state.account_password,
			value,
			messageType: null,
			message: ""
		}
	});
};