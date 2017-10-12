import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import now from '../data/now';

export default (source: Object = {}, state: Object = {}) => {

	const time = source.bidding_rivers_time ? new Date(source.bidding_rivers_time * 1000) : now;
	const account = source.account || {};

	state = {
		...state,

		/** ## Avatar ## */
		bidding_rivers_avatar: {
			source: getAvatarFromSource(source),
			info  : {

			},
			code  : source.code || source.bidding_rivers_code
		},

		/** ## tiêu đề ## */
		bidding_rivers_title_own: {
			label: state.bidding_rivers_title_own ? state.bidding_rivers_title_own.label : "",
			value        : source.bidding_rivers_title_own ? source.bidding_rivers_title_own: "",
			//messageType: null,
			//message    : ""
		},

		/** ##  Vị trí  ## */
		bidding_rivers_place: {
			label: state.bidding_rivers_place ? state.bidding_rivers_place.label : "",
			value        : source.bidding_rivers_place && typeof source.bidding_rivers_place === "object" ? [source.bidding_rivers_place]: [],
			//messageType: null,
			//message    : "",
			modalVisible : false
		},

		/** ## ngày cho thuê  ## */
		bidding_rivers_time: {
			label        : time === now ? "": dateTimeFormat(time),
			value        : time,
			//messageType: null,
			//message    : "",
			modalVisible : false
		},

		/** ## SMS ## */
		bidding_rivers_contact_sms: {
			value      : source.bidding_rivers_contact_phone || account.account_mobile || "",
			messageType: null,
			message    : "",
			editable   : true,
			checked    : (source.bidding_rivers_contact_phone || account.account_mobile) && (source.bidding_rivers_contact_by == 0 || source.bidding_rivers_contact_by == 2) ? true: false
		},

		/** ## Phone ## */
		bidding_rivers_contact_phone: {
			value      : source.bidding_rivers_contact_phone || account.account_mobile || "",
			messageType: null,
			message    : "",
			editable   : true,
			checked    : (source.bidding_rivers_contact_phone || account.account_mobile) && (source.bidding_rivers_contact_by == 0 || source.bidding_rivers_contact_by == 1) ? true: false
		},

		/** ## Email ## */
		bidding_rivers_contact_email: {
			value      : source.bidding_rivers_contact_email || account.account_email || "",
			messageType: null,
			message    : "",
			checked    : !!source.bidding_rivers_contact_email || !!account.account_email
		},
		
		/** ## Ghi chú ## */
		bidding_rivers_information: source.bidding_rivers_information || "",

		/** ## Ảnh ## */
		bidding_rivers_images: getImagesFromSource(source),

		/** END */
	};

	return state;
};