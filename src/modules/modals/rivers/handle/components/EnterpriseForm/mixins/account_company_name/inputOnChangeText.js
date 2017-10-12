export default function onChangeText( value: String = "" ) {

	this.setState({
		account_company_name: {
			...this.state.account_company_name,
			value
		}
	});
};