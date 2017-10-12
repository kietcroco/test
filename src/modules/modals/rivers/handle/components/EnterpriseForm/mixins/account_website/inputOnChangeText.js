
export default function onChangeText( value: String = "" ) {


		this.setState({
			account_website: {
				...this.state.account_website,
				value
			}
		});
};