//import isEmail from '~/utilities/isEmail';


export default function onChangeText( value: String = "" ) {

	this.setState({
		account_email: {
			...this.state.account_email,
			value
		}
	});
};