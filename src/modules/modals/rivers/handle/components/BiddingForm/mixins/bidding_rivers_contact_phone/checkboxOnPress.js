import { translate } from '~/utilities/language';
import isEmail from '~/utilities/isEmail';

export default function onPress() {

	let editable = false;
	let messageType = null;
	let message = "";
	let contact_message = "";
	let isEmailDetect = isEmail( this.state.bidding_rivers_contact_email.value );
	let messageTypeMail = null;
	let messageMail = "";

	// nếu chưa check phone (checked)
	if( !this.state.bidding_rivers_contact_phone.checked ) {

		// nếu chưa chọn sms
		if( !this.state.bidding_rivers_contact_sms.checked ) {

			editable = true;
		}

		// nếu dữ liệu rỗng thì báo lỗi
		if( !this.state.bidding_rivers_contact_phone.value ) {

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập số điện thoại") }.`;
		} else if( this.state.bidding_rivers_contact_phone.value.length < 10 ) {

			messageType = "error";
			message = `${ translate("Số điện thoại không hợp lệ") }.`;
		}

		// kiểm tra value phone nếu chưa có thì báo lỗi
		// huỷ lỗi email
		this.setState({
			bidding_rivers_contact_phone: {
				...this.state.bidding_rivers_contact_phone,
				checked: true,
				editable,
				messageType: editable ? messageType : null,
				message: editable ? message : ""
			},
			bidding_rivers_contact_sms: {
				...this.state.bidding_rivers_contact_sms,
				editable: !editable,
				messageType: !editable ? messageType : null,
				message: !editable ? message : ""
			},
			bidding_rivers_contact_email: {
				...this.state.bidding_rivers_contact_email,
				messageType: messageTypeMail,
				message: messageMail
			},
			contact_message
		}, () => {

			// nếu đang cho phép sửa ở sms thì focus sms
			if( !editable ) {

				this.refs.bidding_rivers_contact_sms.focus();
				return;
			} 

			// focus phone
			this.refs.bidding_rivers_contact_phone.focus();
		});

		return;
	} 

	// nếu chưa check cái nào
	if( 
		!this.state.bidding_rivers_contact_phone.checked &&
		!this.state.bidding_rivers_contact_sms.checked
	) {

		// nếu chưa nhập mail
		if( !this.state.bidding_rivers_contact_email.value ) {

			messageTypeMail = "error";
			messageMail = `${ translate("Bạn vui lòng nhập email") }.`;
		} else if( !isEmailDetect ) { // nếu mail bị lỗi

			messageTypeMail = "error";
			messageMail = `${ translate("Email không hợp lệ") }.`;
		}
	}

	// nếu đã check (bỏ checked)
	// nếu chưa chọn hình thức nào
	if( !this.state.bidding_rivers_contact_sms.checked && !this.state.bidding_rivers_contact_email.checked ) {

		// báo lỗi bắt buộc chọn 1
		contact_message = `${ translate("Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;
	}

	if( this.state.bidding_rivers_contact_sms.checked ) {

		// nếu dữ liệu rỗng thì báo lỗi
		if( !this.state.bidding_rivers_contact_sms.value ) {

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập số điện thoại") }.`;
		} else if( this.state.bidding_rivers_contact_sms.value.length < 10 ) {

			messageType = "error";
			message = `${ translate("Số điện thoại không hợp lệ") }.`;
		}
	}

	this.setState({
		bidding_rivers_contact_phone: {
			...this.state.bidding_rivers_contact_phone,
			checked: false,
			editable,
			messageType: null,
			message: ""
		},
		bidding_rivers_contact_sms: {
			...this.state.bidding_rivers_contact_sms,
			editable: !editable,
			messageType,
			message
		},
		bidding_rivers_contact_email: {
			...this.state.bidding_rivers_contact_email,
			messageType: messageTypeMail,
			message: messageMail
		},
		contact_message
	}, () => {

		// nếu có chọn sms nhưng rỗng
		if( this.state.bidding_rivers_contact_sms.checked && !this.state.bidding_rivers_contact_sms.value ) {

			this.refs.bidding_rivers_contact_sms.focus();
		} else if(messageType || contact_message) { // focus vào email nếu có lỗi

			this.refs.bidding_rivers_contact_email.focus();
		}
	}); 
};