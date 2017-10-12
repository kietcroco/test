"use strict";
//import moment from 'moment';
import moment from 'moment/min/moment-with-locales';
import { getCurrentLanguage, addEventListener, defaultLanguage } from './language';

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

const _format = "DD/MM/YYYY";

const dateTimeFormat = ( value, format: String = _format, locale: String ) => {

	format = format || _format;

	// chuyển ngôn ngữ theo giá trị gọi hàm
	if( locale && locale !== currentLocale ) {
		
		locale = validateLocale( locale );
		moment.locale( locale );
	}

	const result = moment(value).format(format);

	// chuyển về theo ngôn ngữ hiện tại
	if( locale && locale !== currentLocale ) {

		moment.locale( currentLocale );
	}

	// format
	return result;
};

export default dateTimeFormat;