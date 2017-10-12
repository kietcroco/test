//import { translate } from '~/utilities/language';

export default function onBlur() {

	let checked = !!this.state.container_seas_contact_skype.value.length;
	//let messageType = null;
	//let message = "";
	//let contact_message = "";

	this.setState({
		container_seas_contact_skype: {
			...this.state.container_seas_contact_skype,
			checked,
	//		messageType,
	//		message
		}
	});
};