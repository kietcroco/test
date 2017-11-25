import axios from 'axios';
import { apiNotification } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import alertUtil from '~/utilities/alert';
import { getCurrentLanguage, translate } from '~/utilities/language';
import { Platform } from 'react-native';

const urlReceived = `/tracker/received`;
const urlOpened = `/tracker/opened`;
const urlGetUnread = `/tracker/get-unread`;
const urlResetUnread = `/tracker/reset-unread`;
const urlList = `/notification/list`;
const urlGet = `/notification/get`;

const platform = Platform.select({
	ios: "ios",
	android: "android",
});

export default {

	// hàm xác nhận đã nhận
	received( notification_id ) {

		if (!Registry.get('notificationPlayerID')) {
			
			return alertUtil({
				title: translate("Lỗi"),
				message: translate("Không tìm thấy thông tin app_id")
			});
		}

		// token đăng nhập notification
		const authorization = "Bearer " + (Registry.get("notificationToken") || "");

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();
		
		const deferred = axios({
			url: urlReceived,
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
				player_id: Registry.get('notificationPlayerID'),
				access_token: Registry.get('notificationToken') || "",
				notification_id,
				hl
			}
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// hàm xác nhận đã xem
	opened( notification_id ) {

		if (!Registry.get('notificationPlayerID')) {
			
			return alertUtil({
				title: translate("Lỗi"),
				message: translate("Không tìm thấy thông tin app_id")
			});
		}

		// token đăng nhập notification
		const authorization = "Bearer " + (Registry.get("notificationToken") || "");

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		const deferred = axios({
			url: urlOpened,
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
				player_id: Registry.get('notificationPlayerID'),
				access_token: Registry.get('notificationToken') || "",
				notification_id,
				hl
			}
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// hàm lấy số thông báo chưa đọc
	getUnread() {

		if (!Registry.get('notificationPlayerID')) {
			
			return alertUtil({
				title: translate("Lỗi"),
				message: translate("Không lấy được số thông báo")
			});
		}

		// token đăng nhập notification
		const authorization = "Bearer " + (Registry.get("notificationToken") || "");

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();
		
		const deferred = axios({
			url: urlGetUnread,
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
				player_id: Registry.get('notificationPlayerID'),
				access_token: Registry.get('notificationToken') || "",
				hl
			}
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.then( res => {

			if( res.status === 200 && res.data.STATUS === "OK" ) {

				let unread = Registry.get('unreadNotification') * 1 || 0;
				unread = ((res.data.data * 1) || 0) + unread;
				Registry.set('unreadNotification', unread);
			}
		} );

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// hàm lấy số thông báo chưa đọc
	resetUnread() {

		if (!Registry.get('notificationPlayerID')) {
			
			return alertUtil({
				title: translate("Lỗi"),
				message: translate("Không thể đánh dấu đã đọc thông báo")
			});
		}

		// token đăng nhập notification
		const authorization = "Bearer " + (Registry.get("notificationToken") || "");

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		const deferred = axios({
			url: urlResetUnread,
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
				player_id: Registry.get('notificationPlayerID'),
				access_token: Registry.get('notificationToken') || "",
				hl
			}
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.then( res => {

			if( res.status === 200 && res.data.STATUS === "OK" ) {

				Registry.delete('unreadNotification');
			}
		} );

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// hàm lấy danh sách thông báo
	get(params: Object = {}) {

		// token đăng nhập notification
		const authorization = "Bearer " + (Registry.get("notificationToken") || "");

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();
		params['hl'] = hl;

		var url = urlList;
		if( params['notification_id'] ) {

			url = urlGet;
		}

		params['player_id'] = Registry.get('notificationPlayerID');

		const deferred = axios({
			url,
			baseURL: apiNotification,
			method: "get",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization,
				player_id: Registry.get('notificationPlayerID'),
				platform,
				deviceid // mã thiết bị
			},
			params // options
		});

		deferred.abort = (message: String) => source.cancel(message);
		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},
};