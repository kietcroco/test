export default function onChangeText( value: String = "" ) {

	if( this.state.value !== value ) {

		this.setState({
			account_tax_code: {
				...this.state.account_tax_code,
				value
			}
		});
	}
};