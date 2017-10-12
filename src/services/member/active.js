import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { AsyncStorage } from 'react-native';
import { getCurrentLanguage, translate } from '~/utilities/language';

const url = `/member/active-mobile`;

export default {

    // active
	active(account_mobile: String = "", comfirm_code: String = "") {

        if( !account_mobile || !comfirm_code ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Active không thành công`) );
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
				authorization,
				deviceid
			},
			params: {
				hl
			},
			data: {
                account_mobile,
				code: comfirm_code,
				hl
            }
		});

		deferred.abort = (message: String = translate("Huỷ active")) => source.cancel(message);

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

	// gửi lại mã
	reSendActiveCode( account_mobile: String = "" ) {

		if( !account_mobile ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Active không thành công`) );
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
				authorization,
				deviceid
			},
			params: {
				id: account_mobile,
				hl
            }
		});

		deferred.abort = (message: String = translate("Huỷ active")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	}
};