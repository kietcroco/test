import isEmail from '~/utilities/isEmail';
import { translate } from '~/utilities/language';

export default function onSubmitEditing() {

	let checked = isEmail( this.state.product_roads_contact_email.value );
	let messageType = null;
	let message = "";
	let contact_message = "";

	if( !checked && !this.state.product_roads_contact_phone.checked && !this.state.product_roads_contact_sms.checked ){

		messageType = "error";
		message = `${ translate("Bạn vui lòng nhập email") }.`;
		contact_message = `${ translate("Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;
	} else if( this.state.product_roads_contact_email.value && !checked ) {

		messageType = "error";
		message = `${ translate("Email không hợp lệ") }.`
	} 

	this.setState({
		product_roads_contact_email: {
			...this.state.product_roads_contact_email,
			checked,
			messageType,
			message
		},
		contact_message
	}, () => this.refs.product_roads_information.focus());
};