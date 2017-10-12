import { translate } from '~/utilities/language';
import isEmail from '~/utilities/isEmail';

export default function onPress() {

	let editable = false;
	let messageType = null;
	let message = "";
	let contact_message = "";
	let isEmailDetect = isEmail( this.state.vehicle_open_seas_contact_email.value );
	let messageTypeMail = null;
	let messageMail = "";

	// nếu chưa check phone (checked)
	if( !this.state.vehicle_open_seas_contact_phone.checked ) {

		// nếu chưa chọn sms
		if( !this.state.vehicle_open_seas_contact_sms.checked ) {

			editable = true;
		}

		// nếu dữ liệu rỗng thì báo lỗi
		if( !this.state.vehicle_open_seas_contact_phone.value ) {

			messageType = "error";
			message = `${ translate("#$seas$#Bạn vui lòng nhập số điện thoại") }.`;
		} else if( this.state.vehicle_open_seas_contact_phone.value.length < 10 ) {

			messageType = "error";
			message = `${ translate("#$seas$#Số điện thoại không hợp lệ") }.`;
		}

		// kiểm tra value phone nếu chưa có thì báo lỗi
		// huỷ lỗi email
		this.setState({
			vehicle_open_seas_contact_phone: {
				...this.state.vehicle_open_seas_contact_phone,
				checked: true,
				editable,
				messageType: editable ? messageType : null,
				message: editable ? message : ""
			},
			vehicle_open_seas_contact_sms: {
				...this.state.vehicle_open_seas_contact_sms,
				editable: !editable,
				messageType: !editable ? messageType : null,
				message: !editable ? message : ""
			},
			vehicle_open_seas_contact_email: {
				...this.state.vehicle_open_seas_contact_email,
				messageType: messageTypeMail,
				message: messageMail
			},
			contact_message
		}, () => {

			// nếu đang cho phép sửa ở sms thì focus sms
			if( !editable ) {

				this.refs.vehicle_open_seas_contact_sms.focus();
				return;
			} 

			// focus phone
			this.refs.vehicle_open_seas_contact_phone.focus();
		});

		return;
	} 

	// nếu chưa check cái nào
	if( 
		!this.state.vehicle_open_seas_contact_phone.checked &&
		!this.state.vehicle_open_seas_contact_sms.checked
	) {

		// nếu chưa nhập mail
		if( !this.state.vehicle_open_seas_contact_email.value ) {

			messageTypeMail = "error";
			messageMail = `${ translate("#$seas$#Bạn vui lòng nhập email") }.`;
		} else if( !isEmailDetect ) { // nếu mail bị lỗi

			messageTypeMail = "error";
			messageMail = `${ translate("#$seas$#Email không hợp lệ") }.`;
		}
	}

	// nếu đã check (bỏ checked)
	// nếu chưa chọn hình thức nào
	if( !this.state.vehicle_open_seas_contact_sms.checked && !this.state.vehicle_open_seas_contact_email.checked ) {

		// báo lỗi bắt buộc chọn 1
		contact_message = `${ translate("#$seas$#Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;
	}

	if( this.state.vehicle_open_seas_contact_sms.checked ) {

		// nếu dữ liệu rỗng thì báo lỗi
		if( !this.state.vehicle_open_seas_contact_sms.value ) {

			messageType = "error";
			message = `${ translate("#$seas$#Bạn vui lòng nhập số điện thoại") }.`;
		} else if( this.state.vehicle_open_seas_contact_sms.value.length < 10 ) {

			messageType = "error";
			message = `${ translate("#$seas$#Số điện thoại không hợp lệ") }.`;
		}
	}

	this.setState({
		vehicle_open_seas_contact_phone: {
			...this.state.vehicle_open_seas_contact_phone,
			checked: false,
			editable,
			messageType: null,
			message: ""
		},
		vehicle_open_seas_contact_sms: {
			...this.state.vehicle_open_seas_contact_sms,
			editable: !editable,
			messageType,
			message
		},
		vehicle_open_seas_contact_email: {
			...this.state.vehicle_open_seas_contact_email,
			messageType: messageTypeMail,
			message: messageMail
		},
		contact_message
	}, () => {

		// nếu có chọn sms nhưng rỗng
		if( this.state.vehicle_open_seas_contact_sms.checked && !this.state.vehicle_open_seas_contact_sms.value ) {

			this.refs.vehicle_open_seas_contact_sms.focus();
		} else if(messageType || contact_message) { // focus vào email nếu có lỗi

			this.refs.vehicle_open_seas_contact_email.focus();
		}
	}); 
};