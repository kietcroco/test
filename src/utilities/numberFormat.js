"use strict";
import numeral from '@itvina/numeral';

/**
* @todo: Định dạng số
* @author: Mr.Trọng
* @since: 06.02.2017
* @param:
*  -value: số cần định dạng. (number, string)
*  -format: định dạng (string)
* @return: String
*/
const _format = "0[.]0{000000[đ]} a";
numeral.supportLocale('vi');
numeral.language('vi');
const numberFormat = ( value, format: String = _format, locale ) => {

	if( locale ) {
		numeral.supportLocale(locale);
		numeral.language(locale);
	}
	//Trả về kết quả
	return numeral( value ).format( format );
};

export default numberFormat;