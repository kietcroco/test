import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { getCurrentLanguage } from '~/utilities/language';

const url = `/roads/vehicle`;

export default {

    check(code) {

        const params = {};

        params['vehicle_code'] = code;

        // token đăng nhập
        const authorization = Registry.get('authorization') || "";

        // cancel request token
        const source = axios.CancelToken.source();
        const hl = getCurrentLanguage();
        params['hl'] = hl;

        //console.log({'url' :url, 'params' : params , 'baseURL' : apiDomain });
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