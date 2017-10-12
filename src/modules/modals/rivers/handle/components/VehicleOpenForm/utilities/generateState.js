import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default (source: Object = {}, state: Object = {}) => {

	const openTime = source.vehicle_open_rivers_open_time ? new Date(source.vehicle_open_rivers_open_time * 1000) : now;
	const account = source.account || {};
	
	state = {
		...state,

		vehicle_rivers_code_suggestion: source.vehicle_rivers_code_suggestion || [],

		/** ## Avatar ## */
		vehicle_open_rivers_avatar: {
			source: getAvatarFromSource(source),
			info: {

			},
			code: source.code || source.vehicle_open_rivers_code
		},

		/** ## Loại p.tiện ## */
		vehicle_rivers_type: {
			label: state.vehicle_rivers_type ? state.vehicle_rivers_type.label : "",
			value: source.vehicle_rivers_type ? [{ value: source.vehicle_rivers_type }] : [],
			editable: !source.vehicle_rivers_type,
			//messageType: null,
			//message: ""
		},

		/** ## Mã phương tiện ## */
		vehicle_rivers_code: {
			label: source.vehicle_rivers_code || "",
			value: source.vehicle_rivers_code || "",
			messageType: null,
			message: "",
			modalVisible: false
		},

		/** ## Trọng tải ## */
		vehicle_rivers_tonnage: {
			value: source.vehicle_rivers_tonnage ? formatNumberInput(source.vehicle_rivers_tonnage) : "",
			editable: !source.vehicle_rivers_tonnage,
			//messageType: null,
			//message: ""
		},

		/** ## Nơi xuất phát ## */
		vehicle_open_rivers_open_place: {
			label: state.vehicle_open_rivers_open_place ? state.vehicle_open_rivers_open_place.label : "",
			value: source.vehicle_open_rivers_open_place && typeof source.vehicle_open_rivers_open_place === "object" ? [source.vehicle_open_rivers_open_place] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## Thời gian xếp hàng sớm nhất ## */
		vehicle_open_rivers_open_time: {
			label: openTime === now ? "" : dateTimeFormat(openTime),
			value: openTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## Nơi gian hàng ## */
		vehicle_open_rivers_want_discharge_place: {
			label: state.vehicle_open_rivers_want_discharge_place ? state.vehicle_open_rivers_want_discharge_place.label : "",
			value: source.vehicle_open_rivers_want_discharge_place && typeof source.vehicle_open_rivers_want_discharge_place === "object" ? [source.vehicle_open_rivers_want_discharge_place] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## Liên hệ bằng điện thoại ## */
		vehicle_open_rivers_contact_phone: {
			value: source.vehicle_open_rivers_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.vehicle_open_rivers_contact_phone || account.account_mobile) && (source.vehicle_open_rivers_contact_by == 0 || source.vehicle_open_rivers_contact_by == 1) ? true : false
		},

		/** ## Liên hệ SMS ## */
		vehicle_open_rivers_contact_sms: {
			value: source.vehicle_open_rivers_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: true,
			checked: (source.vehicle_open_rivers_contact_phone || account.account_mobile) && (source.vehicle_open_rivers_contact_by == 0 || source.vehicle_open_rivers_contact_by == 2) ? true : false
		},

		/** ## Liên hệ Email ## */
		vehicle_open_rivers_contact_email: {
			value: source.vehicle_open_rivers_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.vehicle_open_rivers_contact_email || !!account.account_email
		},

		/* loại hàng muốn chở */
		vehicle_open_rivers_want_transport_cargo: source.vehicle_open_rivers_want_transport_cargo || "",

		/** ## Ghi chú ## */
		vehicle_open_rivers_information: source.vehicle_open_rivers_information || "",

		/** ## Ảnh ## */
		vehicle_open_rivers_images: getImagesFromSource(source),

		/** END */
	};

	return state;
};