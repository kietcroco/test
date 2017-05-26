"use strict";
/**
* @todo: Hàm chuyển chuỗi thành chuỗi regex
* @author: croco
* @since: 20-1-2017
* @param string
* @return string
*/
const escapeRegExp = string => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

export default escapeRegExp;