import formatNumberInput from '~/utilities/formatNumberInput';
import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default ( source: Object = {}, state: Object = {} ) => {

	const earliestTime = source.container_roads_loading_time_earliest ? new Date( source.container_roads_loading_time_earliest * 1000 ) : now;
	const latestTime = source.container_roads_loading_time_latest ? new Date( source.container_roads_loading_time_latest * 1000 ) : now;
	const account = source.account || {};

	state = {
		...state,
		container_roads_avatar: {
			source: getAvatarFromSource( source ),
			info: {

			},
			code: source.code || source.container_roads_code
		}, // avatar
		container_roads_load_port: { // nơi nhận hàng
			label: state.container_roads_load_port ? state.container_roads_load_port.label : "",
			value: source.container_roads_load_port && typeof source.container_roads_load_port === "object" ? [ source.container_roads_load_port ] : [],
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		container_roads_discharge_port: { // nơi trả hàng
			label: state.container_roads_discharge_port ? state.container_roads_discharge_port.label : "",
			value: source.container_roads_discharge_port && typeof source.container_roads_discharge_port === "object" ? [ source.container_roads_discharge_port ] : [],
			//messageType: null,
			//message: ""
		},
		container_roads_type_name: { // loại hàng
			label: state.container_roads_type_name ? state.container_roads_type_name.label : "",
			value: source.container_roads_type_name ? [ {value: source.container_roads_type_name} ] : [],
			//messageType: null,
			//message: ""
		},
		container_roads_weight: { // khối lượng
			value: source.container_roads_weight ? formatNumberInput(source.container_roads_weight) : "",
			//messageType: null,
			//message: ""
		},
		container_roads_freight: { // giá đề xuất
			value: source.container_roads_freight ? formatNumberInput(source.container_roads_freight) : "0",
			//messageType: null,
			//message: ""
		},
		container_roads_loading_time_earliest: { // thời gian xếp
			label: earliestTime === now ? "" : dateTimeFormat(earliestTime),
			value: earliestTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		container_roads_loading_time_latest: { // thời gian dỡ
			label: latestTime === now ? "" : dateTimeFormat(latestTime),
			value: latestTime,
			//messageType: null,
			//message: "",
			modalVisible: false
		},
		container_roads_contact_sms: { // số sms liên hệ
			value: source.container_roads_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: true,
			checked: (source.container_roads_contact_phone || account.account_mobile) && (source.container_roads_contact_by == 0 || source.container_roads_contact_by == 2) ? true : false
		},
		container_roads_contact_phone: { // số điện thoại liên hệ
			value: source.container_roads_contact_phone || account.account_mobile || "",
			messageType: null,
			message: "",
			editable: false,
			checked: (source.container_roads_contact_phone || account.account_mobile) && (source.container_roads_contact_by == 0 || source.container_roads_contact_by == 1) ? true : false
		},
		container_roads_contact_email: { // email liên hệ
			value: account.account_email || "",
			messageType: null,
			message: "",
			checked: !!source.container_roads_contact_email || !!account.account_email
		},
		contact_message: "",
		container_roads_information: source.container_roads_information || "", // ghi chú
		container_roads_images: getImagesFromSource( source ) // hình ghi chú
	};

	return state;
};