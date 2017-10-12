import isEmail from '~/utilities/isEmail';
import { translate } from '~/utilities/language';

export default function onBlur() {

	let checked = isEmail( this.state.vehicle_open_roads_contact_email.value );
	let messageType = null;
	let message = "";
	let contact_message = "";

	if( !checked && !this.state.vehicle_open_roads_contact_phone.checked && !this.state.vehicle_open_roads_contact_sms.checked ){

		messageType = "error";
		message = `${ translate("Bạn vui lòng nhập email") }.`;
		contact_message = `${ translate("Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;
	} else if( this.state.vehicle_open_roads_contact_email.value && !checked ) {

		messageType = "error";
		message = `${ translate("Email không hợp lệ") }.`;
	}

	this.setState({
		vehicle_open_roads_contact_email: {
			...this.state.vehicle_open_roads_contact_email,
			checked,
			messageType,
			message
		},
		contact_message
	});
};