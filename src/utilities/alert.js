import { Alert } from 'react-native';
import { translate } from '~/utilities/language';

export default ({
	type = "message",
	title,
	message,
	actions,
	cancelable = false,
	translate = false,
	locale
}) => {

	if( !title && !message ) {

		return false;
	}

	if( translate ) {

		message = message ? translate( message, locale ) : message;
		title = title ? translate( title, locale ) : title;
	}

	if( !title ) {

		type = (type || "").toLowerCase();

		switch (type) {
			case "error":
			
				title = translate("Lỗi");
				break;
			case "warning":
			
				title = translate("Cảnh báo");
				break;
			
			case "infomation":
			
				title = translate("Tin nhắn");
				break;

			case "message":
			default:
				title = translate("Thông báo");
				break;
		}
	}

	actions = actions || [
		{
            text: 'OK', onPress: () => {}, style: 'cancel'
        }
	];

	return (
		Alert.alert(
			`${title}`,
			`${message}` || "",
			actions,
			{ cancelable: cancelable }
		)
	);
};