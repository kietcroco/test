import { translate } from '~/utilities/language';
import isEmail from '~/utilities/isEmail';

export default function onBlur() {

	let editable = this.state.product_roads_contact_phone.editable;
	let messageType = null;
	let message = "";
	let contact_message = "";
	let isEmailDetect = isEmail( this.state.product_roads_contact_email.value );

	// nếu không chọn hình thức nào
	if( 
		!this.state.product_roads_contact_sms.checked &&
		!this.state.product_roads_contact_phone.checked &&
		!this.state.product_roads_contact_email.checked
	) {

		contact_message = `${ translate("Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;

		if( !this.state.product_roads_contact_email.value ) { // nếu email rỗng

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập email") }.`;
		} else if( !isEmailDetect ) { // nếu email không hợp lệ

			messageType = "error";
			message = `${ translate("Email không hợp lệ") }.`;
		}

		this.setState({
			product_roads_contact_phone: {
				...this.state.product_roads_contact_phone,
				messageType: null,
				message: ""
			},
			product_roads_contact_sms: {
				...this.state.product_roads_contact_sms,
				messageType: null,
				message: ""
			},
			product_roads_contact_email: {
				...this.state.product_roads_contact_email,
				messageType,
				message
			},
			contact_message
		}/*, () => (messageType || contact_message) && this.refs.product_roads_contact_email.focus()*/);

		return;
	}

	let messageTypeMail = null;
	let messageMail = "";

	// nếu chưa check cái nào
	if( 
		!this.state.product_roads_contact_phone.checked &&
		!this.state.product_roads_contact_sms.checked
	) {

		// nếu chưa nhập mail
		if( !this.state.product_roads_contact_email.value ) {

			messageTypeMail = "error";
			messageMail = `${ translate("Bạn vui lòng nhập email") }.`;
		} else if( !isEmailDetect ) { // nếu mail bị lỗi

			messageTypeMail = "error";
			messageMail = `${ translate("Email không hợp lệ") }.`;
		}
	}

	// nếu đã chọn phone
	if( this.state.product_roads_contact_phone.checked ) {

		// nếu chưa có dữ liệu
		if( !this.state.product_roads_contact_phone.value ) {

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập số điện thoại") }.`;
		} else if( this.state.product_roads_contact_phone.value.length < 10 ) {

			messageType = "error";
			message = `${ translate("Số điện thoại không hợp lệ") }.`;
		}

		this.setState({
			product_roads_contact_phone: {
				...this.state.product_roads_contact_phone,
				messageType: editable ? messageType : null,
				message: editable ? message : ""
			},
			product_roads_contact_sms: {
				...this.state.product_roads_contact_sms,
				messageType: !editable ? messageType : null,
				message: !editable ? message : ""
			},
			product_roads_contact_email: {
				...this.state.product_roads_contact_email,
				messageType: messageTypeMail,
				message: messageMail
			},
			contact_message
		}/*, () => {

			if( !messageType ) return;

			if( !editable ) {

				return this.refs.product_roads_contact_sms.focus();
			}
			//this.refs.product_roads_contact_sms.focus();
		}*/);

		return;
	}
};