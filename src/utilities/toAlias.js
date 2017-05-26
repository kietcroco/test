"use strict";
/**
* @todo: Hàm chuyển đổi chuổi có dấu thành không dấu và ký tự đặc biệt thành -
* @author: Croco
* @since: 20-9-2016
* @params: String str
* @return: String alias
*/
const _regexA = /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/gi;
const _regexE = /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/gi;
const _regexI = /ì|í|ị|ỉ|ĩ/gi;
const _regexO = /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/gi;
const _regexU = /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/gi;
const _regexY = /ỳ|ý|ỵ|ỷ|ỹ/gi;
const _regexD = /đ/gi;
const _regexSpl = /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g;
const _regexMi = /-+-/g;
const _regexSE = /^\-+|\-+$/g;

const toAlias = str => {

	if( !str ) return '';
	str= str.toLowerCase()
			.replace( _regexA, "a")
			.replace( _regexE, "e")
			.replace( _regexI, "i")
			.replace( _regexO, "o")
			.replace( _regexU, "u")
			.replace( _regexY, "y")
			.replace( _regexD, "d")
			.replace( _regexSpl, "-")
			.replace( _regexMi, "-")
			.replace( _regexSE, "")
	return str;
};

export default toAlias;