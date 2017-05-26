/**
 * @flow
*/
"use strict";
import DeviceInfo from 'react-native-device-info';

// dữ liệu ngôn ngữ
const _data = {};

// ngôn ngữ hiện tại
const currentLanguage = DeviceInfo.getDeviceLocale();

/**
 * @todo: Hàm kiểm tra ngôn ngữ được hỗ trợ, nếu không hỗ trợ trả về ngôn ngữ mặc định vi
 * @author: Croco
 * @since: 21-4-2017
 * @return string language code
*/
const supportLocale = locale => {

	locale = locale ? locale : currentLanguage;

	switch ( locale && locale.toLowerCase() ) {

		case "en":
		case "en-gb":
		case "en-au":
		case "en-us":

			locale = "en";
			if( undefined === _data[ locale ] ) {

				_data[ locale ] = require('../data/lang/en.json') || {
					name: "English",
					code: locale,
					data: {

					}
				};
			}
			break;

		case "vi":
		case "vi-vn":
		case "vn":
		default:
			
			locale = "vi";
			if( undefined === _data[ locale ] ) {
				
				_data[ locale ] = {
					name: "Việt Nam",
					code: locale,
					data: {

					}
				};
			}
			break;
	}

	return locale;
};

/**
 * @todo: Hàm dịch
 * @author: Croco
 * @since: 21-4-2017
 * @return string đã được dịch
*/
const translate = ( text: String = "", locale: String ) => {

	locale = supportLocale( locale );

	if( _data[ locale ] && _data[ locale ].data && _data[ locale ].data.hasOwnProperty(text) ) {

		return _data[ locale ].data[ text ];
	}
	return text;
};
const langquage = {

	currentLanguage,
	translate,
	supportLocale
};

export default langquage;
export {
	currentLanguage,
	translate,
	supportLocale
};