import { Platform, Alert as BaseAlert, NativeModules } from "react-native";
import { translate } from '~/utilities/language';

var Alert = BaseAlert;

if (Platform.OS === "android") {

	const { CodePushDialog } = NativeModules;

	Alert = {
		...BaseAlert,
		alert : function(title, message, buttons: Array = [], {translate = false, locale} = {}){

			if (! buttons.length ) {
				throw "Can only show buttons for Android dialog.";
			}

			title = title || "Hệ thống có bản cập nhật mới";
			message = message || ( buttons.length > 1 ? "Bạn vui lòng cập nhật phiên bản mới" : "Bạn cần cập nhật phiên bản mới" );

			if( translate ) {

				title = translate( title, locale );
				message = translate( message, locale );

				if( buttons[0] ) {

					buttons[0].text = buttons[0].text ? translate( buttons[0].text ) : null;
				}

				if( buttons[1] ) {

					buttons[1].text = buttons[1].text ? translate( buttons[1].text ) : null;
				}
			}

			const button1Text = buttons[0] ? buttons[0].text : null,
				button2Text = buttons[1] ? buttons[1].text : null;

			CodePushDialog.showDialog(
				title, 
				message, 
				button1Text, 
				button2Text,
				buttonId => { buttons[buttonId].onPress && buttons[buttonId].onPress(); },
				error => { throw error; }
			);
		}
	};
}

export default Alert;