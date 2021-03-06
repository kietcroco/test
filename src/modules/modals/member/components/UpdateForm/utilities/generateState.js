import getAvatarFromSource from './getAvatarFromSource';
import getImagesFromSource from './getImagesFromSource';

export default ( source: Object = {}, state: Object = {} ) => {

	state = {
		...state,
		account_company_name: { // tên công ty
			value: source.account_company_name || "",
			messageType: null,
			message: ""
		},
		account_code: { // mã cty, username
			value: source.code || source.account_code || "",
			messageType: null,
			message: "",
			isDuplicate: false,
			suggestion: []
		},
		account_mobile: { // số điện thoại
			value: source.account_mobile || "",
			messageType: null,
			message: "",
			isDuplicate: false
		},
		account_email: { // email
			value: source.account_email || "",
			messageType: null,
			message: "",
			isDuplicate: false
		},
		account_company_address: source.account_company_address || "", // địa chỉ công ty
		account_tax_code: {  // mã số thuế
			value: source.account_tax_code || "",
			messageType: null,
			message: "",
			isDuplicate: false
		},
		account_legal_paper: Array.isArray(source.account_legal_paper) ? source.account_legal_paper[0] : "", // giấy phép kinh doanh
		account_contact: source.account_contact || "", // người liên hệ
		account_company_introduce: source.account_company_introduce || "", // thông tin ghi chú
		account_images: getImagesFromSource(source) // hình ghi chú
	};

	return state;
};