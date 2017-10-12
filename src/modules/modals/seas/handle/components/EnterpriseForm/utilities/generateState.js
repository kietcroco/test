import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';

export default (source: Object = {}, state: Object = {}) => {

	const account = source.account || {};

	let enterprise_seas_career = source.enterprise_seas_career ? source.enterprise_seas_career.split(';') : [];
	enterprise_seas_career = enterprise_seas_career.map(value => {

		return {
			value
		};
	});
	
	state = {
		...state,

		// tên công ty
		account_company_name: {
			value: account.account_company_name ? account.account_company_name : "",
		},

		// tên viết tắt
		account_company_name_acronym: {
			value: account.account_company_name_acronym ? account.account_company_name_acronym : "",
		},

		// ngành nghề
		enterprise_seas_career: {
			label: state.enterprise_seas_career ? state.enterprise_seas_career.label : "",
			value: enterprise_seas_career,
		},

		// số phương tiện
		enterprise_seas_vehicle_counter: {
			value: source.enterprise_seas_vehicle_counter ? formatNumberInput(source.enterprise_seas_vehicle_counter) : "",
		},

		// địa chỉ cônt ty
		account_company_address: {
			value: account.account_company_address ? account.account_company_address : "",
		},

		// số điện thoại cố định
		account_phone: {
			value: account.account_phone ? account.account_phone : "",
		},

		// điện thoại di động
		account_mobile: {
			value: account.account_mobile ? account.account_mobile : "",
		},

		// email
		account_email: {
			value: account.account_email ? account.account_email : "",
		},

		// website
		account_website: {
			value: account.account_website ? account.account_website : "",
		},

		// mã số thuế
		account_tax_code: {
			value: account.account_tax_code ? account.account_tax_code : "",
		},

		// giới thiệu
		account_company_introduce: account.account_company_introduce ? account.account_company_introduce : "",

		// logo
		account_company_logo: {
			source: getAvatarFromSource(source),
			info: {

			},
			code: source.code || source.account_code || ""
		},
		account_images_information: getImagesFromSource(source),
	};

	return state;
};