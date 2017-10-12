import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default (source: Object = {}, state: Object = {}) => {

	const account = source.account || {};
	state = {
		
		...state,

		purchase_rivers_type: source.purchase_rivers_type || 'SELL',

		/** ## [image]Hình đại diện  ## */
		purchase_rivers_avatar: {
			source: getAvatarFromSource(source),
			info: {

			},
			code: source.code || source.purchase_rivers_code
		},

		/** ## [select]Loại phương tiện ## */
		purchase_rivers_vehicle_type: {
			label: state.purchase_rivers_vehicle_type ? state.purchase_rivers_vehicle_type.label : "",
			value: source.purchase_rivers_vehicle_type ? [{ value: source.purchase_rivers_vehicle_type }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## [input]Tải trọng ## */
		purchase_rivers_tonnage: {
			value: source.purchase_rivers_tonnage ? formatNumberInput(source.purchase_rivers_tonnage) : "",
			//messageType: null,
			//message: ""
		},

		/** ## [select]Năm đóng ## */
		purchase_rivers_year_built: {
			label: state.purchase_rivers_year_built ? state.purchase_rivers_year_built.label : "",
			value:source.purchase_rivers_year_built ? [{value: `${source.purchase_rivers_year_built}`}] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [select-geo]Nơi xem ## */
		purchase_rivers_place_delivery: {
			label: state.purchase_rivers_place_delivery ? state.purchase_rivers_place_delivery.label : "",
			value: source.purchase_rivers_place_delivery && typeof source.purchase_rivers_place_delivery === "object" ? [source.purchase_rivers_place_delivery] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [input]Giá đề xuất ## */
		purchase_rivers_price: {
			value: source.purchase_rivers_price ? formatNumberInput(source.purchase_rivers_price) : "0",
			//messageType: null,
			//message: ""
		},

		/** ## [input]sms ## */
		purchase_rivers_contact_sms: {
			value: source.purchase_rivers_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.purchase_rivers_contact_phone || account.account_mobile) && (source.purchase_rivers_contact_by == 0 || source.purchase_rivers_contact_by == 2) ? true : false
		},

		/** ## [input]Phone ## */
		purchase_rivers_contact_phone: {
			value: source.purchase_rivers_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.purchase_rivers_contact_phone || account.account_mobile) && (source.purchase_rivers_contact_by == 0 || source.purchase_rivers_contact_by == 1) ? true : false
		},

		/** ## [input]Email ## */
		purchase_rivers_contact_email: {
			value: source.purchase_rivers_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.purchase_rivers_contact_email || !!account.account_email
		},

		/** ## [select-geo]Nơi đóng ## */
		purchase_rivers_place_built: {
			label: source.purchase_rivers_place_built ? `${source.purchase_rivers_place_built}` : "",
			value: source.purchase_rivers_place_built && typeof source.purchase_rivers_place_built === "object" ? [source.purchase_rivers_place_built] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [input]Kích thước ## */
		purchase_rivers_size_tunnel: source.purchase_rivers_size_tunnel || "",

		/** ## [textarea]Ghi chú ## */
		purchase_rivers_information: source.purchase_rivers_information || "",

		/** ## [image] Image ## */
		purchase_rivers_images: getImagesFromSource(source),

		/** END */

	};

	return state;
};