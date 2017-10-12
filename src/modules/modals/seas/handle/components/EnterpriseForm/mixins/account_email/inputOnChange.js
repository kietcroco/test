import { translate } from '~/utilities/language';

export default function onChange( value: String = "" ) {

	this.setState({
		account_email: {
			...this.state.account_email,
			value
		}
	});
};