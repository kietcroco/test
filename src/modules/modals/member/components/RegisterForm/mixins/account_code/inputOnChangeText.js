export default function onChangeText( value: String = "" ) {

	//value = value.toUpperCase();
	this.setState({
		account_code: {
			...this.state.account_code,
			value,
			messageType: null,
			message: "",
			isDuplicate: false,
			suggestion: []
		}
	});
};