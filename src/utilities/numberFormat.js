"use strict";
// see doc http://numeraljs.com/
import numeral from 'numeral';
import numeralLocales from 'numeral/locales';
import { getCurrentLanguage, addEventListener, defaultLanguage } from '~/utilities/language';
// sao chép vi-vn sang vi
// numeral.locales["vi-vn"] = numeral.locales["vi"];
// numeral.locales["en-us"] = numeral.locales["en"];

// ngôn ngữ mặc định
const defaultLocale = numeral.locales[defaultLanguage] ? defaultLanguage : "en";
numeral.locale(defaultLocale);

// hàm kiểm tra ngôn ngữ
const validateLocale = (locale: String = "") => {

	locale = locale.replace("_", "-").toLowerCase();
	if( numeral.locales[locale] ) {
		
		return locale;
	}

	if( locale.includes("-") ){

		locale = locale.split("-")[0];
	}

	if( numeral.locales[locale] ) {
		
		return locale;
	}

	return defaultLocale;
};

// ngôn ngữ hiện tại
var currentLocale = validateLocale( getCurrentLanguage() );

// kiểm tra numeral có hỗ trợ
// chuyển ngôn ngữ cho numeral
if( currentLocale !== defaultLocale ) {
			
	numeral.locale( currentLocale );
}

// hàm lấy config dấu thập phân theo ngôn ngữ
const getDelimiters = locale => {

	locale = validateLocale( locale );
	const numeralData = numeral.locales[locale] || numeral.locales[currentLocale] || numeral.locales[defaultLocale];

	return numeralData.delimiters;
};

// config thông số thập phân, phần nghìn hiện tại
var currentDelimiters = getDelimiters(currentLocale);
const getCurrentDelimiters = () => currentDelimiters;

// bắt sự kiện khi thay đổi ngôn ngữ
addEventListener( locale => {

	// chuyển ngôn ngữ cho moment
	if( locale !== currentLocale ) {

		locale = validateLocale( locale );
		numeral.locale( locale );
		currentLocale = locale;
		currentDelimiters = getDelimiters(currentLocale);
	}
} );

// format mặc định
const defaultFormat = `0,0.[00000000000]`;

const numberFormat = (value, format: String = defaultFormat, locale: String) => {

	format = format || defaultFormat;

	// kiểm tra locale
	if ( locale && currentLocale !== locale ) {

		locale = validateLocale( locale );
		numeral.locale(locale);
	}

	// format number
	const result = numeral(value).format(format);

	// set lại ngôn ngữ hiện tại
	if( locale && locale !== currentLocale ) {

		numeral.locale( currentLocale );
	}

	//Trả về kết quả
	return result
};

export default numberFormat;

export {
	numberFormat,
	defaultFormat,
	getCurrentDelimiters,
	getDelimiters
};