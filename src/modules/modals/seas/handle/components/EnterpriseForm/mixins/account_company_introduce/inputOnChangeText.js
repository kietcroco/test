import isEmail from '~/utilities/isEmail';
import { translate } from '~/utilities/language';

export default function onChangeText( value: String = "" ) {

	this.setState({
		account_company_introduce: value
	});
};