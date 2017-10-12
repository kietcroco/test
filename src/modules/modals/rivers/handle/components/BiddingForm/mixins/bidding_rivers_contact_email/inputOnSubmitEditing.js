import isEmail from '~/utilities/isEmail';
import { translate } from '~/utilities/language';

export default function onSubmitEditing() {

	let checked = isEmail( this.state.bidding_rivers_contact_email.value );
	let messageType = null;
	let message = "";
	let contact_message = "";

	if( !checked && !this.state.bidding_rivers_contact_phone.checked && !this.state.bidding_rivers_contact_sms.checked ){

		messageType = "error";
		message = `${ translate("Bạn vui lòng nhập email") }.`;
		contact_message = `${ translate("Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;
	} else if( this.state.bidding_rivers_contact_email.value && !checked ) {

		messageType = "error";
		message = `${ translate("Email không hợp lệ") }.`
	} 

	this.setState({
		bidding_rivers_contact_email: {
			...this.state.bidding_rivers_contact_email,
			checked,
			messageType,
			message
		},
		contact_message
	}, () => this.refs.product_rivers_information.focus());
};