import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { getCurrentLanguage } from '~/utilities/language';

const url = `/news/category`;

export default {

	get(params: Object = {}) {
        
		// token đăng nhập
		const authorization = Registry.get('authorization') || "";

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();
		params["hl"] = hl;

		const deferred = axios({
			url,
			baseURL: apiDomain,
			method: "get",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization,
				deviceid // mã thiết bị
			},
			params // options
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},
	
};