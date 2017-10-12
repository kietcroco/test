import isEmail from '~/utilities/isEmail';
import { translate } from '~/utilities/language';

export default function onSubmitEditing() {

	let editable = this.state.product_roads_contact_sms.editable;
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
		}, () => {

			if( !editable ) {

				return this.refs.product_roads_contact_phone.focus();
			}
			this.refs.product_roads_contact_email.focus();
		});

		return;
	}

	// nếu đã chọn sms
	if( this.state.product_roads_contact_sms.checked ) {

		// nếu chưa có dữ liệu
		if( !this.state.product_roads_contact_sms.value ) {

			messageType = "error";
			message = `${ translate("Bạn vui lòng nhập số điện thoại") }.`;
		} else if( this.state.product_roads_contact_sms.value.length < 10 ) {

			messageType = "error";
			message = `${ translate("Số điện thoại không hợp lệ") }.`;
		}

		this.setState({
			product_roads_contact_sms: {
				...this.state.product_roads_contact_sms,
				messageType: editable ? messageType : null,
				message: editable ? message : ""
			},
			product_roads_contact_phone: {
				...this.state.product_roads_contact_phone,
				messageType: !editable ? messageType : null,
				message: !editable ? message : ""
			},
			product_roads_contact_email: {
				...this.state.product_roads_contact_email,
				messageType: !isEmailDetect ? this.state.product_roads_contact_email.messageType : null,
				message: !isEmailDetect ? this.state.product_roads_contact_email.message : "",
			},
			contact_message
		}, () => {

			if( !editable ) {

				return this.refs.product_roads_contact_phone.focus();
			}
			this.refs.product_roads_contact_email.focus();
		});

		return;
	}
};