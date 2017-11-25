import axios from 'axios';
import { apiDomain, apiNotification } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import alertUtil from '~/utilities/alert';
import { getCurrentLanguage, translate } from '~/utilities/language';
import { Platform } from 'react-native';

const url = `/notification/subscrice`;
const unSubscriceUrl = `/subscriber/unsubscrice`;
const platform = Platform.select({
	ios: "ios",
	android: "android",
});

export default {

	subscrice() {

		if (!Registry.get('notificationPlayerID')) {
			
			return alertUtil({
				title: translate("Lỗi"),
				message: translate("Không thể đăng ký nhận thông báo")
			});
		}

		// token đăng nhập
		const authorization = Registry.get('authorization') || "";

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		const deferred = axios({
			url,
			baseURL: apiDomain,
			method: "post",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization,
				player_id: Registry.get('notificationPlayerID'),
				platform,
				deviceid // mã thiết bị
			},
			params: {
				hl
			},
			data: {
				player_id: Registry.get('notificationPlayerID'),
				hl
			}
		});

		deferred.then( res => {

			if( res.status === 200 && res.data.STATUS === "OK" && res.data.data && res.data.data.user_token ) {

				Registry.set("notificationToken", res.data.data.user_token);
			} else {

				Registry.delete("notificationToken");
			}
		} ).catch( () => {

			Registry.delete("notificationToken");
		} );

		deferred.abort = (message: String) => source.cancel(message);
		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	unSubscrice() {

		// token đăng nhập notification
		const authorization = "Bearer " + Registry.get("notificationToken");

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		const deferred = axios({
			url: unSubscriceUrl,
			baseURL: apiNotification,
			method: "post",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization,
				player_id: Registry.get('notificationPlayerID'),
				platform,
				deviceid // mã thiết bị
			},
			params: {
				hl
			},
			data: {
				access_token: Registry.get("notificationToken"),
				player_id: Registry.get('notificationPlayerID'),
				hl
			}
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},
};