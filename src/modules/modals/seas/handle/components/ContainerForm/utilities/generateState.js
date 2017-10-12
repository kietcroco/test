import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default ( source: Object = {}, state: Object = {} ) => {

	const earliestTime = source.container_seas_loading_time_earliest ? new Date( source.container_seas_loading_time_earliest * 1000 ) : now;
	const latestTime = source.container_seas_loading_time_latest ? new Date( source.container_seas_loading_time_latest * 1000 ) : now;
	const account = source.account || {};

	state = {
		...state,
		container_seas_avatar: {
			source: getAvatarFromSource( source ),
			info: {

			},
			code: source.code || source.container_seas_code
		}, // avatar
		container_seas_load_port: { // nơi nhận hàng
			label: state.container_seas_load_port ? state.container_seas_load_port.label : "",
			value: source.container_seas_load_port && typeof source.container_seas_load_port === "object" ? [ source.container_seas_load_port ] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		container_seas_discharge_port: { // nơi trả hàng
			label: state.container_seas_discharge_port ? state.container_seas_discharge_port.label : "",
			value: source.container_seas_discharge_port && typeof source.container_seas_discharge_port === "object" ? [ source.container_seas_discharge_port ] : [],
			//messageType: null,
			//message: ""
		},
		container_seas_type_name: { // loại hàng
			label: state.container_seas_type_name ? state.container_seas_type_name.label : "",
			value: source.container_seas_type_name ? [ {value: source.container_seas_type_name} ] : [],
			//messageType: null,
			//message: ""
		},
		container_seas_weight: { // khối lượng
			value: source.container_seas_weight ? formatNumberInput(source.container_seas_weight) : "",
			//messageType: null,
			//message: ""
		},
		container_seas_freight: { // giá đề xuất
			value: source.container_seas_freight ? formatNumberInput(source.container_seas_freight) : `0`,
			//messageType: null,
			//message: ""
		},
		container_seas_loading_time_earliest: { // thời gian xếp
			label: earliestTime === now ? "" : dateTimeFormat(earliestTime),
			value: earliestTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		container_seas_loading_time_latest: { // thời gian dỡ
			label: latestTime === now ? "" : dateTimeFormat(latestTime),
			value: latestTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		container_seas_contact_sms: { // số sms liên hệ
			value: source.container_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: true,
			checked: (source.container_seas_contact_phone || account.account_mobile) && (source.container_seas_contact_by == 0 || source.container_seas_contact_by == 2) ? true : false
		},
		container_seas_contact_phone: { // số điện thoại liên hệ
			value: source.container_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.container_seas_contact_phone || account.account_mobile) && (source.container_seas_contact_by == 0 || source.container_seas_contact_by == 1) ? true : false
		},
		container_seas_contact_email: { // email liên hệ
			value: source.container_seas_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.container_seas_contact_email || !!account.account_email
		},
		container_seas_contact_skype: { // skype liên hệ
			value: source.container_seas_skype || account.contact_skype || "",
			//messageType: null,
			//message: "",
			checked: !!source.container_seas_skype || !!account.contact_skype
		},
		contact_message: "",
		container_seas_information: source.container_seas_information || "", // ghi chú
		container_seas_images: getImagesFromSource( source ) // hình ghi chú
	};

	return state;
};