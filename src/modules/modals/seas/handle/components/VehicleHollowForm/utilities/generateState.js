import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default (source: Object = {}, state: Object = {}) => {

	const openTime = source.vehicle_hollow_seas_open_time ? new Date(source.vehicle_hollow_seas_open_time * 1000) : now;
	const account = source.account || {};

	state = {
		...state,

		vehicle_hollow_seas_vsl_name_suggestion: source.vehicle_hollow_seas_vsl_name_suggestion || [],

		/** ## Avatar ## */
		vehicle_hollow_seas_avatar: {
			source: getAvatarFromSource(source),
			info: {
				
			},
			code: source.code || source.vehicle_hollow_seas_code
		},

		/** ## Loại p.tiện ## */
		vehicle_hollow_seas_vsl_type: {
			label: state.vehicle_hollow_seas_vsl_type ? state.vehicle_hollow_seas_vsl_type.label : "",
			value: source.vehicle_hollow_seas_vsl_type ? [{ value: source.vehicle_hollow_seas_vsl_type }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## Mã phương tiện ## */
		vehicle_hollow_seas_vsl_name: {
			label: source.vehicle_hollow_seas_vsl_name ?  source.vehicle_hollow_seas_vsl_name : "",
			value: source.vehicle_hollow_seas_vsl_name ?  source.vehicle_hollow_seas_vsl_name : "",
			messageType: null,
			message: "",
			modalVisible: false
		},

		/** ## Trọng tải ## */
		vehicle_hollow_seas_dwt: {
			value: source.vehicle_hollow_seas_dwt ? formatNumberInput(source.vehicle_hollow_seas_dwt) : "",
			//messageType: null,
			//message: ""
		},

		/** ## Nơi xuất phát ## */
		vehicle_hollow_seas_open_place: {
			label: state.vehicle_hollow_seas_open_place ? state.vehicle_hollow_seas_open_place.label : "",
			value: source.vehicle_hollow_seas_open_place && typeof source.vehicle_hollow_seas_open_place === "object" ? [source.vehicle_hollow_seas_open_place] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## Thời gian xếp hàng sớm nhất ## */
		vehicle_hollow_seas_open_time: {
			label: openTime === now ? "" : dateTimeFormat(openTime),
			value: openTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## Nơi gian hàng ## */
		vehicle_hollow_seas_want_discharge_place: {
			label: state.vehicle_hollow_seas_want_discharge_place ? state.vehicle_hollow_seas_want_discharge_place.label : "",
			value: source.vehicle_hollow_seas_want_discharge_place && typeof source.vehicle_hollow_seas_want_discharge_place === "object" ? [source.vehicle_hollow_seas_want_discharge_place] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## đăng kiểm ## */
		vehicle_hollow_seas_class: {
			label: state.vehicle_hollow_seas_class ? state.vehicle_hollow_seas_class.label : "",
			value: source.vehicle_hollow_seas_class ? [{ value: source.vehicle_hollow_seas_class }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## Quản lý tàu ## */
		vehicle_hollow_seas_operator: {
			value: source.vehicle_hollow_seas_operator || "",
			//messageType: null,
			//message: ""
		},

		/** ## Liên hệ bằng điện thoại ## */
		vehicle_hollow_seas_contact_phone: {
			value: source.vehicle_hollow_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.vehicle_hollow_seas_contact_phone || account.account_mobile) && (source.vehicle_hollow_seas_contact_by == 0 || source.vehicle_hollow_seas_contact_by == 1) ? true : false
		},

		/** ## Liên hệ SMS ## */
		vehicle_hollow_seas_contact_sms: {
			value: source.vehicle_hollow_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: true,
			checked: (source.vehicle_hollow_seas_contact_phone || account.account_mobile) && (source.vehicle_hollow_seas_contact_by == 0 || source.vehicle_hollow_seas_contact_by == 2) ? true : false
		},

		/** ## Liên hệ Email ## */
		vehicle_hollow_seas_contact_email: {
			value: source.vehicle_hollow_seas_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.vehicle_hollow_seas_contact_email || !!account.account_email
		},

		vehicle_hollow_seas_contact_skype: { // skype liên hệ
			value: source.vehicle_hollow_seas_skype || account.contact_skype || "",
			messageType: null,
			message: "",
			checked: !!source.vehicle_hollow_seas_skype || !!account.contact_skype
		},

		/** ## Ghi chú ## */
		vehicle_hollow_seas_information: source.vehicle_hollow_seas_information || "",

		/** ## Ảnh ## */
		vehicle_hollow_seas_images: getImagesFromSource(source),

		/** END */
	};

	return state;
};