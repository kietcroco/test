import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';

export default (source: Object = {}, state: Object = {}) => {

	const account = source.account || {};
	state = {
		
		...state,

		purchase_seas_type: source.purchase_seas_type || 'SELL',

		/** ## [image]Hình đại diện  ## */
		purchase_seas_avatar: {
			source: getAvatarFromSource(source),
			info: {

			},
			code: source.code || source.purchase_seas_code
		},

		/** ## [select]Loại phương tiện ## */
		purchase_seas_vehicle_type: {
			label: state.purchase_seas_vehicle_type ? state.purchase_seas_vehicle_type.label : "",
			value: source.purchase_seas_vehicle_type ? [{ value: source.purchase_seas_vehicle_type }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## [input]Tải trọng ## */
		purchase_seas_dwt: {
			value: source.purchase_seas_dwt ? formatNumberInput(source.purchase_seas_dwt) : "",
			//messageType: null,
			//message: ""
		},

		/** ## [select]Năm đóng ## */
		purchase_seas_year_built: {
			label: state.purchase_seas_year_built ? state.purchase_seas_year_built.label : "",
			value:source.purchase_seas_year_built ? [{value: `${source.purchase_seas_year_built}`}] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [select-geo]Nơi đóng ## */
		purchase_seas_country_built: {
			label: state.purchase_seas_country_built ? state.purchase_seas_country_built.label : "",
			value: source.purchase_seas_country_built ? [{value: source.purchase_seas_country_built}] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [select-geo]Nơi xem ## */
		purchase_seas_place_inspect: {
			label: state.purchase_seas_place_inspect ? state.purchase_seas_place_inspect.label : "",
			value: source.purchase_seas_place_inspect && typeof source.purchase_seas_place_inspect === "object" ? [source.purchase_seas_place_inspect] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [input]Giá đề xuất ## */
		purchase_seas_idea_price: {
			value: source.purchase_seas_idea_price ? formatNumberInput(source.purchase_seas_idea_price) : "0",
			//messageType: null,
			//message: ""
		},

		purchase_seas_idea_price_currency: {
			value: source.purchase_seas_idea_price_currency || "usd",
			//messageType: null,
			//message: ""
		},

		/** ## [input]công suất ## */
		purchase_seas_total_me_power: {
			value: source.purchase_seas_total_me_power ? formatNumberInput(source.purchase_seas_total_me_power) : "",
			//messageType: null,
			//message: ""
		},

		// công suất
		purchase_seas_total_me_power_unit: {
			value: source.purchase_seas_total_me_power_unit || "bhp",
			//messageType: null,
			//message: ""
		},

		/** ## loại máy ## */
		purchase_seas_main_engine_maker: {
			label: state.purchase_seas_main_engine_maker ? state.purchase_seas_main_engine_maker.label : "",
			value:source.purchase_seas_main_engine_maker ? [{value: `${source.purchase_seas_main_engine_maker}`}] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## [input]sms ## */
		purchase_seas_contact_sms: {
			value: source.purchase_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: true,
			checked: (source.purchase_seas_contact_phone || account.account_mobile) && (source.purchase_seas_contact_by == 0 || source.purchase_seas_contact_by == 2) ? true : false
		},

		/** ## [input]Phone ## */
		purchase_seas_contact_phone: {
			value: source.purchase_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.purchase_seas_contact_phone || account.account_mobile) && (source.purchase_seas_contact_by == 0 || source.purchase_seas_contact_by == 1) ? true : false
		},

		/** ## [input]Email ## */
		purchase_seas_contact_email: {
			value: source.purchase_seas_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.purchase_seas_contact_email || !!account.account_email
		},

		purchase_seas_contact_skype: { // skype liên hệ
			value: source.purchase_seas_skype || account.contact_skype || "",
			messageType: null,
			message: "",
			checked: !!source.purchase_seas_skype || !!account.contact_skype
		},

		/** ## [textarea]Ghi chú ## */
		purchase_seas_information: source.purchase_seas_information || "",

		/** ## [image] Image ## */
		purchase_seas_images: getImagesFromSource(source),

		/** END */

	};

	return state;
};