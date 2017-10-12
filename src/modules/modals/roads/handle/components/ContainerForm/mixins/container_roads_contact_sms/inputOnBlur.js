import { translate } from '~/utilities/language';
import isEmail from '~/utilities/isEmail';

export default function onBlur() {

	let editable = this.state.container_roads_contact_sms.editable;
	let messageType = null;
	let message = "";
	let contact_message = "";
	let isEmailDetect = isEmail( this.state.container_roads_contact_email.value );

	// nếu không chọn hình thức nào
	if( 
		!this.state.container_roads_contact_sms.checked &&
		!this.state.container_roads_contact_phone.checked &&
		!this.state.container_roads_contact_email.checked
	) {

		contact_message = `${ translate("Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;

		
		if( !this.state.container_roads_contact_email.value ) { // nếu email rỗng

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập email") }.`;
		} else if( !isEmailDetect ) { // nếu email không hợp lệ

			messageType = "error";
			message = `${ translate("Email không hợp lệ") }.`;
		}

		this.setState({
			container_roads_contact_phone: {
				...this.state.container_roads_contact_phone,
				messageType: null,
				message: ""
			},
			container_roads_contact_sms: {
				...this.state.container_roads_contact_sms,
				messageType: null,
				message: ""
			},
			container_roads_contact_email: {
				...this.state.container_roads_contact_email,
				messageType,
				message
			},
			contact_message
		}/*, () => (messageType || contact_message) && this.refs.container_roads_contact_email.focus()*/);

		return;
	}

	let messageTypeMail = null;
	let messageMail = "";

	// nếu chưa check cái nào
	if( 
		!this.state.container_roads_contact_phone.checked &&
		!this.state.container_roads_contact_sms.checked
	) {

		// nếu chưa nhập mail
		if( !this.state.container_roads_contact_email.value ) {

			messageTypeMail = "error";
			messageMail = `${ translate("Bạn vui lòng nhập email") }.`;
		} else if( !isEmailDetect ) { // nếu mail bị lỗi

			messageTypeMail = "error";
			messageMail = `${ translate("Email không hợp lệ") }.`;
		}
	}

	// nếu đã chọn sms
	if( this.state.container_roads_contact_sms.checked ) {

		// nếu chưa có dữ liệu
		if( !this.state.container_roads_contact_sms.value ) {

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập số điện thoại") }.`;
		} else if( this.state.container_roads_contact_sms.value.length < 10 ) {

			messageType = "error";
			message = `${ translate("Số điện thoại không hợp lệ") }.`;
		}

		this.setState({
			container_roads_contact_sms: {
				...this.state.container_roads_contact_sms,
				messageType: editable ? messageType : null,
				message: editable ? message : ""
			},
			container_roads_contact_phone: {
				...this.state.container_roads_contact_phone,
				messageType: !editable ? messageType : null,
				message: !editable ? message : ""
			},
			container_roads_contact_email: {
				...this.state.container_roads_contact_email,
				messageType: messageTypeMail,
				message: messageMail
			},
			contact_message
		}/*, () => {

			if( !messageType ) return;

			if( !editable ) {

				return this.refs.container_roads_contact_sms.focus();
			}
			//this.refs.container_roads_contact_sms.focus();
		}*/);

		return;
	}
};