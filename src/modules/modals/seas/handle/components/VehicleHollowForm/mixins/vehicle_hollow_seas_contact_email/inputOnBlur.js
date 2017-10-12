import { translate } from '~/utilities/language';

export default function onBlur() {

	let checked = !!this.state.vehicle_hollow_seas_contact_email.value.length;
	let messageType = null;
	let message = "";
	let contact_message = "";

	if( !checked && !this.state.vehicle_hollow_seas_contact_phone.checked && !this.state.vehicle_hollow_seas_contact_sms.checked ){

		messageType = "error";
		message = `${ translate("#$seas$#Bạn vui lòng nhập email") }.`;
		contact_message = `${ translate("#$seas$#Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;
	} else if( this.state.vehicle_hollow_seas_contact_email.value && !checked ) {

		messageType = "error";
		message = `${ translate("#$seas$#Email không hợp lệ") }.`;
	}

	this.setState({
		vehicle_hollow_seas_contact_email: {
			...this.state.vehicle_hollow_seas_contact_email,
			checked,
			messageType,
			message
		},
		contact_message
	});
};