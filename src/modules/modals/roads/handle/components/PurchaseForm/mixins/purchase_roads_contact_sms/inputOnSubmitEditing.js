import isEmail from '~/utilities/isEmail';
import { translate } from '~/utilities/language';

export default function onSubmitEditing() {

	let editable = this.state.purchase_roads_contact_sms.editable;
	let messageType = null;
	let message = "";
	let contact_message = "";
	let isEmailDetect = isEmail( this.state.purchase_roads_contact_email.value );

	// nếu không chọn hình thức nào
	if( 
		!this.state.purchase_roads_contact_sms.checked &&
		!this.state.purchase_roads_contact_phone.checked &&
		!this.state.purchase_roads_contact_email.checked
	) {

		contact_message = `${ translate("Bạn không muốn giao dịch bằng SMS, Điện thoại mời bạn nhập Email") }.`;

		
		if( !this.state.purchase_roads_contact_email.value ) { // nếu email rỗng

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập email") }.`;
		} else if( !isEmailDetect ) { // nếu email không hợp lệ

			messageType = "error";
			message = `${ translate("Email không hợp lệ") }.`;
		}

		this.setState({
			purchase_roads_contact_phone: {
				...this.state.purchase_roads_contact_phone,
				messageType: null,
				message: ""
			},
			purchase_roads_contact_sms: {
				...this.state.purchase_roads_contact_sms,
				messageType: null,
				message: ""
			},
			purchase_roads_contact_email: {
				...this.state.purchase_roads_contact_email,
				messageType,
				message
			},
			contact_message
		}, () => {

			if( !editable ) {

				return this.refs.purchase_roads_contact_phone.focus();
			}
			this.refs.purchase_roads_contact_email.focus();
		});

		return;
	}

	// nếu đã chọn sms
	if( this.state.purchase_roads_contact_sms.checked ) {

		// nếu chưa có dữ liệu
		if( !this.state.purchase_roads_contact_sms.value ) {

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập số điện thoại") }.`;
		} else if( this.state.purchase_roads_contact_sms.value.length < 10 ) {

			messageType = "error";
			message = `${ translate("Số điện thoại không hợp lệ") }.`;
		}

		this.setState({
			purchase_roads_contact_sms: {
				...this.state.purchase_roads_contact_sms,
				messageType: editable ? messageType : null,
				message: editable ? message : ""
			},
			purchase_roads_contact_phone: {
				...this.state.purchase_roads_contact_phone,
				messageType: !editable ? messageType : null,
				message: !editable ? message : ""
			},
			purchase_roads_contact_email: {
				...this.state.purchase_roads_contact_email,
				messageType: !isEmailDetect ? this.state.purchase_roads_contact_email.messageType : null,
				message: !isEmailDetect ? this.state.purchase_roads_contact_email.message : "",
			},
			contact_message
		}, () => {

			if( !editable ) {

				return this.refs.purchase_roads_contact_phone.focus();
			}
			this.refs.purchase_roads_contact_email.focus();
		});

		return;
	}
};