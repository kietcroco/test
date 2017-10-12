import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default ( source: Object = {}, state: Object = {} ) => {

	const earliestTime = source.product_seas_loading_time_earliest ? new Date( source.product_seas_loading_time_earliest * 1000 ) : now;
	const latestTime = source.product_seas_loading_time_latest ? new Date( source.product_seas_loading_time_latest * 1000 ) : now;
	const account = source.account || {};

	state = {
		...state,
		product_seas_avatar: {
			source: getAvatarFromSource( source ),
			info: {},
			code: source.code || source.product_seas_code
		}, // avatar
		product_seas_load_port: { // nơi nhận hàng
			label: state.product_seas_load_port ? state.product_seas_load_port.label : "",
			value: source.product_seas_load_port && typeof source.product_seas_load_port === "object" ? [ source.product_seas_load_port ] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		product_seas_discharge_port: { // nơi trả hàng
			label: state.product_seas_discharge_port ? state.product_seas_discharge_port.label : "",
			value: source.product_seas_discharge_port && typeof source.product_seas_discharge_port === "object" ? [ source.product_seas_discharge_port ] : [],
			//messageType: null,
			//message: ""
		},
		product_seas_type_name: { // loại hàng
			label: state.product_seas_type_name ? state.product_seas_type_name.label : "",
			value: source.product_seas_type_name ? [ {value: source.product_seas_type_name} ] : [],
			//messageType: null,
			//message: ""
		},
		product_seas_weight: { // khối lượng
			value: source.product_seas_weight ? formatNumberInput(source.product_seas_weight) : "",
			//messageType: null,
			//message: ""
		},
		product_seas_weight_unit: { // đơn vị tính khối lượng
			label: state.product_seas_weight_unit ? state.product_seas_weight_unit.label : "",
			value: source.product_seas_weight_unit ? [ {value: source.product_seas_weight_unit} ] : [],
			//messageType: null,
			//message: ""
		},
		product_seas_freight: { // giá đề xuất
			value: source.product_seas_freight ? formatNumberInput(source.product_seas_freight) : `0`,
			//messageType: null,
			//message: ""
		},
		product_seas_freight_currency: {
			value: source.product_seas_freight_currency || "usd",
			//messageType: null,
			//message: ""
		},
		product_seas_loading_time_earliest: { // thời gian xếp
			label: earliestTime === now ? "" : dateTimeFormat(earliestTime),
			value: earliestTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		product_seas_loading_time_latest: { // thời gian dỡ
			label: latestTime === now ? "" : dateTimeFormat(latestTime),
			value: latestTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		product_seas_contact_sms: { // số sms liên hệ
			value: source.product_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: true,
			checked: (source.product_seas_contact_phone || account.account_mobile) && (source.product_seas_contact_by == 0 || source.product_seas_contact_by == 2) ? true : false
		},
		product_seas_contact_phone: { // số điện thoại liên hệ
			value: source.product_seas_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.product_seas_contact_phone || account.account_mobile) && (source.product_seas_contact_by == 0 || source.product_seas_contact_by == 1) ? true : false
		},
		product_seas_contact_email: { // email liên hệ
			value: source.product_seas_contact_email || account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.product_seas_contact_email || !!account.account_email
		},
		product_seas_contact_skype: { // skype liên hệ
			value: source.product_seas_skype || account.contact_skype || "",
			messageType: null,
			message: "",
			checked: !!source.product_seas_skype || !!account.contact_skype
		},
		contact_message: "",
		product_seas_information: source.product_seas_information || "", // ghi chú
		product_seas_images: getImagesFromSource( source ) // hình ghi chú
	};

	return state;
};