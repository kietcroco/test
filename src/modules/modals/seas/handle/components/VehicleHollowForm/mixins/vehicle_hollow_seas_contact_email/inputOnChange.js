import { translate } from '~/utilities/language';

export default function onChange( value: String = "" ) {

	let checked = !!value.length;
	let messageType = null;
	let message = "";

	if( !value && !this.state.vehicle_hollow_seas_contact_sms.checked && !this.state.vehicle_hollow_seas_contact_phone.checked ) {

		messageType = "error";
		message = `${ translate("#$seas$#Bạn vui lòng nhập email") }.`;
	}

	this.setState({
		vehicle_hollow_seas_contact_email: {
			...this.state.vehicle_hollow_seas_contact_email,
			value,
			checked,
			messageType,
			message
		},
		contact_message: ""
	});
};