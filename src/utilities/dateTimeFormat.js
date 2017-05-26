"use strict";
import moment from 'moment';
import 'moment/locale/vi';
import language from './language';

/**
* @todo: Hàm định dạng thời gian
* @author: Mr.Trọng
* @since: 03.02.2017
* @return: String
*/
moment.locale( language.currentLanguage );
const _format = "DD/MM/YYYY";
const dateTimeFormat = ( value, format: String = _format, locale: String ) => {

	// Ngôn ngữ hiển thị
	locale && moment.locale( locale );

	// format
	return moment(value).format(format);
};

export default dateTimeFormat;