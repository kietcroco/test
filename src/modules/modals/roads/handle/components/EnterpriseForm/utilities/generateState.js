import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';

export default (source: Object = {}, state: Object = {}) => {

	const account = source.account || {};

	let enterprise_roads_career = source.enterprise_roads_career ? source.enterprise_roads_career.split(';') : [];
	enterprise_roads_career = enterprise_roads_career.map(value => {
		return {
			value
		};
	});
	
	state = {
		
		...state,
		account_company_name: {
			value: account.account_company_name ? account.account_company_name : "",
		},

		account_company_name_acronym: {
			value: account.account_company_name_acronym ? account.account_company_name_acronym : "",
		},

		enterprise_roads_career: {
			label: state.enterprise_roads_career ? state.enterprise_roads_career.label : "",
			value: enterprise_roads_career,
		},

		enterprise_roads_vehicle_counter: {
			value: source.enterprise_roads_vehicle_counter ? formatNumberInput(source.enterprise_roads_vehicle_counter) : "",
		},

		account_company_address: {
			value: account.account_company_address ? account.account_company_address : "",
		},

		account_phone: {
			value: account.account_phone ? account.account_phone : "",
		},

		account_mobile: {
			value: account.account_mobile ? account.account_mobile : "",
		},

		account_email: {
			value: account.account_email ? account.account_email : "",
		},

		account_website: {
			value: account.account_website ? account.account_website : "",
		},

		account_tax_code: {
			value: account.account_tax_code ? account.account_tax_code : "",
		},

		account_company_introduce: account.account_company_introduce ? account.account_company_introduce : "",

		account_company_logo: {
			source: getAvatarFromSource(source),
			info: {

			},
			code: source.code || ""
		},
		account_images_information: getImagesFromSource(source),

		/** END */
	};
	return state;
};