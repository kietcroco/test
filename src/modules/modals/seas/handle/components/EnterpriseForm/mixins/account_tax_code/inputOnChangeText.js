export default function onChangeText( value: String = "" ) {

	this.setState({
		account_tax_code: {
			...this.state.account_tax_code,
			value
		}
	});
};