export default function onChangeText( value: String = "" ) {

	this.setState({
		account_company_address: {
			...this.state.account_company_address,
			value
		}
	});
};