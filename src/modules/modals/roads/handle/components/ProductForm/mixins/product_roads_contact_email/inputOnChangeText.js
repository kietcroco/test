import isEmail from '~/utilities/isEmail';
import { translate } from '~/utilities/language';

export default function onChangeText( value: String = "" ) {

	let checked = isEmail( value );
	let messageType = null;
	let message = "";

	if( !value && !this.state.product_roads_contact_sms.checked && !this.state.product_roads_contact_phone.checked ) {

		messageType = "error";
		message = `${ translate("Bạn vui lòng nhập email") }.`;
	}

	this.setState({
		product_roads_contact_email: {
			...this.state.product_roads_contact_email,
			value,
			checked,
			messageType,
			message
		},
		contact_message: ""
	});
};