import { numberFormat, getCurrentDelimiters, getDelimiters } from '~/utilities/numberFormat';
import { addEventListener } from '~/utilities/language';

var delimiters = getCurrentDelimiters();

// regex bắt dấu thập phân cuối cùng
var regxNumberDecimal = new RegExp(`\\${delimiters.decimal}+$`);

// bắt sự kiện khi thay đổi ngôn ngữ
addEventListener( () => {

	delimiters = getCurrentDelimiters();
	regxNumberDecimal = new RegExp(`\\${delimiters.decimal}+$`);
} );

/**
 * @todo: Hàm hỗ trợ format số cho input number
 * @author: Croco
 * @since: 16-6-2017
 * @params: 
 *	text: giá trị number cần format, 
 *	format: chuỗi format
 *	locale: code ngôn ngữ cần format
*/
export default ( text: String = "", format: String, locale: String ) => {

	// switch regex
	let regex = regxNumberDecimal;
	let value = `${text}`;
	let delimiter = delimiters;

	// check và switch locale
	if( locale ) {

		delimiter = getDelimiters(locale);
		regex = new RegExp(`\\${delimiter.decimal}+$`);
	}

	// kiểm tra có dấu thập phân ở cuối hay không
	if( regex.test(text) ) {

		// replace tất cả dấu thập phân chừa lại dấu cuối cùng
		var regexDecimalMulti = new RegExp(`\\${delimiter.decimal}+`, "g");
		value = `${ text.replace(regexDecimalMulti, "") }${delimiter.decimal}`;
	} else if( text !== "-" ) { // kiểm tra dấu -

		text = text ? numberFormat(text, format, locale) : "";

		// kiểm tra dữ liệu
		if( text != Infinity && `${text}` != "NaN" ) {

			value = text;
		}
	}

	return value;
};