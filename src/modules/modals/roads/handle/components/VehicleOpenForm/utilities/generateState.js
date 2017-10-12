import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default (source: Object = {}, state: Object = {}) => {

	const openTime = source.vehicle_open_roads_open_time ? new Date(source.vehicle_open_roads_open_time * 1000) : now;
	const account = source.account || {};
	state = {
		...state,

		vehicle_roads_code_suggestion: source.vehicle_roads_code_suggestion || [],

		/** ## Avatar ## */
		vehicle_open_roads_avatar: {
			source: getAvatarFromSource(source),
			info: {

			},
			code: source.code || source.vehicle_open_roads_code
		},

		/** ## Loại p.tiện ## */
		vehicle_roads_type: {
			label: state.vehicle_roads_type ? state.vehicle_roads_type.label : "",
			value: source.vehicle_roads_type ? [{ value: source.vehicle_roads_type }] : [],
			editable: !source.vehicle_roads_type,
			//messageType: null,
			//message: ""
		},

		vehicle_open_roads_open_time_daily :{
			value: source.vehicle_open_roads_open_time_daily || 0,
			messageType: null,
			message: "",
			//editable: true,
			//checked: source.vehicle_open_roads_open_time_daily ? true : false
		},

		/** ## Mã phương tiện ## */
		vehicle_roads_code: {
			label: source.vehicle_roads_code || "",
			value: source.vehicle_roads_code || "",
			messageType: null,
			message: "",
			modalVisible: false
		},

		/** ## Trọng tải ## */
		vehicle_roads_tonnage: {
			value: source.vehicle_roads_tonnage ? formatNumberInput(source.vehicle_roads_tonnage) : "",
			editable: !source.vehicle_roads_tonnage,
			//messageType: null,
			//message: ""
		},

		/** ## Nơi xuất phát ## */
		vehicle_open_roads_open_place: {
			label: state.vehicle_open_roads_open_place ? state.vehicle_open_roads_open_place.label : "",
			value: source.vehicle_open_roads_open_place && typeof source.vehicle_open_roads_open_place === "object" ? [source.vehicle_open_roads_open_place] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## Thời gian xếp hàng sớm nhất ## */
		vehicle_open_roads_open_time: {
			label: openTime === now ? "" : dateTimeFormat(openTime),
			value: openTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},

		/** ## Liên hệ bằng điện thoại ## */
		vehicle_open_roads_contact_phone: {
			value: source.vehicle_hollow_roads_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.vehicle_hollow_roads_contact_phone || account.account_mobile) && (source.vehicle_open_roads_contact_by == 0 || source.vehicle_open_roads_contact_by == 1) ? true : false
		},

		/** ## Liên hệ SMS ## */
		vehicle_open_roads_contact_sms: {
			value: source.vehicle_hollow_roads_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: true,
			checked: (source.vehicle_hollow_roads_contact_phone || account.account_mobile) && (source.vehicle_open_roads_contact_by == 0 || source.vehicle_open_roads_contact_by == 2) ? true : false
		},

		/** ## Liên hệ Email ## */
		vehicle_open_roads_contact_email: {
			value: source.vehicle_hollow_roads_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.vehicle_hollow_roads_contact_email || !!account.account_email
		},

		/** ## Ghi chú ## */
		vehicle_open_roads_information: source.vehicle_open_roads_information || "",

		/** ## Ảnh ## */
		vehicle_open_roads_images: getImagesFromSource(source),

		/** END */
	};

	return state;
};