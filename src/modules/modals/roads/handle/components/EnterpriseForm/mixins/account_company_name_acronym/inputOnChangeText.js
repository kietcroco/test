export default function onChangeText( value: String = "" ) {

		this.setState({
			account_company_name_acronym: {
				...this.state.account_company_name_acronym,
				value
			}
		});
};