import { getCurrentDelimiters, getDelimiters } from '~/utilities/numberFormat';

// chuẩn quốc tế
const convertDelimiters = getDelimiters("en");

export default ( value: String = "", locale: String ) => {

	const currentDelimiters = locale ? getDelimiters( locale ) : getCurrentDelimiters();
	const regexDecimal = new RegExp(`\\${currentDelimiters.decimal}`, "g");
	const regexThousands = new RegExp(`\\${currentDelimiters.thousands}`, "g");

	value = value.replace( regexThousands, "" );
	value = value.replace( regexDecimal, convertDelimiters.decimal );

	return value;
};