//import { translate } from '~/utilities/language';

export default function onSubmitEditing() {

	let checked = !!this.state.purchase_seas_contact_skype.value.length;
	//let messageType = null;
	//let message = "";
	//let contact_message = "";

	this.setState({
		purchase_seas_contact_skype: {
			...this.state.purchase_seas_contact_skype,
			checked,
	//		messageType,
	//		message
		}
	});
};