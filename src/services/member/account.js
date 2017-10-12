import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { getCurrentLanguage, translate } from '~/utilities/language';

const url = `/member/account`;

export default {

	get(params: Object = {}) {
		
		// prefix id theo chuẩn restful
		if (params.account_id) {

			params['id'] = params.account_id;
		}

		// token đăng nhập
		const authorization = Registry.get('authorization') || "";
		params["hl"] = getCurrentLanguage();

		// cancel request token
		const source = axios.CancelToken.source();

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

	// đăng ký
	register(data: object = {}) {

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
				...data,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ đăng ký")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// cập nhật tài khoản
	update( id, data: Object = {} ) {

		const authorization = Registry.get('authorization') || "";

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
			params: { id: id, hl },
			data: { ...data, id, hl }
		});

		deferred.abort = (message: String = translate("Huỷ cập nhật")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	}
};