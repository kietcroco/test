"use strict";
import moment from 'moment/min/moment-with-locales';
import enCustom from '~/data/en-custom';
import { getCurrentLanguage, addEventListener, defaultLanguage } from './language';

// fix nghiệp vụ
enCustom( moment );

// ngôn ngữ mặc định
const defaultLocale = moment.locales().indexOf(defaultLanguage) !== -1 ? defaultLanguage : "en";
moment.locale( defaultLocale );

// hàm kiểm tra ngôn ngữ
const validateLocale = (locale: String = "") => {

	locale = locale.replace("_", "-").toLowerCase();
	if( moment.locales().indexOf( locale ) !== -1 ) {
		
		return locale;
	}

	if( locale.includes("-") ){

		locale = locale.split("-")[0];
	}

	if( moment.locales().indexOf( locale ) !== -1 ) {
		
		return locale;
	}

	return defaultLocale;
};

// ngôn ngữ hiện tại
var currentLocale = validateLocale( getCurrentLanguage() );

// chuyển ngôn ngữ cho moment
if( currentLocale !== defaultLocale ) {
			
	moment.locale( currentLocale );
}

// bắt sự kiện khi thay đổi ngôn ngữ
addEventListener( locale => {

	// chuyển ngôn ngữ cho moment
	if( locale !== currentLocale ) {

		locale = validateLocale( locale );
		moment.locale( locale );
		currentLocale = locale;
	}
} );

/**
* @todo: Hàm trả về thời gian đã trải qua
* @author: Mr.Trọng
* @since: 04.02.2017
* @param:
*  -value: giá trị cần chuyển. (int, string, object, array)
*  -locale: ngôn ngữ hiển thị. (string: "vi","en",v.v..)
*  -suffix: có hiển thị chữ ago hay không. (bool: true||false)
* @return: String
*/

// nghiệp vụ yêu cầu tất cả ngôn ngữ xài cùng 1 kiểu
const mostLocale = "en-custom";

const timeAgo = ( value, locale: String, suffix: Boolean = true ) => {

	if( !value ) {

		return "";
	}
	
	// fix nghiệp vụ
	locale = mostLocale;

	// chuyển ngôn ngữ theo giá trị gọi hàm
	if( locale && locale !== currentLocale ) {
		
		locale = validateLocale( locale );
		moment.locale( locale );
	}

	const result = moment( value ).fromNow( suffix );

	// chuyển về theo ngôn ngữ hiện tại
	if( locale && locale !== currentLocale ) {

		moment.locale( currentLocale );
	}

	//Trả về kết quả
	return result;
};

export default timeAgo;