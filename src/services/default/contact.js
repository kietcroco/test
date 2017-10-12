import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { getCurrentLanguage } from '~/utilities/language';

const url = `/default/contact`;

export default {

	add(data: Object = {}) {

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
				deviceid // mã thiết bị
			},
			params: {
				hl
			},
			data: {
				...data,
				hl
			}
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	}
	
};