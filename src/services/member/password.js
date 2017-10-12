import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { AsyncStorage } from 'react-native';
import { getCurrentLanguage, translate } from '~/utilities/language';

const url = `/member/password`;

export default {

	// lấy mã code
	forgetPassword(account_mobile: String = "") {

		if( !account_mobile || account_mobile.length < 10 ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Số điện thoại không hợp lệ`) );
			});
		}

		const authorization = Registry.get('authorization') || "";

		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		const deferred = axios({
			url,
			baseURL: apiDomain,
			method: "get",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization: authorization,
				deviceid
			},
			params: {
				id: account_mobile,
                account_mobile,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ reset password")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// xác nhận quên mật khẩu
	forgotPassword(account_mobile: String = "", confirm_code: String = "") {

		if( !account_mobile || account_mobile.length < 10 ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Số điện thoại không hợp lệ`) );
			});
		}
		if( !confirm_code || confirm_code.length < 4 ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Mã xác nhận không hợp lệ`) );
			});
		}
		
		const authorization = Registry.get('authorization') || "";

		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		const deferred = axios({
			url,
			baseURL: apiDomain,
			method: "post",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization: authorization,
				deviceid
			},
			params: {
				hl
			},
			data: {
				account_mobile,
				confirm_code,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ reset password")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		deferred.then( res => {

			if( res.status === 200 && res.data.STATUS === "OK" && res.headers.authorization ) {

				Registry.set("authorization", res.headers.authorization);
				Registry.set("authIdentity", res.data.data);

				AsyncStorage.setItem('authorization', res.headers.authorization);
			}
		} );

		return deferred;
	},

	// đổi mật khẩu
	changePassword( account_password: String = "", account_password_retype: String = "" ) {

		if( !account_password ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Password không được rỗng`) );
			});
		}
		if( account_password.length < 4 ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Password tối thiểu 4 ký tự`) );
			});
		}

		if( account_password_retype !== account_password ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Password không trùng khớp`) );
			});
		}
		
		const authorization = Registry.get('authorization') || "";

		if( !authorization ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Bạn chưa được đăng nhập`) );
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
				authorization: authorization,
				deviceid
			},
			params: {
				hl
			},
			data: {
				account_password,
				account_password_retype,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ đổi mật khẩu")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		deferred.then( res => {

			if( res.status === 200 && res.data.STATUS === "OK" && res.headers.authorization ) {

				Registry.set("authorization", res.headers.authorization);
				Registry.set("authIdentity", res.data.data);

				AsyncStorage.setItem('authorization', res.headers.authorization);
			}
		} );

		return deferred;
	}
};