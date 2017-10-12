/**
 * @flow
*/
"use strict";
import DeviceInfo from 'react-native-device-info';
import viSource from '~/data/lang/vi';

const defaultLanguage = "vi"; // ngôn ngữ thiết kế

// dữ liệu ngôn ngữ
const _data = {
	[ defaultLanguage ]: viSource
};

// ngôn ngữ hiện tại
var currentLanguage = (DeviceInfo.getDeviceLocale() || defaultLanguage).toLowerCase();

// để test
//currentLanguage = "vi";

// hàm lấy ngôn ngữ hiện tại
const getCurrentLanguage = () => currentLanguage;

// danh sách handle
var events = new Set();

// hàm set ngôn ngữ hiện tại
const setCurrentLanguage = locale => {

	if( !locale ) {

		return;
	}

	// nếu ngôn ngữ khác với ngôn ngữ hiện tại
	if( currentLanguage !== locale ) {

		// dispatch event
		events.forEach( handle => (handle && handle( locale )) );
	}
	currentLanguage = locale;
};

// hàm remove sự kiện
const removeEventListener = handle => {

	if( typeof handle !== "function" ) {

		throw `Missing event handle`;
	}

	if( events.has( handle ) ) {

		events.delete( handle );
	}
};

// hàm xoá tất cả sự kiện
const removeAllEventListener = () => {

	events = new Set();
};

// hàm thêm 1 sự kiện
const addEventListener = handle => {

	// check handle
	if( typeof handle !== "function" ) {

		throw `Missing event handle`;
	}

	// nếu sự kiện đã tồn tại thì xoá sự kiện cũ
	if( events.has( handle ) ) {

		events.delete( handle );
	}

	events.add( handle );

	return () => removeEventListener( handle );
};

// để test
//currentLanguage = defaultLanguage;

/**
 * @todo: Hàm kiểm tra ngôn ngữ được hỗ trợ, nếu không hỗ trợ trả về ngôn ngữ mặc định vi
 * @author: Croco
 * @since: 21-4-2017
 * @return string language code
*/
const supportLocale = locale => {

	locale = locale ? locale.toLowerCase() : null;

	switch ( locale ) {

		case "en":
		case "en-gb":
		case "en-au":
		case "en-us":

			if( undefined === _data[ "en" ] ) {

				_data[ "en" ] = require('~/data/lang/en.json') || {
					name: "English",
					code: "en",
					data: {

					}
				};
			}

			return _data[ "en" ];

		case defaultLanguage:
		case "vi-vn":
		case "vn":
		default:
			
			//locale = "vi";
			if( undefined === _data[ defaultLanguage ] ) {
				
				_data[ defaultLanguage ] = {
					name: "Việt Nam",
					code: defaultLanguage,
					data: {

					}
				};
			}
			
			return _data[ defaultLanguage ];
	}

	return false;
};

// hàm hỗ trợ bỏ namespace (vd: #$seas$#hello)
const regxNamespace = /^#\$[a-zA-Z_\-$]+\$#(?=.+)/;
const replaceNamespace = ( text: String = "" ) => {

	return text.replace(regxNamespace, "");
};

/**
 * @todo: Hàm dịch
 * @author: Croco
 * @since: 21-4-2017
 * @return string đã được dịch
*/
const translate = ( text: String = "", locale: String ) => {
	
	locale = locale || currentLanguage;

	const langData = (supportLocale( locale ) || supportLocale( defaultLanguage ));

	if( langData && langData.data && langData.data.hasOwnProperty(text) ) {

		return langData.data[ text ];
	}
	return replaceNamespace(text);
};
const language = {
	defaultLanguage,
	getCurrentLanguage,
	translate,
	supportLocale,
	setCurrentLanguage,
	addEventListener,
	removeEventListener,
	removeAllEventListener,
	//currentLanguage
};

export default language;
export {
	defaultLanguage,
	getCurrentLanguage,
	translate,
	supportLocale,
	setCurrentLanguage,
	addEventListener,
	removeEventListener,
	removeAllEventListener,
	//currentLanguage
};