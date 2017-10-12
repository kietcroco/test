import { translate } from '~/utilities/language';

export default function onBlur() {

	let checked = !!this.state.product_seas_contact_skype.value.length;
	//let messageType = null;
	//let message = "";
	//let contact_message = "";

	this.setState({
		product_seas_contact_skype: {
			...this.state.product_seas_contact_skype,
			checked,
	//		messageType,
	//		message
		}
	});
};