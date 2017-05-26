"use strict";
import moment from 'moment';
import 'moment/locale/vi';
import language from './language';
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
moment.locale( language.currentLanguage );
const timeAgo = ( value, locale: String, suffix: Boolean ) => {

	//Ngôn ngữ hiển thị
	locale && moment.locale( locale );

	//Trả về kết quả
	return moment( value ).fromNow( suffix );
};

export default timeAgo;