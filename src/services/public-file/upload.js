import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { getCurrentLanguage, translate } from '~/utilities/language';

const url = `/public-file/upload`;

export default {

	uploadImage(data: Object = {}) {

        if( !data.data || !data.fileName || !data.type ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Lỗi định dạng`) );
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
				content: data.data,
                name: data.fileName,
                type: data.type,
                size: data.fileSize,
                width: data.width,
                height: data.height,
                isVertical: data.isVertical,
				originalRotation: data.originalRotation,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ upload")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	}
};