import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';

export default (source: Object = {}, state: Object = {}) => {

	const account = source.account || {};
	state = {
		
		...state,

		purchase_roads_type: source.purchase_roads_type || 'SELL',

		/** ## [image]Hình đại diện  ## */
		purchase_roads_avatar: {
			source: getAvatarFromSource(source),
			info: {

			},
			code: source.code || source.purchase_roads_code
		},

		/** ## [select]Loại phương tiện ## */
		purchase_roads_vehicle_type: {
			label: state.purchase_roads_vehicle_type ? state.purchase_roads_vehicle_type.label : "",
			value: source.purchase_roads_vehicle_type ? [{ value: source.purchase_roads_vehicle_type }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## [input]Tải trọng ## */
		purchase_roads_tonnage: {
			value: source.purchase_roads_tonnage ? formatNumberInput(source.purchase_roads_tonnage) : "",
			//messageType: null,
			//message: ""
		},

		/** ## [select]Năm đóng ## */
		purchase_roads_year_built: {
			label: state.purchase_roads_year_built ? state.purchase_roads_year_built.label : "",
			value:source.purchase_roads_year_built ? [{value: `${source.purchase_roads_year_built}`}] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [select]Loại phương tiện ## */
		purchase_roads_country_built: {
			label: state.purchase_roads_country_built ? state.purchase_roads_country_built.label : "",
			value: source.purchase_roads_country_built ? [{ value: source.purchase_roads_country_built }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## [select] Hãng xe ## */
		purchase_roads_trademark: {
			label: state.purchase_roads_trademark ? state.purchase_roads_trademark.label : "",
			value: source.purchase_roads_trademark ? [{ value: source.purchase_roads_trademark }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## [select-geo]Nơi xem ## */
		purchase_roads_place_delivery: {
			label: state.purchase_roads_place_delivery ? state.purchase_roads_place_delivery.label : "",
			value: source.purchase_roads_place_delivery && typeof source.purchase_roads_place_delivery === "object" ? [source.purchase_roads_place_delivery] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [input]Giá đề xuất ## */
		purchase_roads_price: {
			value: source.purchase_roads_price ? formatNumberInput(source.purchase_roads_price) : "0",
			//messageType: null,
			//message: ""
		},

		/** ## [input]sms ## */
		purchase_roads_contact_sms: {
			value: source.purchase_roads_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.purchase_roads_contact_phone || account.account_mobile) && (source.purchase_roads_contact_by == 0 || source.purchase_roads_contact_by == 2) ? true : false
		},

		/** ## [input]Phone ## */
		purchase_roads_contact_phone: {
			value: source.purchase_roads_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.purchase_roads_contact_phone || account.account_mobile) && (source.purchase_roads_contact_by == 0 || source.purchase_roads_contact_by == 1) ? true : false
		},

		/** ## [input]Email ## */
		purchase_roads_contact_email: {
			value: source.purchase_roads_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.purchase_roads_contact_email || !!account.account_email
		},

		/** ## [textarea]Ghi chú ## */
		purchase_roads_information: source.purchase_roads_information || "",

		/** ## [image] Image ## */
		purchase_roads_images: getImagesFromSource(source),

		/** END */

	};

	return state;
};