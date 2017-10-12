import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { AsyncStorage } from 'react-native';
import { getCurrentLanguage, translate } from '~/utilities/language';

const url = `/member/login`;

export default {

	login(username: String, password: String) {

		const authorization = Registry.get('authorization') || "";

		if( (!username || !password) && !authorization ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Username hoặc password không được rỗng`) );
			});
		}

		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		const deferred = axios({
			url,
			baseURL: apiDomain,
			method: "post",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization: username && password ? null : authorization,
				deviceid
			},
			params: {
				hl
			},
			data: {
				username,
				password,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ đăng nhập")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		deferred.then( res => {

			if( res.status === 200 && res.data.STATUS === "OK" && res.headers.authorization ) {

				Registry.set("authorization", res.headers.authorization);
				Registry.set("authIdentity", res.data.data);

				AsyncStorage.setItem('authorization', res.headers.authorization);
			} else {

				Registry.delete("authorization");
				Registry.delete("authIdentity");

				AsyncStorage.removeItem('authorization');
			}
		} ).catch( () => {

			Registry.delete("authorization");
			AsyncStorage.removeItem('authorization');
		} );

		return deferred;
	},

	logout() {

		const authorization = Registry.get('authorization') || "";

		if( !authorization ) {

			return new Promise( (resolve, reject) => {  

				resolve();
			});
		}

		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		const deferred = axios({
			url,
			baseURL: apiDomain,
			method: "put",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization,
				deviceid
			},
			params: {
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ đăng xuất")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		deferred.then( res => {

			if( res.status === 200 && res.data.STATUS === "OK" ) {

				Registry.set("authorization", null);
				Registry.set("authIdentity", null);

				AsyncStorage.removeItem('authorization');
			}
		} );

		return deferred;
	}
};