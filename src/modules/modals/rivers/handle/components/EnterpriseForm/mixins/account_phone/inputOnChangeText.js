
export default function onChangeText( value: String = "" ) {


		this.setState({
			account_phone: {
				...this.state.account_phone,
				value
			}
		});
};