import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import alertUtil from '~/utilities/alert';
import { getCurrentLanguage, translate } from '~/utilities/language';

const url = `/seas/vehicle-open`;

export default {

	get(params: Object = {}) {

		// prefix id theo chuẩn restful
		if (params.vehicle_open_seas_id) {

			params['id'] = params.vehicle_open_seas_id;
		}

		// khu vực
		if (params.areasArr && Array.isArray(params.areasArr)) {

			params.areasArr = params.areasArr.join(',');
		}

		// token đăng nhập
		const authorization = Registry.get('authorization') || "";

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();
		params['hl'] = hl;


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
	},
	update(id, data: Object = {}) {
		// token đăng nhập
		const authorization = Registry.get('authorization') || "";

		// cancel request token
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
				deviceid // mã thiết bị
			},
			params : {'id' : id, hl},
			data: {...data,id, hl}
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},
	remove(id) {
		// token đăng nhập
		const authorization = Registry.get('authorization') || "";

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();

		if (!id) {
			
			return alertUtil({
				title: translate("#$seas$#Lỗi"),
				message: translate("#$seas$#Không tìm thấy thông tin")
			});
		}

		const params = { id: id, hl };

		const deferred = axios({
			url,
			baseURL: apiDomain,
			method: "delete",
			cancelToken: source.token,
			headers: {
				Accept: "application/json",
				authorization,
				deviceid // mã thiết bị
			},
			params //data // data
		});

		deferred.abort = (message: String) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},
	handle(id) {

		const params = {};

		params['id'] = 0;
		params['mode'] = "add";

		if (id) {

			params["id"] = id;
			params["mode"] = "update";
		}

		// token đăng nhập
		const authorization = Registry.get('authorization') || "";

		// cancel request token
		const source = axios.CancelToken.source();
		const hl = getCurrentLanguage();
		params["hl"] = hl;

		//console.log({'url' : url , 'params' : params , 'baseURL' : apiDomain});

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

	}
};