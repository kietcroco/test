import { translate } from '~/utilities/language';

export default function onSubmitEditing() {

	let checked = !!this.state.product_seas_contact_email.value.length;
	let messageType = null;
	let message = "";
	let contact_message = "";

	if( !checked && !this.state.product_seas_contact_phone.checked && !this.state.product_seas_contact_sms.checked ){

		messageType = "error";
		message = `${ translate("#$seas$#Bạn vui lòng nhập email") }.`;
		contact_message = `${ translate("#$seas$#Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;
	} else if( this.state.product_seas_contact_email.value && !checked ) {

		messageType = "error";
		message = `${ translate("#$seas$#Email không hợp lệ") }.`
	} 

	this.setState({
		product_seas_contact_email: {
			...this.state.product_seas_contact_email,
			checked,
			messageType,
			message
		},
		contact_message
	});
};