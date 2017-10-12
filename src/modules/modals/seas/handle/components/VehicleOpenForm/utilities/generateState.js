import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default (source: Object = {}, state: Object = {}) => {

	const openTime = source.vehicle_open_seas_open_time_from ? new Date(source.vehicle_open_seas_open_time_from * 1000) : now;
	const account = source.account || {};

	state = {
		...state,

		vehicle_open_seas_vsl_name_suggestion: source.vehicle_open_seas_vsl_name_suggestion || [],

		/** ## Avatar ## */
		vehicle_open_seas_avatar: {
			source: getAvatarFromSource(source),
			info: {
				
			},
			code: source.code || source.vehicle_open_seas_code
		},

		/** ## Loại p.tiện ## */
		vehicle_open_seas_vsl_type: {
			label: state.vehicle_open_seas_vsl_type ? state.vehicle_open_seas_vsl_type.label : "",
			value: source.vehicle_open_seas_vsl_type ? [{ value: source.vehicle_open_seas_vsl_type }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## Mã phương tiện ## */
		vehicle_open_seas_vsl_name: {
			label: source.vehicle_open_seas_vsl_name ?  source.vehicle_open_seas_vsl_name : "",
			value: source.vehicle_open_seas_vsl_name ?  source.vehicle_open_seas_vsl_name : "",
			messageType: null,
			message: "",
			modalVisible: false
		},

		/** ## Trọng tải ## */
		vehicle_open_seas_dwt: {
			value: source.vehicle_open_seas_dwt ? formatNumberInput(source.vehicle_open_seas_dwt) : "",
			//messageType: null,
			//message: ""
		},

		/** ## Nơi xuất phát ## */
		vehicle_open_seas_open_place: {
			label: state.vehicle_open_seas_open_place ? state.vehicle_open_seas_open_place.label : "",
			value: source.vehicle_open_seas_open_place && typeof source.vehicle_open_seas_open_place === "object" ? [source.vehicle_open_seas_open_place] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## Thời gian xếp hàng sớm nhất ## */
		vehicle_open_seas_open_time_from: {
			label: openTime === now ? "" : dateTimeFormat(openTime),
			value: openTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## đăng kiểm ## */
		vehicle_open_seas_class: {
			label: state.vehicle_open_seas_class ? state.vehicle_open_seas_class.label : "",
			value: source.vehicle_open_seas_class ? [{ value: source.vehicle_open_seas_class }] : [],
			//messageType: null,
			//message: ""
		},

		/** ## Quản lý tàu ## */
		vehicle_open_seas_operator: {
			value: source.vehicle_open_seas_operator || "",
			//messageType: null,
			//message: ""
		},

		/** ## Liên hệ bằng điện thoại ## */
		vehicle_open_seas_contact_phone: {
			value: source.vehicle_open_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.vehicle_open_seas_contact_phone || account.account_mobile) && (source.vehicle_open_seas_contact_by == 0 || source.vehicle_open_seas_contact_by == 1) ? true : false
		},

		/** ## Liên hệ SMS ## */
		vehicle_open_seas_contact_sms: {
			value: source.vehicle_open_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: true,
			checked: (source.vehicle_open_seas_contact_phone || account.account_mobile) && (source.vehicle_open_seas_contact_by == 0 || source.vehicle_open_seas_contact_by == 2) ? true : false
		},

		/** ## Liên hệ Email ## */
		vehicle_open_seas_contact_email: {
			value: source.vehicle_open_seas_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.vehicle_open_seas_contact_email || !!account.account_email
		},

		vehicle_open_seas_contact_skype: { // skype liên hệ
			value: source.vehicle_open_seas_skype || account.contact_skype || "",
			//messageType: null,
			//message: "",
			checked: !!source.vehicle_open_seas_skype || !!account.contact_skype
		},

		/** ## Ghi chú ## */
		vehicle_open_seas_information: source.vehicle_open_seas_information || "",

		/** ## Ảnh ## */
		vehicle_open_seas_images: getImagesFromSource(source),

		/** END */
	};

	return state;
};