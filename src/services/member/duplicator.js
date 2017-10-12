import axios from 'axios';
import { apiDomain } from '~/configs/application';
import Registry from '~/library/Registry';
import deviceid from '~/utilities/deviceID';
import { getCurrentLanguage, translate } from '~/utilities/language';

const url = `/member/duplicator`;

export default {

    // check trùng mã account_code
	checkAccountCode(account_code: String) {

		if( !account_code ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`chưa nhập username`) );
			});
		}

		const authorization = Registry.get('authorization') || "";
		const authIdentity = Registry.get('authIdentity') || null;

		if( authorization && authIdentity && (authIdentity.account_code === account_code || authIdentity.code === account_code) ) {

			return new Promise( resolve => {  

				const init = { 
					status: 200,
					statusText: "OK",
					headers: {'Content-Type': 'application/json'}
				};
				const myResponse = new Response("",init);
				myResponse.data = {
					"STATUS": "OK",
					"message": "",
					"data": ""
				};

				resolve( myResponse );
			});
		}

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
				account_code,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ kiểm tra tài khoản")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// check trùng mã số điện thoại
	checkMobile(account_mobile: String) {

		if( !account_mobile ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Chưa nhập số điện thoại`) );
			});
		}

		if( account_mobile.length < 9 ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Số điện thoại không hợp lệ`) );
			});
		}

		const authorization = Registry.get('authorization') || "";
		const authIdentity = Registry.get('authIdentity') || null;

		if( authorization && authIdentity && authIdentity.account_mobile === account_mobile ) {

			return new Promise( resolve => {  

				const init = { 
					status: 200,
					statusText: "OK",
					headers: {'Content-Type': 'application/json'}
				};
				const myResponse = new Response("",init);
				myResponse.data = {
					"STATUS": "OK",
					"message": "",
					"data": ""
				};

				resolve( myResponse );
			});
		}

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
				account_mobile,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ kiểm tra số điện thoại")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// check trùng email
	checkEmail(account_email: String) {

		if( !account_email ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Chưa nhập email`) );
			});
		}

		const authorization = Registry.get('authorization') || "";
		const authIdentity = Registry.get('authIdentity') || null;

		if( authorization && authIdentity && authIdentity.account_email === account_email ) {

			return new Promise( resolve => {  

				const init = { 
					status: 200,
					statusText: "OK",
					headers: {'Content-Type': 'application/json'}
				};
				const myResponse = new Response("",init);
				myResponse.data = {
					"STATUS": "OK",
					"message": "",
					"data": ""
				};

				resolve( myResponse );
			});
		}

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
				account_email,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ kiểm tra email")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	},

	// check trùng mã số thuế
	checkTaxCode(account_tax_code: String) {

		if( account_tax_code.length < 10 ) {

			return new Promise( (resolve, reject) => {  

				reject( translate(`Mã số thuế không chính xác`) );
			});
		}

		const authorization = Registry.get('authorization') || "";
		const authIdentity = Registry.get('authIdentity') || null;

		if( authorization && authIdentity && authIdentity.account_tax_code === account_tax_code ) {

			return new Promise( resolve => {  

				const init = { 
					status: 200,
					statusText: "OK",
					headers: {'Content-Type': 'application/json'}
				};
				const myResponse = new Response("",init);
				myResponse.data = {
					"STATUS": "OK",
					"message": "",
					"data": ""
				};

				resolve( myResponse );
			});
		}
		
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
				account_tax_code,
				hl
			}
		});

		deferred.abort = (message: String = translate("Huỷ kiểm tra mã số thuế")) => source.cancel(message);

		deferred.isCancel = thrown => axios.isCancel(thrown);

		return deferred;
	}
};